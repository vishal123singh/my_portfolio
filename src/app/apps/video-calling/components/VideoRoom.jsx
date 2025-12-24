"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  addDoc,
  collection,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiPhoneOff,
  FiMonitor,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import ChatDrawer from "./ChatDrawer";

export default function VideoRoom({ roomId, user }) {
  const router = useRouter();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const localStream = useRef(null);
  const pendingCandidates = useRef([]);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  /* ---------------- Preferences ---------------- */

  useEffect(() => {
    const stored = localStorage.getItem("sound-enabled");
    if (stored !== null) setSoundEnabled(stored === "true");
  }, []);

  useEffect(() => {
    if (!isChatOpen && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.senderId !== user.uid) {
        setUnreadCount((p) => p + 1);
      }
    } else if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [messages, isChatOpen, user.uid]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("sound-enabled", String(next));
  };

  /* ---------------- WebRTC ---------------- */

  useEffect(() => {
    if (!roomId || !user?.uid) return;

    const roomRef = doc(db, "rooms", roomId);
    const messagesRef = collection(db, "rooms", roomId, "messages");

    let unsubscribeRoom;
    let unsubscribeIce;
    let unsubscribeChat;

    const cleanup = () => {
      localStream.current?.getTracks().forEach((t) => t.stop());
      pcRef.current?.close();
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    };

    const init = async () => {
      const roomSnap = await getDoc(roomRef);

      let isCaller = false;

      if (!roomSnap.exists()) {
        await setDoc(roomRef, { createdBy: user.uid });
        isCaller = true;
      } else {
        const data = roomSnap.data();
        if (!data.createdBy) {
          await updateDoc(roomRef, { createdBy: user.uid });
          isCaller = true;
        } else {
          isCaller = data.createdBy === user.uid;
        }
      }

      pcRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      /* ---- Local media ---- */
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStream.current.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, localStream.current);
      });

      localVideoRef.current.srcObject = localStream.current;

      /* ---- Remote media ---- */
      pcRef.current.ontrack = (e) => {
        if (e.streams[0]) remoteVideoRef.current.srcObject = e.streams[0];
      };

      /* ---- ICE send ---- */
      pcRef.current.onicecandidate = (e) => {
        if (!e.candidate) return;
        addDoc(
          collection(
            db,
            "rooms",
            roomId,
            isCaller ? "callerCandidates" : "calleeCandidates"
          ),
          e.candidate.toJSON()
        );
      };

      /* ---- Clear old ICE (caller only) ---- */
      if (isCaller) {
        for (const col of ["callerCandidates", "calleeCandidates"]) {
          const snap = await getDocs(collection(roomRef, col));
          snap.forEach((d) => deleteDoc(d.ref));
        }
      }

      /* ---- ICE receive (queued) ---- */
      const remoteIceRef = collection(
        db,
        "rooms",
        roomId,
        isCaller ? "calleeCandidates" : "callerCandidates"
      );

      unsubscribeIce = onSnapshot(remoteIceRef, (snap) => {
        snap.docChanges().forEach((c) => {
          if (c.type === "added") {
            const candidate = new RTCIceCandidate(c.doc.data());
            if (pcRef.current.remoteDescription) {
              pcRef.current.addIceCandidate(candidate);
            } else {
              pendingCandidates.current.push(candidate);
            }
          }
        });
      });

      /* ---- Signaling ---- */
      unsubscribeRoom = onSnapshot(roomRef, async (snap) => {
        const data = snap.data();
        if (!data) return;

        // Callee
        if (!isCaller && data.offer && !pcRef.current.remoteDescription) {
          await pcRef.current.setRemoteDescription(
            new RTCSessionDescription(data.offer)
          );

          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          await updateDoc(roomRef, { answer });

          pendingCandidates.current.forEach((c) =>
            pcRef.current.addIceCandidate(c)
          );
          pendingCandidates.current = [];
        }

        // Caller
        if (isCaller && data.answer && !pcRef.current.remoteDescription) {
          await pcRef.current.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );

          pendingCandidates.current.forEach((c) =>
            pcRef.current.addIceCandidate(c)
          );
          pendingCandidates.current = [];
        }
      });

      /* ---- Offer ---- */
      if (isCaller) {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        await updateDoc(roomRef, { offer });
      }

      /* ---- Chat ---- */
      unsubscribeChat = onSnapshot(messagesRef, (snap) => {
        setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      });
    };

    init();

    return () => {
      unsubscribeRoom?.();
      unsubscribeIce?.();
      unsubscribeChat?.();
      cleanup();
    };
  }, [roomId, user.uid]);

  /* ---------------- Media Controls ---------------- */

  const toggleMedia = (type) => {
    const track = localStream.current?.[`get${type}Tracks`]?.()[0];
    if (!track) return false;
    track.enabled = !track.enabled;
    return track.enabled;
  };

  const toggleMic = () => setIsMicOn(toggleMedia("Audio"));
  const toggleCamera = () => setIsCamOn(toggleMedia("Video"));

  /* ---------------- Screen Share ---------------- */

  const toggleScreenShare = async () => {
    if (isScreenSharing) switchToCamera();
    else startScreenShare();
  };

  const startScreenShare = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const track = stream.getVideoTracks()[0];
    pcRef.current
      .getSenders()
      .find((s) => s.track?.kind === "video")
      ?.replaceTrack(track);
    localVideoRef.current.srcObject = stream;
    track.onended = switchToCamera;
    setIsScreenSharing(true);
  };

  const switchToCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const track = stream.getVideoTracks()[0];
    pcRef.current
      .getSenders()
      .find((s) => s.track?.kind === "video")
      ?.replaceTrack(track);
    localStream.current
      .getVideoTracks()
      .forEach((t) => localStream.current.removeTrack(t));
    localStream.current.addTrack(track);
    localVideoRef.current.srcObject = localStream.current;
    setIsScreenSharing(false);
  };

  /* ---------------- Chat ---------------- */

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    await addDoc(collection(db, "rooms", roomId, "messages"), {
      user: user.displayName || "Anonymous",
      photoURL: user.photoURL || "",
      text: chatInput,
      timestamp: Date.now(),
      senderId: user.uid,
    });
    setChatInput("");
  };

  /* ---------------- End Call ---------------- */

  const endCall = () => {
    localStream.current?.getTracks().forEach((t) => t.stop());
    pcRef.current?.close();
    router.back();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 flex-grow">
          <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
              You ({user?.displayName || "User"})
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
              Participant
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 py-4 bg-gray-800 rounded-lg">
          <ControlButton
            active={isMicOn}
            onClick={toggleMic}
            activeIcon={<FiMic />}
            inactiveIcon={<FiMicOff />}
            activeColor="text-green-400"
            inactiveColor="text-red-400"
            label="Microphone"
          />
          <ControlButton
            active={isCamOn}
            onClick={toggleCamera}
            activeIcon={<FiVideo />}
            inactiveIcon={<FiVideoOff />}
            activeColor="text-green-400"
            inactiveColor="text-red-400"
            label="Camera"
          />
          <ControlButton
            active={isScreenSharing}
            onClick={toggleScreenShare}
            activeIcon={<FiMonitor />}
            inactiveIcon={<FiMonitor />}
            activeColor="text-yellow-400"
            inactiveColor="text-gray-400"
            label="Screen Share"
          />

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="relative p-2 bg-white shadow rounded-full"
          >
            💬
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={endCall}
            className="flex flex-col items-center justify-center p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
          >
            <FiPhoneOff className="text-white" />
          </button>
        </div>
      </div>

      {isChatOpen && (
        <ChatDrawer
          showChat={isChatOpen}
          setShowChat={setIsChatOpen}
          chatMessages={messages}
          handleSendMessage={handleSendMessage}
          message={chatInput}
          setMessage={setChatInput}
          user={user}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />
      )}
    </div>
  );
}

/* ---------------- Control Button ---------------- */

const ControlButton = ({
  active,
  onClick,
  activeIcon,
  inactiveIcon,
  activeColor,
  inactiveColor,
  label,
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-3 rounded-full hover:bg-gray-700 transition-colors"
    title={label}
  >
    <span className={active ? activeColor : inactiveColor}>
      {active ? activeIcon : inactiveIcon}
    </span>
    <span className="text-xs mt-1">{label}</span>
  </button>
);

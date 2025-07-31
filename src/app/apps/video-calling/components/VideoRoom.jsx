"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiPhoneOff,
  FiMonitor,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import ChatDrawer from "./ChatDrawer";

export default function VideoRoom({ roomId, user }) {
  const router = useRouter();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const localStream = useRef(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMakingOffer, setIsMakingOffer] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load sound preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sound-enabled");
    if (stored !== null) {
      setSoundEnabled(stored === "true");
    }
  }, []);

  // Count unread messages when chat drawer is closed
  useEffect(() => {
    if (!isChatOpen && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.senderId !== user.uid) {
        setUnreadCount((prev) => prev + 1);
      }
    } else if (isChatOpen) {
      setUnreadCount(0); // Reset when drawer opens
    }
  }, [messages, isChatOpen, user.uid]);

  // Toggle sound and save preference
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("sound-enabled", String(next));
  };

  useEffect(() => {
    const callDoc = doc(db, "rooms", roomId);
    const messagesRef = collection(db, "rooms", roomId, "messages");

    const cleanup = () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      if (pcRef.current) pcRef.current.close();
    };

    const initializeCall = async () => {
      try {
        pcRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStream.current.getTracks().forEach((track) => {
          pcRef.current.addTrack(track, localStream.current);
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream.current;
        }

        pcRef.current.ontrack = (event) => {
          if (remoteVideoRef.current && event.streams[0]) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        pcRef.current.onicecandidate = async (event) => {
          if (event.candidate) {
            await updateDoc(callDoc, {
              [`iceCandidates.${user.uid}`]: event.candidate.toJSON(),
            });
          }
        };

        const unsubscribe = onSnapshot(callDoc, async (snapshot) => {
          const data = snapshot.data();
          if (!data) return;

          // Handle offer from remote
          if (
            data.offer &&
            pcRef.current.signalingState === "stable" &&
            !pcRef.current.currentRemoteDescription
          ) {
            try {
              await pcRef.current.setRemoteDescription(
                new RTCSessionDescription(data.offer)
              );
              const answer = await pcRef.current.createAnswer();
              await pcRef.current.setLocalDescription(answer);
              await updateDoc(callDoc, { answer });
            } catch (error) {
              console.error("Error handling remote offer:", error);
            }
          }

          // Handle answer from remote
          if (
            data.answer &&
            pcRef.current.signalingState === "have-local-offer"
          ) {
            try {
              await pcRef.current.setRemoteDescription(
                new RTCSessionDescription(data.answer)
              );
            } catch (error) {
              console.error("Error setting remote answer:", error);
            }
          }

          // Handle ICE candidate from remote
          const candidate = data.iceCandidates?.[user.uid];
          if (candidate) {
            try {
              await pcRef.current.addIceCandidate(
                new RTCIceCandidate(candidate)
              );
              await updateDoc(callDoc, {
                [`iceCandidates.${user.uid}`]: null,
              });
            } catch (err) {
              console.error("ICE Candidate Error:", err);
            }
          }

          // Create offer if none exists
          if (
            !data.offer &&
            pcRef.current.signalingState === "stable" &&
            !isMakingOffer
          ) {
            setIsMakingOffer(true);
            try {
              const offer = await pcRef.current.createOffer({
                iceRestart: true,
              });
              await pcRef.current.setLocalDescription(offer);
              await updateDoc(callDoc, { offer });
            } catch (err) {
              console.error("Error creating offer:", err);
            } finally {
              setIsMakingOffer(false);
            }
          }
        });

        const unsubChat = onSnapshot(messagesRef, (snapshot) => {
          const msgs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(msgs);
        });

        return () => {
          unsubscribe();
          unsubChat();
          cleanup();
        };
      } catch (error) {
        console.error("Error initializing call:", error);
      }
    };

    initializeCall();
    return cleanup;
  }, [roomId, user.uid]);

  const toggleMedia = (type) => {
    const track = localStream.current?.[`get${type}Tracks`]?.()[0];
    if (track) {
      const newState = !track.enabled;
      track.enabled = newState;
      return newState;
    }
    return false;
  };

  const toggleMic = () => setIsMicOn(toggleMedia("Audio"));
  const toggleCamera = () => setIsCamOn(toggleMedia("Video"));

  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        await switchToCamera();
      } else {
        await startScreenShare();
      }
    } catch (error) {
      console.error("Screen sharing error:", error);
    }
  };

  const startScreenShare = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const screenTrack = screenStream.getVideoTracks()[0];

    const sender = pcRef.current
      .getSenders()
      .find((s) => s.track?.kind === "video");

    if (sender) {
      await sender.replaceTrack(screenTrack);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = screenStream;
    }

    screenTrack.onended = async () => {
      await switchToCamera();
    };

    setIsScreenSharing(true);
  };

  const switchToCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const cameraTrack = stream.getVideoTracks()[0];

    const sender = pcRef.current
      .getSenders()
      .find((s) => s.track?.kind === "video");

    if (sender) {
      await sender.replaceTrack(cameraTrack);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    localStream.current = stream;
    setIsScreenSharing(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const message = {
      user: user.displayName || "Anonymous",
      photoURL: user.photoURL || "",
      text: chatInput,
      timestamp: Date.now(),
    };

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), message);
      setChatInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    if (pcRef.current) {
      pcRef.current.close();
    }
    router.back();
  };

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

        {/* Control Bar */}
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
          {/* <ControlButton
            active={isChatOpen}
            onClick={() => setIsChatOpen(!isChatOpen)}
            activeIcon={<FiMessageCircle />}
            inactiveIcon={<FiMessageCircle />}
            activeColor="text-blue-400"
            inactiveColor="text-blue-400"
            label="Chat"
          /> */}

          <button
            onClick={() => setIsChatOpen(true)}
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
            title="End Call"
          >
            <FiPhoneOff className="text-white" />
          </button>
        </div>
      </div>

      {/* Chat Drawer */}

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

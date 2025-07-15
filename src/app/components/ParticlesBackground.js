import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: false },
                background: { color: "transparent" },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        resize: true,
                    },
                    modes: {
                        repulse: {
                            distance: 120,
                            duration: 0.4,
                        },
                        push: {
                            quantity: 4,
                        },
                    },
                },
                particles: {
                    number: {
                        value: 60,
                        density: {
                            enable: true,
                            area: 800,
                        },
                    },
                    color: { value: "#00ffff" },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                    size: {
                        value: { min: 2, max: 4 },
                        random: true,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {
                            default: "out",
                        },
                    },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 z-[-1] pointer-events-auto"
        />
    );
}

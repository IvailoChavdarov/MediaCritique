import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; 
import './ParticleBackground.scss'

export default function ParticleBackground(){
    const [init, setInit] = useState(false);
    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
        await loadSlim(engine);
        }).then(() => {
        setInit(true);
              const overrideStyles = () => {
                const canvas = document.querySelector('#particleBackground canvas');
                if (canvas) {
                    canvas.style.position = 'absolute';
                    canvas.style.top = '0';
                    canvas.style.left = '0';
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';
                    canvas.style.pointerEvents = 'none';
                } else {
                requestAnimationFrame(overrideStyles);
                }
            };
            overrideStyles();
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container)
    };


    const options = useMemo(
        () => ({
        background: {
            color: {
            value: "transparent",
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
            onClick: {
                enable: true,
                mode: "repulse",
            },
            onHover: {
                enable: false,
                mode: 'grab',
            },
            },
            modes: {
            push: {
                distance: 200,
                duration: 15,
            },
            grab: {
                distance: 150,
            },
            },
        },
        particles: {
            color: {
                value: "#3e5fff",
            },
            links: {
                color: "#3e5fff",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 200,
            },
            opacity: {
                value: 1.0,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
            detectRetina: true,
        }),
        [],
    );

    return(<Particles id="particleBackground" className="particles-canvas-wrapper" init={particlesLoaded} options={options} />)
}
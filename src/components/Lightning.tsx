import React, { useRef } from "react";
import { Cloud } from '@react-three/drei'
import { useFrame } from "react-three-fiber";

const LIGHTNING_CHANCE = 0.001;

export const Lightning: React.FC<any> = ({ enabled }) => {
    const lightningRef1 = React.useRef<any>(null);
    const lightningRef2 = React.useRef<any>(null);
    const lightningRef3 = React.useRef<any>(null);

    const triggerLightning = (light: any) => {
        light.fired = true;
        light.intensity = 20000;
    }

    const checkLightning = (light: any) => {
        if (light.fired) {
            light.intensity = light.intensity - 1000;
            if (light.intensity <= 0) {
                light.fired = false;
            }
        }
    }

    useFrame(({ clock }) => {
        checkLightning(lightningRef1.current);
        checkLightning(lightningRef2.current);
        checkLightning(lightningRef3.current);
        if (!enabled) return;

        if (Math.random() < LIGHTNING_CHANCE) {
            if (!lightningRef1.current.fired) {
                triggerLightning(lightningRef1.current);
                setTimeout(() => {
                    if (Math.random() < 0.1) {
                        triggerLightning(lightningRef2.current);
                    }
                    if (Math.random() < 0.1) {
                        triggerLightning(lightningRef3.current);
                    }
                }, 150);
            }
        }
        if (Math.random() < LIGHTNING_CHANCE) {
            if (!lightningRef2.current.fired) {
                triggerLightning(lightningRef2.current);
                setTimeout(() => {
                    if (Math.random() < 0.1) {
                        triggerLightning(lightningRef1.current);
                    }
                    if (Math.random() < 0.1) {
                        triggerLightning(lightningRef3.current);
                    }
                }, 150);
            }
        }
        if (Math.random() < LIGHTNING_CHANCE) {
            if (!lightningRef3.current.fired) {
                triggerLightning(lightningRef3.current);
                setTimeout(() => {
                    if (Math.random() < 0.1) {
                        triggerLightning(lightningRef1.current);
                    }
                    if (Math.random() < 0.1) {
                        triggerLightning(lightningRef2.current);
                    }
                }, 150);
            }
        }
    });

    return (
        <React.Suspense fallback={null}>
            {/* Lightning */}
            <pointLight
                ref={lightningRef1}
                position={[-10, 10, 10]}
                intensity={0}
            />

            <pointLight
                ref={lightningRef2}
                position={[110, 10, -240]}
                intensity={0}
            />

            <pointLight
                ref={lightningRef3}
                position={[-110, 10, -290]}
                intensity={0}
            />
        </React.Suspense>
    )
}

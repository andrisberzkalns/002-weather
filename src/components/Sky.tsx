
import React from 'react'
import {  Sky as DreiSky, Stars } from '@react-three/drei'
import { CDirectionalLight, CPointLight, CSpotLight } from "~/components/Lights";
import { useControls } from 'leva';
import { scale } from "~/utils/scale";

export const Sky: React.FC<{fogIntensity: number, cloudIntensity: number, sun: {azimuth: number, altitude: number}}> = (props) => {
    const { sun, cloudIntensity, fogIntensity } = props;

    let dirIntensity = 50;
    let ampIntensity = 0;
    if (sun) {
    //     console.log("here");
        if (sun.altitude <= 0.2) {
            dirIntensity = scale(sun?.altitude, 0, 0.2, 0, 5);
            ampIntensity = scale(sun?.altitude, 0, 0.2, 0, 1);
        } else if (sun.altitude <= 0.5) {
            dirIntensity = scale(sun?.altitude, 0.2, 0.5, 5, 50);
            ampIntensity = scale(sun?.altitude, 0.2, 0.5, 1, 2);
        } else {
            dirIntensity = 50;
            ampIntensity = 2;
        }
    }
    ampIntensity = ampIntensity * (1 - cloudIntensity);
    dirIntensity = dirIntensity * (1 - cloudIntensity);

    if (ampIntensity < 0.02) ampIntensity = 0.02;
    if (dirIntensity < 0) dirIntensity = 0;

    // console.log("dirIntensity", dirIntensity);
    // console.log("sun", sun);

    /**
     * x = R * cos(ϕ) * sin(θ)
     * y = R * cos(ϕ) * cos(θ)
     * z = R * sin(ϕ)
     * 
     * R distance of the point from the origin,
     * θ (azimuth),
     * ϕ (elevation)
     */
    // Calculate inclination from altitude
    // const inclination = Math.PI * (0.5 - sun.altitude);

    const distance = 400;
    const sunX = -distance * Math.cos(sun.azimuth) * Math.sin(sun.altitude);
    const sunY = distance * Math.cos(sun.azimuth) * Math.cos(sun.altitude);
    const sunZ = -distance * Math.sin(sun.azimuth);

    return (
        <>
            <CDirectionalLight
                position={{
                    x: sunX,
                    y: sunY,
                    z: sunZ,
                }}
                intensity={dirIntensity}
            />
            <ambientLight intensity={ampIntensity}/>

            <DreiSky 
                distance={400000}
                sunPosition={[sunX, sunY, sunZ]}
                inclination={sun.altitude}
                turbidity={0.3} // Set to 100
                rayleigh={1.6}
                mieCoefficient={0.0002}
                mieDirectionalG={0.9}
            />
            {
                cloudIntensity < 0.1 && sun.altitude < 0.15 && fogIntensity < 0.15 &&
                <Stars radius={140} depth={1} count={10000} factor={6} saturation={0} fade speed={1} />
            }
        </>
    )
}
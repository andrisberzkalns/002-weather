import { scale } from "~/utils/scale";

export const Fog: React.FC<{ intensity: number, sun: {azimuth: number, altitude: number, timeIndex: number} }> = ({ intensity, sun }) => {

    const FOG_MIN_COLOR = 40;
    let fogColor = 255;
    console.log(sun);

    if (sun) {
        if (sun.altitude <= -0.1) {
            fogColor = FOG_MIN_COLOR;
        } else if (sun.altitude <= 0.2) {
            fogColor = scale(sun.altitude, -0.1, 0.2, FOG_MIN_COLOR, 255);
        } else {
            fogColor = 255;
        }
    }
    if (fogColor < FOG_MIN_COLOR) fogColor = FOG_MIN_COLOR;
    console.log(fogColor);
    fogColor = Math.floor(fogColor);
    return (
        <>
            <fogExp2 attach="fog" args={[`rgb(${fogColor},${fogColor},${fogColor})`, 0.05 * intensity + 0.001]} />
            <group
                position={[0, 0, -scale(intensity, 0, 1, 400, 100)]}
                scale={[2000, 2000, 2000]}
            >
                {/* <mesh>
                    <planeGeometry/>
                    <meshStandardMaterial
                        color={`rgb(${fogColor},${fogColor},${fogColor})`}
                        transparent={true}
                        emissive={`rgb(${fogColor},${fogColor},${fogColor})`}
                        emissiveIntensity={1}
                        opacity={intensity}
                    />
                </mesh> */}
            </group>
        </>
    );
}
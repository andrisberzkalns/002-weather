
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Cloud: React.FC<any> = () => {
    const cloudTexture = useLoader(TextureLoader, 'assets/cloud.png')
    const x = Math.random() * 40 + 10;
    const z = Math.random() * 40 - 50;
    const y = Math.random() * 100 + 20;
    return (
        <mesh
            position={[x, y, z]}
            renderOrder={100}
            rotation={[Math.PI / 2, 0, 0]}
        >
            <planeGeometry
                args={[60, 60]}
                // size={[500,500]}
            />
            <meshLambertMaterial
                color="white"
                transparent
                opacity={0.6}
                map={cloudTexture}
            />
        </mesh>
    )
}

export const Cloudy: React.FC<{ intensity: number }> = (props) => {
    return (
        <>
            {
                Array(props.intensity * 25).fill(0).map((_, i) => (
                    <Cloud key={i} />
                ))
            }
        </>
    )
}
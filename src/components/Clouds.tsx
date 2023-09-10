import React from "react";
import { Cloud } from '@react-three/drei'

export const Clouds: React.FC<any> = ({ intensity }) => {
    const segments = intensity * 100;
    const width = 10 + (5 * intensity);
    const basePosition = {x: 0, y: 40, z: -90};
    return (
      <React.Suspense fallback={null}>
        {
          [-120, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100, 120].map((x) => (
            <Cloud key={x} depthTest={false} position={[basePosition.x + x, basePosition.y, basePosition.z]} width={width} depth={10.5} segments={segments} texture="/assets/cloud.png" />
          ))
        }
      </React.Suspense>
    )
  }
  
import React, { useEffect, useRef, useState } from 'react'
import { DirectionalLight, DirectionalLightHelper, SpotLight, SpotLightHelper, PointLight, PointLightHelper } from "three";
import { CameraControls, Center, PerspectiveCamera, Sky, Stage, Stars, Text3D, useFont, Environment, useGLTF, useHelper, SoftShadows, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva';


export const CDirectionalLight: React.FC<any> = ({ position, intensity }) => {
    const dirLight = useRef<DirectionalLight>(null);
    return (
      <>
        <directionalLight
          ref={dirLight}
          color={"#FFDDB5"}
          visible={true}
          position={[
            position.x,
            position.y,
            position.z,
          ]}
          intensity={intensity}
          castShadow={true}
          shadow-mapSize={[4096 * 3, 4096 * 3]}
        >
          <orthographicCamera attach="shadow-camera" args={[-100, 100, 100, -100]} />
        </directionalLight>
      </>
    );
  };
  
  export const CSpotLight = () => {
    const spotLight = useRef<SpotLight>(null);
    //@ts-ignore
    useHelper(spotLight, SpotLightHelper, "red");
    const spotCtl = useControls('Spot Light', {
      visible: true,
      position: {
        x: 1.9,
        y: 2.7,
        z: -10.7,
      },
      color: "#FFDDB5",
      intensity: 500,
      castShadow: true,
    });
  
    return (
      <>
        <spotLight
          color={spotCtl.color}
          ref={spotLight}
          visible={spotCtl.visible}
  
          intensity={spotCtl.intensity}
          castShadow={spotCtl.castShadow}
        />
      </>
    );
  };
  
  export const CPointLight = () => {
    const pointLight = useRef<PointLight>(null);
    //@ts-ignore
    useHelper(pointLight, PointLightHelper, "red");
    const pointCtl = useControls('Point Light', {
      visible: true,
      position: {
        x: 1.9,
        y: 2.7,
        z: -10.7,
      },
      color: "#FFDDB5",
      intensity: 500,
      castShadow: true,
    });
  
    return (
      <>
        <pointLight
          color={pointCtl.color}
          ref={pointLight}
          visible={pointCtl.visible}
          position={[
            pointCtl.position.x,
            pointCtl.position.y,
            pointCtl.position.z,
          ]}
          intensity={pointCtl.intensity}
        />
      </>
    );
  }
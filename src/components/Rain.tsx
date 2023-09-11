import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { scale } from '~/utils/scale';

const MAX_RAIN_HEIGHT = 15;
const MIN_RAIN_HEIGHT = 0;
const MAX_INSTANCES = 1000;

const material = new THREE.MeshStandardMaterial({
    color: 0xaaaaff,
    transparent: true,
    opacity: 0.8,
    metalness: 0.2
});
const matrix = new THREE.Matrix4();

// const geometry = new THREE.BufferGeometry();
const boxesGeometry = new THREE.SphereGeometry(0.01, 1, 8);
boxesGeometry.scale(0.2,35,0.2);

export const Rain: React.FC<{intensity: number}> = ({ intensity }) => {
    const ref = useRef<any>();

    useEffect(() => {
        for (let i=0; i < MAX_INSTANCES * intensity; i++) {
            const dummy = new THREE.Object3D();

            dummy.position.x = Math.random() * 15 - 7;
            dummy.position.y = Math.random() * MAX_RAIN_HEIGHT;
            dummy.position.z = Math.random() * 15 - 10;
            const rainDropVelocity = new THREE.Vector3(
                Math.random() * 15 - 4,
                Math.random() * MAX_RAIN_HEIGHT,
                Math.random() * 15 - 10
            );
            
            if (dummy.position.y < MIN_RAIN_HEIGHT) {
                dummy.position.y = MAX_RAIN_HEIGHT;
            }

            dummy.updateMatrix()
            ref.current.setMatrixAt(i, dummy.matrix);

        }
    }, [intensity]);

    useFrame(({ clock }) => {
        // const dummy = new THREE.Object3D();
        for (let i=0; i < MAX_INSTANCES * intensity; i++) {
            ref.current.getMatrixAt(i, matrix);
            const dummy = new THREE.Object3D();
            matrix.decompose(dummy.position, dummy.rotation, dummy.scale);
            // dummy.position.y = (i % MAX_RAIN_HEIGHT) - (clock.elapsedTime) % MAX_RAIN_HEIGHT;
            dummy.position.y += scale(intensity, 0, 1, -0.25, -0.5);
            if (dummy.position.y < MIN_RAIN_HEIGHT) {
                dummy.position.y = MAX_RAIN_HEIGHT;
            }

            dummy.updateMatrix()
            ref.current.setMatrixAt(i, dummy.matrix);

        }
        ref.current.instanceMatrix.needsUpdate = true;
    });


    return (
        <>
            <instancedMesh ref={ref} args={[boxesGeometry, material, MAX_INSTANCES * intensity]} />
        </>
    )
}
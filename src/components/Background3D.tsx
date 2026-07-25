import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const factor = Math.random() * 2 + 1;
      const speed = Math.random() * 0.01 + 0.005;
      const xFactor = Math.random() - 0.5;
      const yFactor = Math.random() - 0.5;
      const zFactor = Math.random() - 0.5;
      temp.push({ x, y, z, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { x, y, z, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      const t = factor + state.clock.elapsedTime * (speed * 0.5);
      
      particle.y += Math.sin(t) * 0.02 * yFactor;
      particle.x += Math.cos(t) * 0.02 * xFactor;
      particle.z += Math.sin(t) * 0.02 * zFactor;
      
      // Wrap around
      if (particle.y > 10) particle.y = -10;
      if (particle.y < -10) particle.y = 10;
      if (particle.x > 10) particle.x = -10;
      if (particle.x < -10) particle.x = 10;

      dummy.position.set(particle.x, particle.y, particle.z);
      
      // Scale pulse
      const s = Math.cos(t) * 0.05 + 0.05;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#E2861C" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}

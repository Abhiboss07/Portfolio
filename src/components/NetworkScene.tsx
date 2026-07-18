import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = new THREE.Color('#2dd4ff');
const NODE_COUNT = 46;
const MAX_DIST = 3.1;

type Graph = {
  positions: Float32Array;
  velocities: Float32Array;
  edges: [number, number][];
};

function buildGraph(): Graph {
  const positions = new Float32Array(NODE_COUNT * 3);
  const velocities = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    velocities[i * 3] = (Math.random() - 0.5) * 0.08;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
  }
  return { positions, velocities, edges: [] };
}

function Network({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const graph = useMemo(buildGraph, []);
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Geometry buffers, allocated once.
  const { pointGeo, lineGeo, linePos } = useMemo(() => {
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(graph.positions, 3));

    const maxEdges = NODE_COUNT * NODE_COUNT;
    const linePos = new Float32Array(maxEdges * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));

    return { pointGeo, lineGeo, linePos };
  }, [graph]);

  const sprite = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(45,212,255,0.9)');
    g.addColorStop(1, 'rgba(45,212,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = graph.positions;
    const v = graph.velocities;
    const dt = Math.min(delta, 0.05);

    // Drift + soft bounds.
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      p[ix] += v[ix] * dt * 12;
      p[ix + 1] += v[ix + 1] * dt * 12;
      p[ix + 2] += v[ix + 2] * dt * 12;
      if (Math.abs(p[ix]) > 6.2) v[ix] *= -1;
      if (Math.abs(p[ix + 1]) > 3.8) v[ix + 1] *= -1;
      if (Math.abs(p[ix + 2]) > 2.8) v[ix + 2] *= -1;
    }
    pointGeo.attributes.position.needsUpdate = true;

    // Rebuild proximity edges.
    let ei = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = p[i * 3] - p[j * 3];
        const dy = p[i * 3 + 1] - p[j * 3 + 1];
        const dz = p[i * 3 + 2] - p[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < MAX_DIST * MAX_DIST) {
          linePos[ei++] = p[i * 3];
          linePos[ei++] = p[i * 3 + 1];
          linePos[ei++] = p[i * 3 + 2];
          linePos[ei++] = p[j * 3];
          linePos[ei++] = p[j * 3 + 1];
          linePos[ei++] = p[j * 3 + 2];
        }
      }
    }
    lineGeo.setDrawRange(0, ei / 3);
    lineGeo.attributes.position.needsUpdate = true;

    // Parallax toward pointer.
    if (group.current && pointer.current) {
      const tx = pointer.current.x * 0.35;
      const ty = pointer.current.y * 0.25;
      group.current.rotation.y += (tx - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-ty - group.current.rotation.x) * 0.04;
      group.current.position.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.45}
          map={sprite}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={ACCENT}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function PointerTracker({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const { size } = useThree();
  useFrame(({ pointer: p }) => {
    if (pointer.current) {
      pointer.current.x = p.x;
      pointer.current.y = p.y;
    }
  });
  void size;
  return null;
}

export default function NetworkScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#08090c']} />
      <Network pointer={pointer} />
      <PointerTracker pointer={pointer} />
    </Canvas>
  );
}

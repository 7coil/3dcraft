import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Group } from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";
import "./index.css";

// The number of millimeters that each cube should be sized as.
const SCALE_FACTOR = 3 as const;
const GRID_SIZE = {
  x: 32,
  y: 32,
  z: 32,
} as const;

interface IBoxProps {
  loc: [number, number, number];
}

function Box({ loc }: IBoxProps) {
  const [hovered, hover] = useState(false);
  const [x, y, z] = loc;

  return (
    <mesh
      position={[x * SCALE_FACTOR, y * SCALE_FACTOR, z * SCALE_FACTOR]}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

interface IDataStructure {
  blocks: (0 | 1)[][][]
}

const App = () => {
  const modelReference = React.createRef<Group>();
  const somethings: [number, number, number][] = [];

  const [datastructure, setDatastructure] = useState<IDataStructure>({
    blocks: []
  });

  useEffect(() => {
    const onDataChange = (data: IDataStructure) => {
      console.log("Received data!", data);
      setDatastructure(data);
    }

    threesome.on("3dmodel", onDataChange);
    
    return () => {
      threesome.off("3dmodel", onDataChange);
    }
  }, [])

  console.log("rendering...", datastructure);

  for (let y = 0; y < GRID_SIZE.y; y++) {
    for (let z = 0; z < GRID_SIZE.z; z++) {
      for (let x = 0; x < GRID_SIZE.x; x++) {
        if (datastructure.blocks?.[y]?.[z]?.[x]) {
          somethings.push([y, z, x]);
        }
      }
    }
  }

  return (
    <main>
      <div>
        <button
          onClick={() => {
            const exporter = new STLExporter();
            const sceneToExport = modelReference.current.clone(true);
            sceneToExport.rotateX(Math.PI / 2);
            sceneToExport.updateMatrixWorld();
            const result = exporter.parse(sceneToExport);
            threesome.save(result);
          }}
        >
          Export STL
        </button>
      </div>
      <Canvas className="canvas">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group ref={modelReference}>
          {somethings.map(([y, z, x]) => (
            <Box key={`${x},${y},${z}`} loc={[x, y, z]} />
          ))}
        </group>
        <gridHelper
          position={[
            -(0.5 - GRID_SIZE.x / 2) * SCALE_FACTOR,
            -0.5 * SCALE_FACTOR,
            -((0.5 - GRID_SIZE.y / 2) * SCALE_FACTOR),
          ]}
          scale={[SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR]}
          args={[GRID_SIZE.x, GRID_SIZE.y]}
        />
        <OrbitControls
          target={[
            (GRID_SIZE.x / 2) * SCALE_FACTOR,
            GRID_SIZE.y * SCALE_FACTOR,
            (GRID_SIZE.y / 2) * SCALE_FACTOR
          ]}
        />
      </Canvas>
    </main>
  );
};

createRoot(document.getElementById("root")).render(<App />);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

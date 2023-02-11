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

type SingleLayer = (0 | 1)[][];
interface IDataStructure {
  blocks: SingleLayer[];
}

interface IInputStructure {
  blocks: SingleLayer;
  minerID: string;
}

const App = () => {
  const modelReference = React.createRef<Group>();
  const somethings: [number, number, number][] = [];

  const [layer0, setLayer0] = useState<SingleLayer>([]);
  const [layer1, setLayer1] = useState<SingleLayer>([]);
  const [layer2, setLayer2] = useState<SingleLayer>([]);
  const [layer3, setLayer3] = useState<SingleLayer>([]);
  const [layer4, setLayer4] = useState<SingleLayer>([]);
  const [layer5, setLayer5] = useState<SingleLayer>([]);
  const [layer6, setLayer6] = useState<SingleLayer>([]);
  const [layer7, setLayer7] = useState<SingleLayer>([]);
  const [layer8, setLayer8] = useState<SingleLayer>([]);
  const [layer9, setLayer9] = useState<SingleLayer>([]);
  const [layer10, setLayer10] = useState<SingleLayer>([]);
  const [layer11, setLayer11] = useState<SingleLayer>([]);
  const [layer12, setLayer12] = useState<SingleLayer>([]);
  const [layer13, setLayer13] = useState<SingleLayer>([]);
  const [layer14, setLayer14] = useState<SingleLayer>([]);
  const [layer15, setLayer15] = useState<SingleLayer>([]);
  const [layer16, setLayer16] = useState<SingleLayer>([]);
  const [layer17, setLayer17] = useState<SingleLayer>([]);
  const [layer18, setLayer18] = useState<SingleLayer>([]);
  const [layer19, setLayer19] = useState<SingleLayer>([]);
  const [layer20, setLayer20] = useState<SingleLayer>([]);
  const [layer21, setLayer21] = useState<SingleLayer>([]);
  const [layer22, setLayer22] = useState<SingleLayer>([]);
  const [layer23, setLayer23] = useState<SingleLayer>([]);
  const [layer24, setLayer24] = useState<SingleLayer>([]);
  const [layer25, setLayer25] = useState<SingleLayer>([]);
  const [layer26, setLayer26] = useState<SingleLayer>([]);
  const [layer27, setLayer27] = useState<SingleLayer>([]);
  const [layer28, setLayer28] = useState<SingleLayer>([]);
  const [layer29, setLayer29] = useState<SingleLayer>([]);
  const [layer30, setLayer30] = useState<SingleLayer>([]);
  const [layer31, setLayer31] = useState<SingleLayer>([]);

  const setters = [
    setLayer0,
    setLayer1,
    setLayer2,
    setLayer3,
    setLayer4,
    setLayer5,
    setLayer6,
    setLayer7,
    setLayer8,
    setLayer9,
    setLayer10,
    setLayer11,
    setLayer12,
    setLayer13,
    setLayer14,
    setLayer15,
    setLayer16,
    setLayer17,
    setLayer18,
    setLayer19,
    setLayer20,
    setLayer21,
    setLayer22,
    setLayer23,
    setLayer24,
    setLayer25,
    setLayer26,
    setLayer27,
    setLayer28,
    setLayer29,
    setLayer30,
    setLayer31,
  ] as const;

  const [datastructure, setDatastructure] = useState<IDataStructure>({
    blocks: [],
  });

  useEffect(() => {
    const onDataChange = (data: IInputStructure) => {
      console.log("Received data!", data);

      const [, minerNumberString] = /(\d+)/.exec(data.minerID);
      const minerNumber = parseInt(minerNumberString, 10);

      setters[minerNumber - 1](data.blocks)
    };

    threesome.on("3dmodel", onDataChange);

    return () => {
      threesome.off("3dmodel", onDataChange);
    };
  }, []);

  useEffect(() => {
    setDatastructure({
      blocks: [
        layer0,
        layer1,
        layer2,
        layer3,
        layer4,
        layer5,
        layer6,
        layer7,
        layer8,
        layer9,
        layer10,
        layer11,
        layer12,
        layer13,
        layer14,
        layer15,
        layer16,
        layer17,
        layer18,
        layer19,
        layer20,
        layer21,
        layer22,
        layer23,
        layer24,
        layer25,
        layer26,
        layer27,
        layer28,
        layer29,
        layer30,
        layer31,
      ],
    });
  }, [
    layer0,
    layer1,
    layer2,
    layer3,
    layer4,
    layer5,
    layer6,
    layer7,
    layer8,
    layer9,
    layer10,
    layer11,
    layer12,
    layer13,
    layer14,
    layer15,
    layer16,
    layer17,
    layer18,
    layer19,
    layer20,
    layer21,
    layer22,
    layer23,
    layer24,
    layer25,
    layer26,
    layer27,
    layer28,
    layer29,
    layer30,
    layer31,
  ]);

  console.log("rendering...", datastructure);

  for (let x = 0; x < GRID_SIZE.x; x++) {
    for (let y = 0; y < GRID_SIZE.y; y++) {
      for (let z = 0; z < GRID_SIZE.z; z++) {
        if (datastructure.blocks?.[x]?.[y]?.[z]) {
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
            -((0.5 - GRID_SIZE.z / 2) * SCALE_FACTOR),
          ]}
          scale={[SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR]}
          args={[GRID_SIZE.x, GRID_SIZE.y]}
        />
        <OrbitControls
          target={[
            (GRID_SIZE.x / 2) * SCALE_FACTOR,
            GRID_SIZE.y * SCALE_FACTOR,
            (GRID_SIZE.z / 2) * SCALE_FACTOR,
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

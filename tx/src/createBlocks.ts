// createBlocks: generates a 3D matrix of blocks.
// Path: tx/src/createBlocks.ts

export default function createBlocks(y: number, z: number, x: number) {
	let matrix: number[][][] = [];
	for (let i = 0; i < y; i++) {
		let layer: number[][] = [];
		for (let j = 0; j < z; j++) {
			let rowArray: number[] = [];
			for (let k = 0; k < x; k++) {
				rowArray.push(k);
			}
			layer.push(rowArray);
		}
		matrix.push(layer);
	}
	return matrix;
}

// let matrix = createBlocks(32, 32, 32);

import createBlocks from "./createBlocks";
let matrix = createBlocks(32, 32, 32);

print(textutils.serializeJSON(matrix[5][7][18]));

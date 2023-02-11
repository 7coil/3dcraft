--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]

local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        ____moduleCache[file] = { value = (select("#", ...) > 0) and module(...) or module(file) }
        return ____moduleCache[file].value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["createBlocks"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.default(self, x, y, z)
    local matrix = {}
    do
        local i = 0
        while i < x do
            local layer = {}
            do
                local j = 0
                while j < y do
                    local rowArray = {}
                    do
                        local k = 0
                        while k < z do
                            rowArray[#rowArray + 1] = k
                            k = k + 1
                        end
                    end
                    layer[#layer + 1] = rowArray
                    j = j + 1
                end
            end
            matrix[#matrix + 1] = layer
            i = i + 1
        end
    end
    return matrix
end
return ____exports
 end,
["index"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____createBlocks = require("createBlocks")
local createBlocks = ____createBlocks.default
local matrix = createBlocks(nil, 32, 32, 32)
print(textutils.serializeJSON(matrix[6][8][19]))
return ____exports
 end,
}
return require("index", ...)

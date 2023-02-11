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
["blocks"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local SIZE = 32
local function generator(self)
    local layer = {}
    local col = {}
    local row = {}
    do
        local i = 0
        while i < SIZE do
            local layer = {}
            do
                local j = 0
                while j < SIZE do
                    layer[#layer + 1] = col
                    j = j + 1
                end
            end
            i = i + 1
        end
    end
    return layer
end
____exports.generator = generator
return ____exports
 end,
["index"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
rednet.open("right")
rednet.broadcast("start")
rednet.close("right")
 end,
}
return require("index", ...)

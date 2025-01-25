export default class Tiled {
    static parse({tilemap, tileset, page, layers, encounters, spots}) {
        if(tilemap == undefined) {
            return undefined
        }

        if(tilemap["compressionlevel"] != -1) {
            return console.error("Tiled.parse does not yet support this compression level:", tilemap)
        }
        // if(tilemap.tilesets.length != 1) {
        //     return console.error("Tiled.parse does not yet support multile tilesets:", tilemap)
        // }

        layers = layers || tilemap.layers

        if(page != undefined) {
            const pageLayer = tilemap.layers.find((layer) => {
                return layer.type == "group"
                    && layer.name == "page:" + page
                    // && layer.visible == true (still loads invisible pages)
            })
            if(pageLayer == undefined) {
                throw new Error("Could not find tilemap page: " + page)
            }
            // DISCARDING EVERYHING ABOUT THE GROUP LAYER: X Y Z, ID, OPACITY, VISIBLE
            layers = pageLayer.layers
        }

        const world = {
            "width": tilemap.width,
            "height": tilemap.height,

            "blocks": {},
            "terrain": {},
            "units": {},
            // "collision": {},
            "edges": {},

            "spots": {},
        }

        if(encounters != undefined) {
            world.zones = {}
            encounters.forEach((encounter) => {
                world.zones[encounter.key] = processEncounterPolygon({
                    "key": encounter.key,
                    "zoomout": encounter.zoomout,
                    "points": encounter.points,
                    "encounterZ": encounter.z
                })
                return
            })
        }

        world.tileset = Tiled.parseTileset(tileset)

        layers.forEach((layer) => {
            layer.z = Tiled.findPropertyValue(layer.properties, "z") || 0

            if(layer.type == "objectgroup"
            && layer.name == "data:spots") {
                world.spots = world.spots || {}

                return layer.objects.forEach((object) => {
                    if(object.visible == false) return

                    const spot = {
                        "key": Tiled.findPropertyValue(object.properties, "key") || object.name,
                        "position": {
                            "x": object.x / tilemap.tileheight,
                            "y": object.y / tilemap.tileheight,
                            "z": Number.parseFloat(Tiled.findPropertyValue(object.properties, "z")) || layer.z || 1,
                        }
                    }

                    world.spots[spot.key] = world.spots[spot.key] || []
                    world.spots[spot.key].push(spot)
                })

            }

            if((layer.name == "data:zones" || layer.name == "data:encounters")
            && layer.type == "objectgroup"
            && world.zones == undefined) {
                world.zones = world.zones || {}

                return layer.objects.forEach((object) => {
                    if(object.visible == false) return

                    if(object.polygon != undefined) {
                        const encounter = processEncounterPolygon({
                            "key": Tiled.findPropertyValue(object.properties, "slug") || Tiled.findPropertyValue(object.properties, "key") || object.name,
                            "zoomout": parseFloat(Tiled.findPropertyValue(object.properties, "zoomout")) || 1,
                            "points": object.polygon.map((point) => {
                                return {
                                    "x": ((object.x + point.x) / tilemap.tileheight),
                                    "y": ((object.y + point.y) / tilemap.tilewidth),
                                    "key": point.key || nanoid(),
                                }
                            }),
                            "encounterZ": parseFloat(Tiled.findPropertyValue(object.properties, "z")) || layer.z || 1
                        })
                        encounter.name = Tiled.findPropertyValue(object.properties, "name"),
                        encounter.color = Tiled.findPropertyValue(object.properties, "color"),

                        world.zones[encounter.key] = encounter
                        return
                    }

                    const encounter = {
                        "key": Tiled.findPropertyValue(object.properties, "slug") || Tiled.findPropertyValue(object.properties, "key") || object.name,
                        "slug": Tiled.findPropertyValue(object.properties, "slug") || Tiled.findPropertyValue(object.properties, "key") || object.name, // to be deprecated
                        "name": Tiled.findPropertyValue(object.properties, "name"),
                        "color":  Tiled.findPropertyValue(object.properties, "color"),
                        "zoomout": parseFloat(Tiled.findPropertyValue(object.properties, "zoomout")) || 1,
                        "x": object.x / tilemap.tileheight,
                        "y": object.y / tilemap.tileheight,
                        "z": parseFloat(Tiled.findPropertyValue(object.properties, "z")) || layer.z || 1,
                        "width": Math.floor(object.width / tilemap.tileheight),
                        "height": Math.floor(object.height / tilemap.tileheight),
                        "events": {},
                        "conditions": [],
                    }
                    const x1 = encounter.x
                    const y1 = encounter.y
                    const x2 = encounter.x + encounter.width
                    const y2 = encounter.y + encounter.height
                    encounter.points = [
                        {"x": x1, "y": y1, "key": nanoid()},
                        {"x": x2, "y": y1, "key": nanoid()},
                        {"x": x2, "y": y2, "key": nanoid()},
                        {"x": x1, "y": y2, "key": nanoid()},
                    ]
                    encounter.zone = encounter

                    world.zones[encounter.key] = encounter
                })
            }

            if(layer.name == "data:units"
            && layer.type == "objectgroup") {
                return layer.objects.forEach((object) => {
                    if(object.visible == false) return

                    // object.type = object.type || Tiled.findPropertyValue(object.properties, "UnitType")
                    // object.type = object.type || Tiled.findPropertyValue(object.properties, "UnitReference")
                    // object.type = object.type || object.tile.type
                    // object.type = object.type || Tiled.findPropertyValue(object.tile.properties, "DefaultUnitType")
                    // object.type = object.type || Tiled.findPropertyValue(object.tile.properties, "UnitReference")
                    // if(object.type == undefined || object.type == "") {
                    //     return console.error("Tiled.parse could not find object type:", object)
                    // }

                    const unit = {}

                    if(object.properties != undefined) {
                        object.properties.forEach((property) => {
                            const name = property.name
                            unit[name] = unit[name] ?? Tiled.findPropertyValue(object.properties, name)
                            unit[name] = unit[name] ?? Tiled.findPropertyValue(object.tile.properties, name)
                        })
                    }

                    unit.key = unit.key ?? object.id
                    unit.position = {
                        "x": Math.floor(object.x / tilemap.tileheight), // - 1, // WHY IS THIS ALWAYS TILE_HEIGHT? ESPECIALLY FOR ISOMETRIC
                        "y": Math.floor(object.y / tilemap.tileheight) - 1, // AND WHY ARE WE -1??
                        "z": (layer.z || 1)
                    }

                    unit.level = unit.level ?? 1
                    unit.level = parseInt(unit.level)
                    // unit.affiliation = unit.affiliation ?? "none" // it is bad to default this so soon
                    // object.class = Tiled.findPropertyValue(object.properties, "Class")
                    // object.class = object.class || Tiled.findPropertyValue(object.tile.properties, "Class")
                    // object.class = object.class || undefined
                    //
                    // object.level = Tiled.findPropertyValue(object.properties, "Level")
                    // object.level = object.level || Tiled.findPropertyValue(object.tile.properties, "Level")
                    // object.level = object.level || 0
                    //
                    // object.affiliation = Tiled.findPropertyValue(object.properties, "affiliation")
                    // object.affiliation = object.affiliation || Tiled.findPropertyValue(object.tile.properties, "affiliation")
                    // object.affiliation = object.affiliation || "none"
                    //
                    // object.moverange = Tiled.findPropertyValue(object.properties, "moverange")
                    // if(object.moverange === undefined) {
                    //     object.moverange = Tiled.findPropertyValue(object.tile.properties, "moverange")
                    // }
                    //
                    // object.maxarmor = Tiled.findPropertyValue(object.properties, "maxarmor")
                    // if(object.maxarmor === undefined) {
                    //     object.maxarmor = Tiled.findPropertyValue(object.tile.properties, "maxarmor")
                    // }
                    //
                    // object.element = Tiled.findPropertyValue(object.properties, "element")
                    // object.element = object.element || Tiled.findPropertyValue(object.tile.properties, "element")
                    // object.element = object.element || undefined
                    //
                    // object.state = Tiled.findPropertyValue(object.properties, "state")

                    // unit.reference = object.type

                    if(Geometry.directions[unit.direction] != undefined) {
                        unit.direction = Geometry.directions[unit.direction]
                    }

                    Object.keys(unit).forEach((key) => {
                        if(unit[key] === undefined) {
                            delete unit[key]
                        }
                    })
                    world.units[unit.key] = unit
                })
            }

            if(layer.name == "data:collision"
            && layer.type == "tilelayer") {
                return Tiled.iterateTileLayer(layer, ({tilegid, position}) => {
                    tilegid -= FIRST_TILEGID
                    if(tilegid > -1) {
                        world.terrain[position.x + "x" + position.y] = world.terrain[position.xy] || {
                            "position": {"x": position.x, "y": position.y, "z": 0},
                            "size": {"x": 1, "y": 1, "z": 0},
                        }
                        world.terrain[position.x + "x" + position.y].hasCollision = true
                    }
                })
            }

            if(layer.type == "tilelayer"
            && layer.name == "tiles") {
                Tiled.iterateTileLayer(layer, ({position, tilegid}) => {
                    tilegid -= FIRST_TILEGID
                    // if(tilegid == -1) return
                    const tile = world.tileset.tiles[tilegid] || {}
                    // if(tile === undefined) return

                    position.z = layer.z || 1 // DEBUG
                    position.xy = position.x + "x" + position.y
                    position.xyz = position.xy + "x" + position.z

                    world.blocks[position.xyz] = world.blocks[position.xyz] || {}
                    world.blocks[position.xyz].position = world.blocks[position.xyz].position || position

                    if(tilegid != undefined
                    && tilegid != "-1") {
                        world.blocks[position.xyz].tilegid = tilegid
                        world.blocks[position.xyz].tileKey = tilegid + ""
                    }
                    // if(TILE_ANIMATIONS[tilegid] != undefined) {
                    //     world.blocks[position.xyz].animation = TILE_ANIMATIONS[tilegid]
                    // }

                    // world.blocks[position.xyz].image = tile.imageSource
                    // world.blocks[position.xyz].images = world.blocks[position.xyz].images || []
                    // world.blocks[position.xyz].images.push(tile.imageSource)
                    // if(tilegid > 0) {
                    //     world.blocks[position.xyz].imageVariants = [
                    //         world.tileset.tiles[tilegid]?.imageSource,
                    //         world.tileset.tiles[tilegid+1]?.imageSource,
                    //         world.tileset.tiles[tilegid+2]?.imageSource,
                    //     ]
                    // } else {
                    //     world.blocks[position.xyz].imageVariants = []
                    // }
                    if(Tiled.findPropertyValue(tile.properties, "type") != undefined) {
                        world.blocks[position.xyz].type = Tiled.findPropertyValue(tile.properties, "type")
                    }

                    const shape = Tiled.findPropertyValue(tile.properties, "shape") || "block"
                    if(shape == "north-edge" || shape == "west-edge") {
                        world.blocks[position.xyz].layer = "background"
                    } else if(shape == "south-edge" || shape == "east-edge") {
                        world.blocks[position.xyz].layer = "foreground"
                        // TODO: Build this out more?
                        // Can a tile declare both foreground and
                        // background elements? Or is this something
                        // that establish that tiles can be for both
                        // foreground and background but not both?
                    }

                    // TERRAIN //

                    world.terrain[position.xy] = world.terrain[position.xy] || {
                        "position": {"x": position.x, "y": position.y, "z": 0},
                        "size": {"x": 1, "y": 1, "z": 0},
                        "tileKey": tilegid + "",
                    }
                    // if(Tiled.findPropertyValue(tile.properties, "hasCollision") == true) {
                    //     world.terrain[position.xy].hasCollision = true
                    // }
                    if(Tiled.findPropertyValue(tile.properties, "isTree") == true) {
                        world.terrain[position.xy].isTree = true
                    }
                    // if(Tiled.findPropertyValue(tile.properties, "isWater") == true) {
                    //     world.terrain[position.xy].isWater = true
                    // }

                    // I think we have fully deprecated shapes? In favor of a depth variable in the tileset.
                    // if(shape == "block") {
                    //     const size = layer.z + 1
                    //     if(world.terrain[position.xy].size.z < size) {
                    //         world.terrain[position.xy].size.z = size
                    //     }
                    // }
                    // if(shape == "plane") {
                    //     const size = layer.z
                    //     if(world.terrain[position.xy].size.z < size) {
                    //         world.terrain[position.xy].size.z = size
                    //     }
                    // }

                    const peak = (layer.z || 1) + (Tiled.findPropertyValue(tile.properties, "depth") || 0) // DEBUG FOR Z 1
                    world.terrain[position.xy].size.z = Math.max(world.terrain[position.xy].size.z, peak)

                    // EDGES //

                    const edges = {
                        "north-edge": {"x": 0, "y": -1},
                        "south-edge": {"x": 0, "y": +1},
                        "east-edge": {"x": +1, "y": 0},
                        "west-edge": {"x": -1, "y": 0},
                    }
                    if(edges[shape] != undefined) {
                        const edgeDirection = edges[shape]
                        const edgeKey = (edgeDirection.x > 0 ? "+" : "") + edgeDirection.x + "x" + (edgeDirection.y > 0 ? "+" : "") + edgeDirection.y
                        world.edges[position.xyz + "/" + edgeKey] = true
                    }
                })
            }

            if(layer.type == "tilelayer"
            && layer.name == "data:edges") {
                Tiled.iterateTileLayer(layer, ({position, tilegid}) => {
                    tilegid -= FIRST_TILEGID
                    const tile = world.tileset.tiles[tilegid] || {}

                    position.z = layer.z || 1
                    position.xy = position.x + "x" + position.y
                    position.xyz = position.xy + "x" + position.z

                    const shape = Tiled.findPropertyValue(tile.properties, "shape") || "block"

                    // EDGES //
                    const edges = {
                        "north-edge": {"x": 0, "y": -1},
                        "south-edge": {"x": 0, "y": +1},
                        "east-edge": {"x": +1, "y": 0},
                        "west-edge": {"x": -1, "y": 0},
                    }
                    if(edges[shape] != undefined) {
                        const edgeDirection = edges[shape]
                        const edgeKey = (edgeDirection.x > 0 ? "+" : "") + edgeDirection.x + "x" + (edgeDirection.y > 0 ? "+" : "") + edgeDirection.y
                        world.edges[position.xyz + "/" + edgeKey] = {
                            "key": edgeKey,
                            "position": position,
                            "direction": edgeDirection,
                            "tilegid": tilegid,
                        }
                    }
                })
            }
        })

        // layers.forEach((layer, layerName) => {
        //     const type = layer.type
        //     const zlayer = layer?.properties?.find(element => element.name == "zlayer")?.value ?? 0
        //     const isCollisionLayer = (layer?.properties?.find(element => element.name == "collision")?.value ?? false) === true
        //     const isUnitsLayer = (layer?.properties?.find(element => element.name == "units")?.value ?? false) === true
        //
        //     if(type == "tilelayer") {
        //         layer.data.forEach((value, index) => {
        //             const x = index % protoworld.width
        //             const y = Math.floor(index / protoworld.width)
        //             const z = Number.parseInt(zlayer)
        //             if(isCollisionLayer) {
        //                 if(value != 0) {
        //                     world.collision[x + "x" + y] = world.collision[x + "x" + y] || {}
        //                     world.collision[x + "x" + y].hasCollision = true
        //                 }
        //             } else if(isUnitsLayer) {
        //                 if(value != 0) {
        //                     world.units[x + "x" + y] = world.units[x + "x" + y] || {}
        //                     world.units[x + "x" + y] = {"tilesetGID": value, "position": {x, y, z}}
        //                 }
        //             } else {
        //                 if(value != 0) {
        //                     world.display[z] = world.display[z] || {}
        //                     world.display[z][x + "x" + y] = {
        //                         "position": {x, y, z},
        //                         "tilesetGID": value,
        //                     }
        //                 }
        //             }
        //         })
        //     }
        // })

        // // console.log(protoworld)
        //
        // // for(let x = 0; x < protoworld.width; x += 1) {
        // //     for(let y = 0; y < protoworld.height; y += 1) {
        // //         const tileKey = x + "x" + y
        // //         protoworld.terrain[tileKey] = protoworld.terrain[tileKey] || {
        // //             "position": {"x": x, "y": y, "z": 0},
        // //             "size": { "x": 1, "y": 1, "z": 0 },
        // //         }
        // //     }
        // // }
        //
        // Objdict.forEach(protoworld.display, (layer, layerIndex) => {
        //     Objdict.forEach(layer, (tile, tileKey) => {
        //         const tilesetId = tile.tilesetGID - tileset.firstgid
        //         const tilesetTile = tileset.source.tiles[tilesetId]
        //         tile.image = tilesetTile.image
        //
        //         if(tilesetTile.sequentialId >= firstDayTile && tilesetTile.sequentialId < firstNightTile) {
        //             const nightTileSequentialId = firstNightTile + (tilesetTile.sequentialId - firstDayTile)
        //             Objdict.forEach(tileset.source.tiles, nightTile => {
        //                 if(nightTile.sequentialId == nightTileSequentialId) {
        //                     tile.nightImage = nightTile.image
        //                 }
        //             })
        //         }
        //
        //         const x = tile.position.x
        //         const y = tile.position.y
        //         protoworld.terrain[tileKey] = protoworld.terrain[tileKey] || {
        //             "position": {"x": x, "y": y, "z": 0},
        //             "size": { "x": 1, "y": 1, "z": 0 },
        //         }
        //         const terrainData = protoworld.terrain[tileKey]
        //
        //         const zindex = parseInt(layerIndex)
        //         // If the highest terrain block is a
        //         // ramp, it should be considered a half-block.
        //         if(terrainData.size.z < zindex + 1) {
        //             const shape = tilesetTile.shape || "block"
        //             const shapeData = shapes[shape]
        //             const tileIsCollidable = tilesetTile.hasCollision === undefined ? true : tilesetTile.hasCollision
        //             const isWalkable = tilesetTile.walkable === undefined ? true : tilesetTile.walkable
        //             const hasCollision = protoworld.collision[tileKey] != undefined
        //
        //             // terrainData.shape = shape
        //             terrainData.hasCollision = hasCollision // !isWalkable ||
        //
        //             // terrainData.isPath = tilesetTile.isPath
        //             // terrainData.isTree = tilesetTile.isTree
        //
        //             if(tileIsCollidable === false) {
        //                 // Ignore the shape, don't add any height
        //                 terrainData.size.z = zindex
        //             } else if(shapeData != undefined) {
        //                 // Use the shape to determine the tile's height
        //                 terrainData.size.z = zindex + shapeData.size
        //             } else {
        //                 // Assume block
        //                 terrainData.size.z = zindex + 1
        //             }
        //         }
        // //         protoworld.terrain[tileKey] = protoworld.terrain[tileKey] || {
        // //             "position": {"x": x, "y": y, "z": 0},
        // //             "size": { "x": 1, "y": 1, "z": 0 },
        // //         }
        //
        //         protoworld.terrain[tileKey] = terrainData
        //     })
        // })

        if(spots !== undefined) {
            world.spots = spots
        }

        return world
    }
    static parseTileset(tileset) {
        // const context = require.context("@frog/source/data/levels/tiles/", true, /\.png$/)
        // context.keys().forEach((key) => {
        //     console.log(key)
        //     console.log(context(key))
        // })

        return {
            "tiles": Objdict.convert(tileset.tiles.map((tile) => {
                if(tile.image == "null.png") return
                return {
                    "key": tile.id + "",
                    "id": tile.id,
                    "type": tile.type,
                    "imageWidth": tile.imagewidth,
                    "imageHeight": tile.imageheight,
                    // "imageSource": context(tile.image.replace("tiles/", "./")),
                    // "imageSource": require("@frog/source/data/levels/tiles/" + (tile.image.replace(".png", "").replace("./tiles/", "")) + ".png"),
                    // "imageSource": require(TILE_DIRECTORY + (tile.image.replace(".png", "")) + ".png"),
                    // "imageSource": require(TILE_DIRECTORY + tile.image),
                    "properties": tile.properties,
                }
            }))
        }
    }
    static iterateTileLayer(layer, func) {
        layer.data.forEach((tilegid, index) => {
            const position = {}
            position.x = index % layer.width
            position.y = Math.floor(index / layer.width)
            func({position, tilegid, index})
        })
    }
    static findPropertyValue(properties, name) {
        if(name == undefined) return
        if(properties == undefined) return
        const property = properties.find((property) => {
            if(property == undefined) return false
            if(property.name == undefined) return false
            if(property.name.toLowerCase() == name.toLowerCase()) return true
        })
        if(property != undefined) {
            return property.value
        }
    }
}

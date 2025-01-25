import Objdict from "objdict"

const FIRST_TILEGID = 1

export default class World {
    constructor({tilemap, tileset}) {
        if(tilemap == undefined) {
            return undefined
        }

        if(tilemap["compressionlevel"] != -1) {
            return console.error("Tiled.parse does not yet support this compression level:", tilemap)
        }

        this.width = tilemap.width
        this.height = tilemap.height
        this.terrain = {}

        this.tileset = this.parseTileset(tileset)

        tilemap.layers.forEach((layer) => {
            if(layer.name == "data:collision"
            && layer.type == "tilelayer") {
                return this.iterateTileLayer(layer, ({tilegid, position}) => {
                    tilegid -= FIRST_TILEGID
                    if(tilegid > -1) {
                        position.xy = position.x + "x" + position.y
                        this.terrain[position.xy] = this.terrain[position.xy] || {"position": {...position}}
                        this.terrain[position.x + "x" + position.y].hasCollision = true
                    }
                })
            }

            if(layer.type == "tilelayer"
            && layer.name == "tiles") {
                return this.iterateTileLayer(layer, ({position, tilegid}) => {
                    tilegid -= FIRST_TILEGID
                    const tile = this.tileset.tiles[tilegid] || {}

                    position.xy = position.x + "x" + position.y
                    this.terrain[position.xy] = this.terrain[position.xy] || {
                        "position": {...position},
                    }

                    if(tilegid != undefined
                    && tilegid != "-1") {
                        this.terrain[position.xy].tileKey = tilegid + ""
                    }

                    if(tile != undefined) {
                        this.terrain[position.xy].tile = tile
                    }

                    if(this.findPropertyValue(tile.properties, "type") != undefined) {
                        this.terrain[position.xy].type = this.findPropertyValue(tile.properties, "type")
                    }

                    if(this.findPropertyValue(tile.properties, "goto") != undefined) {
                        this.terrain[position.xy].goto = this.findPropertyValue(tile.properties, "goto")
                    }
                })
            }
        })
    }
    parseTileset(tileset) {
        return {
            "tiles": Objdict.convert(tileset.tiles.map((tile) => {
                if(tile.image == "null.png") return
                return {
                    "key": tile.id + "",
                    "type": tile.type,
                    "imageWidth": tile.imagewidth,
                    "imageHeight": tile.imageheight,
                    "properties": tile.properties,
                }
            }))
        }
    }
    iterateTileLayer(layer, func) {
        layer.data.forEach((tilegid, index) => {
            const position = {}
            position.x = index % layer.width
            position.y = Math.floor(index / layer.width)
            func({position, tilegid, index})
        })
    }
    findPropertyValue(properties, name) {
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

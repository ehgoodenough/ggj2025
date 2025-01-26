import Objdict from "objdict"
import isPointInPolygon from "point-in-polygon"

const FIRST_TILEGID = 1

const TILE_IMAGES = {
    "89": require("data/tiles/neoquest/cave_ent.gif"),
    "90": require("data/tiles/neoquest/city.gif"),
    "91": require("data/tiles/neoquest/forest.gif"),
    "92": require("data/tiles/neoquest/grassland.gif"),
    "93": require("data/tiles/neoquest/hills.gif"),
    "94": require("data/tiles/neoquest/jungle.gif"),
    "95": require("data/tiles/neoquest/mountain.gif"),
    "96": require("data/tiles/neoquest/swamp.gif"),
    "97": require("data/tiles/neoquest/water_iso.gif"),
    "100": require("data/tiles/neoquest/lava.gif"),
    "101": require("data/tiles/neoquest/glitch.gif"),
    "102": require("data/tiles/neoquest/castle.gif"),
    "107": require("data/tiles/neoquest/castle_carpet.gif"),
    "108": require("data/tiles/neoquest/castle_floor.gif"),
    "109": require("data/tiles/neoquest/castle_pillar.gif"),
    "110": require("data/tiles/neoquest/castle_walls.gif"),
    "111": require("data/tiles/neoquest/sword.gif"),
    "112": require("data/tiles/neoquest/down_arrow.gif"),
    "113": require("data/tiles/neoquest/door.jpg"),
    "114": require("data/tiles/neoquest/glitch2.gif"),
}

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
        this.zones = []

        this.tileset = this.parseTileset(tileset)

        tilemap.layers.forEach((layer) => {
            if(layer.type == "objectgroup"
            && layer.name == "zones") {
                layer.objects.forEach((object) => {
                    if(object.visible == false) return

                    if(object.polygon != undefined) {
                        this.zones.push(this.processPolygonZone({
                            "key": this.findPropertyValue(object.properties, "key") || object.name,
                            "teleport": this.findPropertyValue(object.properties, "teleport"),
                            "link": this.findPropertyValue(object.properties, "link"),
                            "autolink": this.findPropertyValue(object.properties, "autolink"),
                            "hurt": this.findPropertyValue(object.properties, "hurt"),
                            "text": this.findPropertyValue(object.properties, "text"),

                            "points": object.polygon.map((point) => {
                                return {
                                    "x": ((object.x + point.x) / tilemap.tileheight),
                                    "y": ((object.y + point.y) / tilemap.tilewidth),
                                    "key": point.key,
                                }
                            })
                        }))
                    } else {
                        this.zones.push(this.processSquareZone({
                            "key": this.findPropertyValue(object.properties, "key") || object.name,
                            "teleport": this.findPropertyValue(object.properties, "teleport"),
                            "link": this.findPropertyValue(object.properties, "link"),
                            "autolink": this.findPropertyValue(object.properties, "autolink"),
                            "hurt": this.findPropertyValue(object.properties, "hurt"),
                            "text": this.findPropertyValue(object.properties, "text"),

                            "x": object.x / tilemap.tileheight,
                            "y": object.y / tilemap.tileheight,
                            "width": Math.floor(object.width / tilemap.tileheight),
                            "height": Math.floor(object.height / tilemap.tileheight)
                        }))
                    }
                })
            }

            if(layer.name == "data:collision"
            && layer.type == "tilelayer") {
                return this.iterateTileLayer(layer, ({tilegid, position}) => {
                    tilegid -= FIRST_TILEGID
                    if(tilegid > -1) {
                        position.xy = position.x + "/" + position.y
                        this.terrain[position.xy] = this.terrain[position.xy] || {"position": {...position}}
                        this.terrain[position.xy].hasCollision = true
                    }
                })
            }

            if(layer.type == "tilelayer"
            && layer.name == "tiles") {
                return this.iterateTileLayer(layer, ({position, tilegid}) => {
                    tilegid -= FIRST_TILEGID
                    const tile = this.tileset.tiles[tilegid] || {}

                    position.xy = position.x + "/" + position.y
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

                    if(this.findPropertyValue(tile.properties, "link") != undefined) {
                        this.terrain[position.xy].link = this.findPropertyValue(tile.properties, "link")
                    }

                    if(this.findPropertyValue(tile.properties, "autolink") != undefined) {
                        this.terrain[position.xy].autolink = this.findPropertyValue(tile.properties, "autolink")
                    }

                    if(this.findPropertyValue(tile.properties, "hurt") != undefined) {
                        this.terrain[position.xy].hurt = this.findPropertyValue(tile.properties, "hurt")
                    }

                    if(this.findPropertyValue(tile.properties, "teleport") != undefined) {
                        this.terrain[position.xy].teleport = this.findPropertyValue(tile.properties, "teleport")
                    }

                    if(this.findPropertyValue(tile.properties, "color") != undefined) {
                        this.terrain[position.xy].color = this.findPropertyValue(tile.properties, "color")
                    }

                    if(this.findPropertyValue(tile.properties, "hasCollision") != undefined) {
                        this.terrain[position.xy].hasCollision = this.findPropertyValue(tile.properties, "hasCollision")
                    }

                    if(TILE_IMAGES[tilegid] != undefined) {
                        this.terrain[position.xy].image = TILE_IMAGES[tilegid]
                    }
                })
            }
        })

        Object.values(this.terrain).forEach((terrain) => {
            terrain.interests = terrain.interests || []
            this.zones.forEach((zone) => {
                if(this.isInZone(zone, terrain.position)) {
                    terrain.interests.push({
                        "text": zone.text,
                        "link": zone.link,
                    })
                    if(zone.teleport != undefined) {
                        terrain.teleport = zone.teleport
                    }
                    if(zone.hurt != undefined) {
                        terrain.hurt = zone.hurt
                    }
                    if(zone.autolink != undefined) {
                        terrain.autolink = zone.autolink
                    }
                }
            })
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
    processSquareZone(zone) {
        const x1 = zone.x
        const y1 = zone.y
        const x2 = zone.x + zone.width
        const y2 = zone.y + zone.height
        zone.points = [
            {"x": x1, "y": y1},
            {"x": x2, "y": y1},
            {"x": x2, "y": y2},
            {"x": x1, "y": y2},
        ]
        return zone
    }
    processPolygonZone(zone) {
        // We expect all points to be defined in clockwise
        // order, particularly for rendering the polygon.
        // If the zone was defined counterclockwise,
        // go ahead and reverse the order of the points.
        // We can check if the zone was defined in
        // counterclockwise order by computing the area.
        // If its area is negative, it is counterclockwise.

        zone.area = Geometry.area(zone.points)
        if(zone.area < 0) zone.points.reverse()

        zone.points.forEach((point, index) => {
            const a = zone.points[(index + 0) % zone.points.length]
            const b = zone.points[(index + 1) % zone.points.length]
            const c = zone.points[(index + 2) % zone.points.length]
            b.internalAngle = Geometry.direction(a, c)
            b.internalAngle = Geometry.rotate(b.internalAngle, 90)
        })

        zone.x1 = Math.min(...zone.points.map((point) => point.x))
        zone.x2 = Math.max(...zone.points.map((point) => point.x))
        zone.y1 = Math.min(...zone.points.map((point) => point.y))
        zone.y2 = Math.max(...zone.points.map((point) => point.y))
        zone.x = zone.x1
        zone.y = zone.y1
        zone.width = zone.x2 - zone.x1
        zone.height = zone.y2 - zone.y1
        zone.center = {
            "x": zone.x + ((zone.x2 - zone.x1) / 2) + 0.5,
            "y": zone.y + ((zone.y2 - zone.y1) / 2) + 0.5
        }

        return zone
    }
    isInZone(zone, position) {
        if(zone.points != undefined) {
            return isPointInPolygon([position.x, position.y], zone.points.map((point) => [point.x, point.y]))
        }
        return position != undefined
            && position.x >= zone.x
            && position.x < zone.x + zone.width
            && position.y >= zone.y
            && position.y < zone.y + zone.height
    }
}


const Geometry = {}
Geometry.normalize = function(a) {
    const x = a.x / Geometry.length(a)
    const y = a.y / Geometry.length(a)
    return { "x": x, "y": y }
}
Geometry.length = function(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y)
}
Geometry.vector = function(a, b) {
    a = Geometry.default(a)
    b = Geometry.default(b)
    return {
        "x": Math.sign(a.x - b.x),
        "y": Math.sign(a.y - b.y),
        "z": Math.sign(a.z - b.z),
    }
}

Geometry.rotate = function(p, degrees) {
    const radians = degrees * (Math.PI / 180)
    return {
        "x": (p.x * Math.cos(radians)) - (p.y * Math.sin(radians)),
        "y": (p.x * Math.sin(radians)) + (p.y * Math.cos(radians)),
        "z": p.z,
    }
}
Geometry.default = function(p) {
    if(p == undefined) {
        return {"x": 0, "y": 0, "z": 0}
    }
    if(isNaN(p) == false) {
        return {
            "x": p,
            "y": p,
            "z": p,
        }
    }
    return {
        "x": p.x || 0,
        "y": p.y || 0,
        "z": p.z || 0,
    }
}
Geometry.area = function(points) {
    let area = 0
    for (var i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length
        area += points[i].x * points[j].y
        area -= points[j].x * points[i].y
    }
    return area / 2
}
Geometry.direction = function(a, b) {
    return Geometry.normalize(Geometry.vector(a, b))
}

import NavigationError from "./NavigationError.js"

export default class Navigation {
    constructor({defaultPath}) {
        this.routes = []

        this.defaultPath = defaultPath
        this.lastTouchedTime = Date.now()

        if(typeof window != "undefined") {
            window.addEventListener("DOMContentLoaded", (event) => {
                this.load(window.location.hash)
            })
            window.addEventListener("hashchange", (event) => {
                this.load(window.location.hash)
            })
        }
    }
    go(path = "", data = {}) {
        window.location.hash = path
        // data.path = data.path || path
        // window.location.hash = JSON.stringify(data)

        // window.history.replaceState(data, "Frog " + Math.floor(Math.random() * 1000), "#" + path)

        // this.load(path, data)
    }
    load(path) { //, data) {
        this.lastTouchedTime = Date.now()


        if(path == ""
        || path == "#/") {
            path = this.defaultPath
        }

        path = decodeURIComponent(path)
        path = path[0] == "#" ? path.substring(1) : path

        let data
        // try {
        //     data = JSON.parse(path)
        // } catch {
        //     // console.log("could not parse hash as json", path)
        //     return
        // }
        // if(data.path != undefined) {
        //     path = data.path
        // }
        this.path = path

        if(path.charAt(path.length - 1) == "/") {
            path = path.substring(0, path.length - 1)
        }
        this.request = {
            "path": path,
            "data": data
        }
        for(let index in this.routes) {
            const route = this.routes[index]
            const match = this.request.path.match(route.path)
            if(match != undefined) {
                this.request.wildcards = match.groups
                try {
                    this.response = route.func(this.request)
                    if(this.response != undefined) {
                        this.state = this.response
                    }
                    return
                } catch(error) {
                    this.request.error = error
                    if(error instanceof NavigationError
                    && this.onNavigationError instanceof Function) {
                        this.state = this.onNavigationError(this.request) || this.state
                    } else if(this.onError instanceof Function) {
                        this.state = this.onError(this.request) || this.state
                        throw error
                    }
                }
            }
        }
    }
    on(path, func) {
        if(path instanceof Error) {
            this.routes[path] = {path, func}
            return
        }
        if(path instanceof RegExp != true) {
            path = path.replace(/\*/g, "(.*)")

            const WILDCARDS = /\:[a-zA-Z]+/g
            const wildcards = path.match(WILDCARDS)
            if(wildcards != undefined) {
                wildcards.forEach((wildcard) => {
                    path = path.replace(wildcard, "(?<" + wildcard.substring(1) + ">.*)")
                })
            }

            path = new RegExp("^" + path + "$", "i")
        }
        this.routes.push({path, func})
    }
}

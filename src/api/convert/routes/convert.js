"use strict"

// analytics controller definition 

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/convert",
            handler: "convert.index"
        }
    ]
}

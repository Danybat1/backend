
// io server definition 

const io = require("socket.io")

class IOServer {
    static io = io;
}

module.exports = {
    IOServer
}

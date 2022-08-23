const net = require("net");
const { IP, PORT } = require("./constants");

// establishes a connection with the game server
const connect = function () {
    const conn = net.createConnection({
        host: IP, // IP address here,
        port: PORT, // PORT number here,
    });

    // interpret incoming data as text
    conn.setEncoding("utf8");

    conn.on('connect', () => {
        console.log("Successfully connected to game server.");
        conn.write("Name: OJO");
        // conn.write("Move: up");
    });

    conn.on('data', (data) => {
        console.log(data.toString());
        conn.end();
    });

    conn.on('end', () => {
        console.log('disconnected from server');
    });

    return conn;
};



module.exports = { connect }



let connection
let command = ""
let scan = false
let message = ""

// FUNCTION TO HANDLE USER INPUT 
const handleUserInput = function (key) {
    if (key === '\u0003') {
        console.log("closing keyboard listener input");
        process.exit();
    } else {
        if (key == "w" && scan) {
            command = "Move: up"
        }
        else if (key == "a" && !scan) {
            command = "Move: left"
        }
        else if (key == "s" && !scan) {
            command = "Move: down"
        }
        else if (key == "d" && !scan) {
            command = "Move: right"
        }
        else if (key == "m" && !scan) {
            scan = true;
            console.log("enetering message mode")
        }
        else if (scan) {
            console.log(message)
            message += key
            console.log(message.length)
            if (message.length >= 10) {
                console.log("message limit has been reached")
                scan = false;
                command = "Say: " + message;
                message = ""
            }
        }

        console.log(command);
        if (!scan) {
            connection.write(command)
        }

    }

};

// setup interface to handle user input from stdin
const setupInput = function (conn) {
    connection = conn
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.resume();

    stdin.on("data", handleUserInput);
    return stdin;
};


module.exports = { setupInput }
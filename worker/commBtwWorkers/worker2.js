var worker1port;
var onMessageFromWorker1 = function(event) {
    console.log("Worker 2 received a message from worker 1: " + event.data);

    //To send something back to worker 1
    //worker1port.postMessage("");
};

self.onmessage = function(event) {
    switch (event.data.command) {
        // Setup connection to worker 1
        case "connect":
            worker1port = event.ports[0];
            worker1port.onmessage = onMessageFromWorker1;
            break;

            // Forward messages to worker 1
        case "forward":
            // Forward messages to worker 1
            worker1port.postMessage(event.data.message);
            break;

            //handle other messages from main
        default:
            console.log(event.data);
    }
};
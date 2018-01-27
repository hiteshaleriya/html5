self.addEventListener("message", function(e) {
    if (e.data.cmd == "avg") {
        var len = e.data.arr.length;
        var sum = e.data.arr.reduce(function(a, b) {
            return a + b;
        });
        self.postMessage(sum / len);
    }
});
const express = require("express");
const notifier = require("node-notifier");
const path = require("path")
const app = express();
const port = 9000;

app.use(express.json());

app.get("/health", (req, res) => res.status(200).send());
app.post("/notify",(req, res) => {
    notify(req.body, reply => res.send(reply))
});

app.listen(port, ()=>console.log(`Listening on port: ${port}`))

function notify  ({title, message}, callback) {
    notifier.notify(
        {
            title: title || "Unknown",
            message: message || "Not found",
            icon: path.join(__dirname, "gopher.png"),
            sound: true,
            reply: true,
            closeLabel: "Done",
            timeout: 15
        },
        (err, response, reply) => {
            callback(reply)
        }
    )
}


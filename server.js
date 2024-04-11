const express = require('express')
const path = require("path");
const app = express();
app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.resolve("build/index.html")));
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
}); 
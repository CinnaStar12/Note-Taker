const express = require ("express")
const path = require ("path")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("public"))

app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname,"/public/index.html"))
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
    
})

app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", (err,data) => {
        if(err){
            throw err
        }
        return res.json(data)
    })
});

app.post("/api/notes", function(req, res) {
    let note = JSON.stringify(req.body)
    fs.appendFile("./db/db.json", note, (err) => {
        if(err) throw err;   
    })
    res.json(note)
})



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})
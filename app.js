const Parser = require('./parser');
const express = require('express');
const app = express();
const port = (process.env.PORT || '3001');
const path = require('path');
const fs = require('fs')
const { PythonShell } = require('python-shell');
const bodyParser = require('body-parser')

//var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', urlencodedParser, (req, res) => {
    console.log(req.body._url);
    let options = { 
        mode: 'text',
        pythonOptions: ['-u'],    
        // TODO: url/reques exception handling
        args: [req.body._url]
    };

    PythonShell.run('scraper.py', options, function (err, result){
        if (err) throw err;
        console.log('result: ', result.toString());

        fs.readFile("./temp/temp.txt", (err, data) => {
            if (err) { console.error(err); return }

            let playlistData_String = data.toString()
            let playlistData_JSON = JSON.parse(playlistData_String)
            res.send(Parser(playlistData_JSON, "Playlist"))
        });
    });
});

app.listen(port, () => {
    console.log(`The app is up on ${port}...`)
})

function isValidUrl(url) {
    // TODO: ...
}
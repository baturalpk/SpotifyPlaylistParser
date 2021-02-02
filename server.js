const Parser = require('./parser');
const express = require('express');
const fs = require('fs')
const { PythonShell } = require('python-shell');
const bodyParser = require('body-parser')
const isValidUrl = require('valid-url').isHttpsUri
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const path = require('path');

const app = express();
app.set('port', (process.env.PORT || '3000'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', urlencodedParser, (req, res) => {
    
    let _URL = req.body._url
    
    if (! isValidUrl(_URL)) {
        res.send("NOT A VALID URL!");
        return;
    }
    
    let options = { 
        mode: 'text',
        pythonOptions: ['-u'],
        args: [_URL]
    };

    PythonShell.run('scraper.py', options, function (err, result){
        if (err) throw err;
        console.log('result: ', result.toString());

        fs.readFile("./temp/temp.txt", (err, data) => {
            if (err) { console.error(err); res.send("Read-file exception!"); }

            try {
                let playlistData_String = data.toString();
                let playlistData_JSON = JSON.parse(playlistData_String);
                parsedData = Parser(playlistData_JSON, "Playlist");
                res.render('result', {data: parsedData});
                
            } catch (error) {
                res.send("Scraping error..! Try again with a valid URL.");
            }
        });
    });
});

app.listen(app.get('port'), () => {
    console.log(`The app is up on ${app.get('port')}...`)
})
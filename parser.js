const fs = require('fs')

const PlaylistParser = (data, type) => {
    if (type === 'Playlist') {
        var parsedData = {
            "name": data.name,
            "owner": data.owner.display_name,
            "length": data.tracks.total,
            "tracks": []
        }

        for (var i = 0; i < parsedData.length; ++i) {

            if (i == 100) break;

            var trackInfo = {
                "track": {
                    "name": data.tracks.items[i].track.name,
                    "artists": {}
                }
            }

            var artists = '';
            for (var j = 0; j < data.tracks.items[i].track.artists.length; ++j) {
                if (j != 0)
                    artists += ' & ' + data.tracks.items[i].track.artists[j].name;
                else
                    artists += data.tracks.items[i].track.artists[j].name;
            }
            
            trackInfo.track.artists = artists;
            parsedData.tracks.push(trackInfo);
        }
            
        ClearTempFile();
        return parsedData;
    }
    else if (type === 'MP3') {
        // TODO: play or download preview music
        return parsedData;
    }
    else 
        console.log('JsonParser: wrong type decleration!');
}

const ClearTempFile = () => fs.writeFile("./temp/temp.txt", '', (err) => {
    if (err) { console.error(err); return }
    console.log("Clearing temp file...")
});

module.exports = PlaylistParser;
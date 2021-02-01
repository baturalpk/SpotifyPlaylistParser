const fs = require('fs')

const PlaylistParser = (data, type) => {
    var result = '';
    if (type === 'Playlist') {
        result += `PLAYLIST: ${data.name}\n`;
        result += `Owner: ${data.owner.name}\n`;
        result += `Number of songs: ${data.tracks.total}\n`;
        result += `TRACKS:\n`;
        
        for (var i = 0; i < data.tracks.total; ++i)
            result += `\t${i+1}. ${data.tracks.items[i].track.name}`;

        ClearTempFile();
        console.log(result);
        return result;
    }
    else if (type === 'MP3') {
        // TODO: play or download preview music
    }

    else 
        console.log('JsonParser: wrong type decleration!');
}

const ClearTempFile = () => fs.writeFile("./temp/temp.txt", '', (err) => {
    if (err) { console.error(err); return }
    console.log("Clearing temp file...")
});

module.exports = PlaylistParser;
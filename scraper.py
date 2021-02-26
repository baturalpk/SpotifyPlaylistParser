from bs4 import BeautifulSoup as bs4
import requests as rq
import re
import sys

URL = sys.argv[1]

if URL.startswith('https://open.spotify.com/playlist/'):
    try:
        content = rq.get(URL)
    except:
        print("URL connection error!")

    try:
        bs = bs4(content.text, 'html.parser')
        script = bs.find_all('script').pop(5)
        playlistData = ""
        for line in script:
            isMatch = re.search("Spotify.Entity", line)
            if isMatch:
                playlistData = line

        playlistData = playlistData.strip()
        playlistData = playlistData[34:]
        playlistData = playlistData[:-1]

        f = open('./temp/temp.txt', 'w')
        f.write(playlistData)
        f.close()
        print("Scraping completed...")
    except:
        print("Scraping exception!")
else:
    print("Not a Spotify playlist URL error!")
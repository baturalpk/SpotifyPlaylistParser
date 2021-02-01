from os import confstr, write
from bs4 import BeautifulSoup as bs4
import requests as rq
import re
import sys

# TODO: handle exceptions for URLs and JS-parser !!!

URL = sys.argv[1]
content = rq.get(URL)

bs = bs4(content.text, 'html.parser')
script = bs.find_all('script').pop(8)

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
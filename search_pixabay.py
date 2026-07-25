import urllib.request
import json
import re

url = "https://pixabay.com/music/search/shehnai/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # search for mp3 urls
    matches = re.findall(r'https://cdn\.pixabay\.com/download/audio/[^"]+\.mp3\?filename=[^"]+', html)
    if matches:
        print(matches[0])
    else:
        # maybe search for wedding
        url2 = "https://pixabay.com/music/search/indian%20wedding/"
        req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
        html2 = urllib.request.urlopen(req2).read().decode('utf-8')
        matches2 = re.findall(r'https://cdn\.pixabay\.com/download/audio/[^"]+\.mp3', html2)
        print(matches2[:5])
except Exception as e:
    print(e)

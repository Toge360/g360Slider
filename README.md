# getPosts
Facebook to Homepage Tool
<<<<<<< HEAD
=======

## Info

Die Daten werden als JSON in einer TXT Datei gespeichert.
Aktualisiert wird die Textdatei über den Aufruf des Scriptes getposts.php?pid=[Facebook-Seiten-ID]
Dies sollte normalerweise über einen Cronjob erfolgen.

Die Textdatei bekommt die Namensstruktur "[Object]_[Facebook-Seiten-ID].txt" (Bsp.: feed_142391185799397.txt)

## Config
data-fid = Facebook ID der Seite
data-max = Anzahl der Ausgabeelemente
data-debug = Console shows JSON

## Needed
g360getposts.js
jQuery

## Alle Meldungen ausgeben
```
<div id="g360_getposts" data-fid="[Facebook-Seiten-ID]" data-max="10" data-debug="1"></div>
```

## Alle Alben ausgeben
```
<div id="g360_getalbums" data-fid="[Facebook-Seiten-ID]" data-debug="1"></div>
```

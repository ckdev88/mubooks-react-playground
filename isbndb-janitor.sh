#!/bin/sh

# shell script to turn 20+ GB library into a version that can be but in a single client-side file.
# yes, this code is really, really ugly, but it serves it's purpose just fine
# ... 

formatJSON(){
	du -h --block-size=M swap | tr '\n' ' ' &&    echo '  formatting' &&
	sed -i 's/\}/\}\,/g' swap && # add comma after each ending curly brace
	sed -i '$ s/.$//' swap && # remove comma at end of document
	sed -i '1 i\[' swap && echo "]" >> swap  # add brackets at beginning and end of file'
}

echo "Let's do this!" && 

du -h --block-size=M source.jsonl | tr '\n' '    ' && echo '  select only lines which contain values for keys: pages, authors, date_published (1-2min)' &&
du -h --block-size=M source.jsonl | tr '\n' '    ' && echo '     pages...' &&
grep '"pages": ' source.jsonl > swap1 && 
du -h --block-size=M swap1 | tr '\n' '    '	       && echo '     authors...' &&
grep -v '"authors": \[\]' swap1 > swap2  &&
grep '"authors": ' swap2 > swap1  && 
du -h --block-size=M swap1 | tr '\n' '    '        && echo '     date_published...' &&
grep '"date_published": ' swap1 > swap2 &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '     engelstalig...' &&
grep '"language": "en"' swap2 > fallback1 &&

du -h --block-size=M fallback1 | tr '\n' '    '    && echo '...' &&

grep -v '"date_published":.*[A-Za-z]' fallback1 > swap2 &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '     remove first " after date_published...' &&
sed -i 's/\"date_published\": \"/\"date_published\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '     remove " before }...' &&
sed -i 's/\"\}/\}/g' swap2 &&

cp swap2 fallback2 &&
du -h --block-size=M fallback2 | tr '\n' '    '    && echo '...' &&

du -h --block-size=M swap2 | tr '\n' '    '        && echo '  applying soft replacements' &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '    normalizing Http/http...' &&
sed -i 's/Http/http/g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '    shortening cover urls...' &&
sed -i 's/https:\/\/images\.isbndb\.com\/covers//g' swap2 &&

cp swap2 fallback3 &&
du -h --block-size=M fallback3 | tr '\n' '    '    && echo '...' &&

du -h --block-size=M swap2 | tr '\n' '    '        && echo '  remove specific fields' &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '    synopsys, if before publisher (4-5min)...' && 
sed -i 's/synopsys/synopsis/g' swap2 &&
sed -i 's/\"synopsis\": \(.*\), \"publisher/\"publisher/g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '    ...or before title_long...' && 
sed -i 's/\"synopsis\": \(.*\), \"title_long/\"title_long/g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    '        && echo '    subjects, if before publisher...' && 
sed -i 's/\"subjects\": \(.*\), \"publisher\": /\"publisher\": /g' swap2 &&

cp swap2 fallback4 &&
du -h --block-size=M fallback4 | tr '\n' '    '    && echo '...' &&

du -h --block-size=M swap2 | tr '\n' '    '        && echo '    get rid of too much empty spaces...' && 
sed -i 's,   , ,g' swap2 &&
sed -i 's,    , ,g' swap2 &&
sed -i 's,  , ,g' swap2 &&

du -h --block-size=M swap2 | tr '\n' '    ' && echo '    msrp, if before image...' && 
sed -i 's/\"msrp\": \(.*\), \"image\": /\"image\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    ...or before pages...' && 
sed -i 's/\"msrp\": \(.*\), \"pages\": /\"pages\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    isbn13, if before authors...' &&
sed -i 's/\"isbn13\": \(.*\), \"authors\": /\"authors\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    binding, if before edition...' &&
sed -i 's/\"binding\": \(.*\), \"edition\": /\"edition\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    ...or before related...' &&
sed -i 's/\"binding\": \(.*\), \"related\": /\"edition\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    ...or before language...' &&
sed -i 's/\"binding\": \(.*\), \"language\": /\"language\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    ...or before date_published...' &&
sed -i 's/\"binding\": \(.*\), \"date_published\": /\"date_published\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    related, if before language...' &&
sed -i 's/\"related\": \(.*\), \"language\": /\"language\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    edition, if before language...' &&
sed -i 's/\"edition\": \(.*\), \"language\": /\"language\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    ...or before date_published...' &&
sed -i 's/\"edition\": \(.*\), \"date_published\": /\"date_published\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    publisher, if before dimensions...' &&
sed -i 's/\"publisher\": \(.*\), \"dimensions\": /\"dimensions\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    ...or before title_long...' &&
sed -i 's/\"publisher\": \(.*\), \"title_long\": /\"title_long\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    dimensions, if before date_published...' &&
sed -i 's/\"dimensions\": \(.*\), \"date_published\": /\"date_published\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    ...or before title_long...' &&
sed -i 's/\"dimensions\": \(.*\), \"title_long\": /\"title_long\": /g' swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '    title_long, if before date_published...' &&
sed -i 's/\"title_long\": \(.*\), \"date_published\": /\"date_published\": /g' swap2 &&

cp swap2 fallback5 &&
du -h --block-size=M fallback5 | tr '\n' '    ' && echo '...' &&

du -h --block-size=M swap2 | tr '\n' '    ' && echo '  add comma at end of each line and remove the last one in the document...' && 
sed -i 's/$/,/' swap2 &&
sed -i '$ s/.$//' swap2 &&

du -h --block-size=M swap2 | tr '\n' '    ' && echo '  add brackets at beginning and end of file...' &&
echo ']' >> swap2 &&
du -h --block-size=M swap2 | tr '\n' '    ' && echo '  ...end done, now beginning...' &&
sed -i '1 i\ [' swap2 &&

du -h --block-size=M swap2 | tr '\n' '    ' &&        echo '  more sani date_published...' &&
grep -v '"date_published":.*......}' swap2 > swap1 && echo '.*.....}' | tr '\n' ' ' &&
grep -v '"date_published": .*?' swap1 > swap2 &&      echo '.*?' | tr '\n' ' ' &&
grep -v '"date_published": .*|' swap2 > swap1 &&      echo '.*|' | tr '\n' ' ' &&
grep -v '"date_published":.*-' swap1 > swap2 &&       echo '.*-' | tr '\n' ' ' &&
grep -v '"date_published": .*,.*},' swap2 > swap1 &&  echo '.*,.*}' | tr '\n' ' ' &&
grep -v '"date_published": [A-Za-z]' swap1 > swap2 && echo '[A-Za-z]' | tr '\n' ' ' &&
grep -v '"date_published":.}' swap2 > swap1 &&        echo '.}' | tr '\n' ' ' &&
grep -v '"date_published": .*|' swap1 > swap2 &&      echo '.*|' | tr '\n' ' ' &&
grep -v '"date_published":.*/' swap2 > swap1 &&       echo '.*/' &&

mv swap1 fallback6 &&
du -h --block-size=M fallback6 | tr '\n' '    ' &&  echo '...' &&

ls -1 -lh --block-size=M fallback6 | tr '\n' '    ' && echo 'JQ: pages > 149... ' &&
jq '.[] | select(.pages > 149) | {title:.title, authors:.authors, pages:.pages, date_published:.date_published, image:.image,language:.language}' fallback6 > fallback7 &&

cp fallback7 swap &&
formatJSON &&

du -h --block-size=M swap | tr '\n' '    ' && echo '  JQ: pages < 400... ' &&
jq '.[] | select(.pages < 400) | {title:.title, authors:.authors, pages:.pages, date_published:.date_published, image:.image,language:.language}'  swap > fallback8 &&

echo '          sanitize date_published...' &&
grep -v '"date_published":.*"' fallback8 > swap &&

formatJSON &&

du -h --block-size=M swap | tr '\n' '    ' && echo '  JQ: date_published  > 2020 (strings values not included)...' &&
jq '.[] | select(.date_published > 2020) | {title:.title, authors:.authors, pages:.pages, date_published:.date_published, image:.image,language:.language}' swap > fallback9 &&

cp fallback9 swap2 && 

echo '          sanitize date_published...' &&
grep -v '"date_published":.*"' swap2 > swap &&

# --- filter books written in English
formatJSON &&

du -h --block-size=M swap | tr '\n' '    ' && echo '  JQ: language  ==  en (null values not included)...' &&
jq '.[] | select(.language == "en") | {title:.title, authors:.authors, pages:.pages, date_published:.date_published, image:.image}' swap > fallback10 &&
# --- /filter books written in English

# --- filter titles
cp fallback10 swap &&
formatJSON &&

du -h --block-size=M swap && echo 'fallback....' &&
du -h --block-size=M swap | tr '\n' '    ' && echo '  JQ: filter titles' &&
	jq '.[] | select(.title | 
	contains("Portugues") == false 
	and contains ("portuguese") == false 
	and contains("Português") == false 
	and contains("Classics") == false 
	and contains("AI")==false
	and contains("German Edition")==false
	and contains("Korean Edition")==false
	and contains("Spanish Edition")==false
	and contains("Spanish edition")==false
	and contains("Turk")==false
	and contains("turk")==false
	and contains("Hombre")==false
	and contains("Corazon")==false
	and contains("Senor")==false
	and contains("remove")==false
	and contains("Último")==false
	and contains("fart")==false
	and contains("Fart")==false
	and contains("Abdul")==false
	and contains("Ozkan")==false
	and contains("Kazim")==false
	and contains("Demokrasi")==false
	and contains("Olgun")==false
	and contains("Muhammed")==false
	and contains("Arabi")==false
	and contains("Behruz")==false
	and contains("Hicbir")==false
	and contains("Kapitalist")==false
	and contains("Trabajo")==false
	and contains("Afganistan")==false
	and contains("Fasc")==false
	and contains("Rac")==false
	and contains("ism")==false
	and contains("Sister")==false
	) | {title:.title, authors:.authors, pages:.pages, date_published:.date_published, image:.image}' swap > fallback11 &&
du -h --block-size=M fallback11 && echo 'fallback11....' &&

cp fallback11 swap &&
# --- /filter titles

# --- filter empty images
formatJSON &&

jq '.[] | select(.image > null) | {title:.title, authors:.authors, pages:.pages, date_published:.date_published, image:.image}' swap > fallback12 &&
# --- /filter empty images

cp fallback12 swap && 
formatJSON &&
mv swap fallback12-formatted.json &&

cp fallback12-formatted.json final.json &&

du -h --block-size=M final.json | tr '\n' '    ' && echo '    done, total records:' | tr '\n' ' ' && cat final.json | jq -c '.[]' | wc -l && 

du -h --block-size=M final.json | tr '\n' '    ' && echo 'opruimen...' | tr '\n' ' ' &&

echo 'fallbackfixes' > swap1 > swap2 > s.jsonl > s2.jsonl > s3.jsonl > source.jsonl > final.jsonl &&
rm swap1 swap2 s.jsonl s2.jsonl s3.jsonl source.jsonl final.jsonl &&

cp final.json final-smaller.json &&
sed -i 's/": "/":"/g' final-smaller.json &&
sed -i 's/\.jpg//g' final-smaller.json &&
cp final-smaller.json books.json &&

cp final-smaller.json final-compressed.json &&
echo 'compressing column names...' && 
sed -i 's/"title"/"t"/g' final-compressed.json && 
sed -i 's/"pages"/"p"/g' final-compressed.json && 
sed -i 's/"authors"/"a"/g' final-compressed.json && 
sed -i 's/"date_published"/"d"/g' final-compressed.json && 
sed -i 's/"image"/"i"/g' final-compressed.json && 
sed -i 's/\.jpg//g' final-compressed.json && 

du -h --block-size=M final-compressed.json && 
echo 'compressing done'

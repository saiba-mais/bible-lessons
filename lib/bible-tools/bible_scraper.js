/*
 * Copyright (c) 2017 Adventech <info@adventech.io>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var async = require("async"),
    redis = require("redis"),
    cheerio = require("cheerio"),
    request = require("request"),
    fswf = require("safe-write-file"),
    helper = require("./bible_helpers"),
    fs = require("fs"),
    htmlEntities = require('html-entities').XmlEntities;

var cursorBook = 0,
    cursorChapter = 0,
    bibleInfo = "";

var write = function(chapterRaw){
    var $ = cheerio.load(chapterRaw, {decodeEntities: false});
    var chapter = {};

    var prevVerse;

    $(".text").each(function(i, e){
        var verse = $(e).find(".versenum").text();
        if ($(e).find(".chapternum").length){
            verse = "1";
        }

        if (isNaN(parseInt(verse))){
            verse = prevVerse;
            chapter[parseInt(verse)] += $(e).html();
        } else {
            chapter[parseInt(verse)] = $(e).html();
        }

        prevVerse = verse;
    });

    try {
        var bookInfo = require("./bibles/" + bibleInfo.lang + "/" + bibleInfo.version + "/books/" + cursorBook.toString().lpad(2) + ".js");
        bookInfo.chapters[cursorChapter] = chapter;
        fswf("./bibles/" + bibleInfo.lang + "/" + bibleInfo.version + "/books/" + cursorBook.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
    } catch (err){
        console.log(err)
    }
};

var scrapeBibleChapter = function(bookChapter, version, callback, scrapeOnly){
    var redis_client = redis.createClient();
    var url = "http://mobile.legacy.biblegateway.com/passage/?search=" + encodeURIComponent(bookChapter) + "&version=" + version;
    console.log("Fetching ", url);

    redis_client.get(url, function(err, reply) {
        if (!reply){
            request(
                {
                    "url": url,
                    "headers" : {
                        "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
                    }
                },
                function(err, response, body) {
                    if (err) {console.log(err);return;}

                    var output = "";
                    var $ = cheerio.load(body, {decodeEntities: false});

                    $(".publisher-info-bottom").remove();
                    $(".passage-display-version").remove();

                    $(".passage-wrap > .passage-content").find(".passage-display, p").each(function(i, e){
                        $(e).find(".footnote, .footnotes").remove();
                        $(e).removeAttr("class");
                        $(e).removeAttr("id");
                        $(e).find("p, span, div, sup").removeAttr("id");
                        output += $("<div></div>").html($(e).clone()).html();
                        output = output.replace("h1>", "h3>");
                    });

                    redis_client.set(url, output);
                    redis_client.quit();

                    if (!scrapeOnly){
                        write(output);
                    }
                    setTimeout(function(){callback(null, 'test')}, 800);

                }
            );
        } else {
            redis_client.quit();
            if (!scrapeOnly){
                write(reply);
            }
            callback(null, 'test');
        }
    });
};

var scrapeBible = function(lang, version){
    var tasks = [];
    try {
        bibleInfo = require("./bibles/" + lang + "/" + version + "/info.js");

        for (var i = 1; i <= bibleInfo.books.length; i++){
            cursorBook = i;
            if (i!==5)continue;
            var bookInfo = {
                name: bibleInfo.books[i-1].name,
                numChapters: bibleInfo.books[i-1].numChapters,
                chapters: {}
            };
            fswf("./bibles/" + lang + "/" + version + "/books/" + cursorBook.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");

            for (var j = 1; j <= bibleInfo.books[i-1].numChapters; j++){
                cursorChapter = j;
                var bookName = bibleInfo.books[i-1].name + " " + cursorChapter;

                tasks.push((function(bookName,j,i){
                    return function(callback){
                        cursorBook = i;
                        cursorChapter = j;
                        scrapeBibleChapter(bookName, version, callback, false);
                    }
                })(bookName,j,i));
            }
        }
    } catch (err){
        console.log(err)
    }
    async.series(tasks);
};

/**
 * Scrapes Bible info and writes it as an info file
 * @param lang
 * @param version
 * @param name
 */
var scrapeBibleInfo = function(lang, version, name){
    var url = "https://www.biblegateway.com/versions/"+name;
    request(
        {
            "url": url,
            "headers" : {
                "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
            }
        },
        function(err, response, body) {
            if (err) {console.log(err);}

            var $ = cheerio.load(body);

            var info = {
                lang: lang,
                version: version,
                books: []
            };

            $(".infotable tr").each(function(i, e){
                var numChapters = $(e).find(".num-chapters").text();
                $(e).find(".num-chapters").remove();
                var bookName = $(e).find(".book-name").text();
                info.books.push({"name": bookName, "numChapters": parseInt(numChapters), "synonyms": [bookName]});
            });

            fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(info, null, '\t') + ";\nmodule.exports = info;");
        }
    );
};

/**
 * Creates Bible structure from offline version of Bible from wordproject
 * @param lang
 * @param version
 * @param pathPrefix
 */
function parseOfflineBible(lang, version, pathPrefix){
    var bibleInfo = {
        lang: lang,
        version: version,
        books: []
    };
    for (var i = 1; i <= 66; i++){
        var bookCursor = i.toString().lpad(2),
            bookIndex = fs.readFileSync(pathPrefix+bookCursor+"/1.htm", "utf-8"),
            $ = cheerio.load(bookIndex, {decodeEntities: false}),
            bookName = $(".textHeader h2").text().customTrim("\n\r\t ").replace(/ 1$/, ""),
            numChapters = $("p.ym-noprint").children("A, span").length;

        var bookInfo = {
            name: bookName,
            numChapters: numChapters,
            chapters: {}
        };

        if (numChapters == 0) {
            console.log("0 num chapters, book = ", bookCursor);
        }


        for (var j = 1; j <= numChapters; j++){
            var chapterContent = fs.readFileSync(pathPrefix+bookCursor+"/" + j + ".htm", "utf-8"),
                $$ = cheerio.load(chapterContent, {decodeEntities: false}),
                chapter = {};

            var buffer = "",
                cur_verse = 0;

            var sel = ".textBody p";

            if (!$$(sel).length){
              sel = ".textBody";
            }

            $$(sel).children().each(function(index, element){
                if ($$(element).hasClass("verse")) {
                    if (cur_verse > 0){
                        chapter[cur_verse.toString()] = "<span>"+cur_verse.toString()+"</span> " + buffer.customTrim(" ");
                    }
                    buffer = "";
                    cur_verse = cur_verse+1;
                } else {
                    buffer += $$(element).text().customTrim("\n\r\t ") + " ";
                }

                if ($$(element)[0].nextSibling && $$(element)[0].nextSibling.nodeValue){
                    buffer += $$(element)[0].nextSibling.nodeValue.customTrim("\n\r\t ");
                }
            });

            if (cur_verse==1){
              cur_verse = 0;

              console.log("0 verses in chapter", j, " of book = ", bookCursor);

              var new_el = "<div><span class='verse'>"+cur_verse.toString()+" </span> " + buffer.customTrim(" ").replace(/(\d)/g, "<span class='verse'>$1</span>")+"</div>";

              buffer = "";
              $$(new_el).children().each(function(index, element) {
                if ($$(element).hasClass("verse")) {
                  if (cur_verse > 0){
                    chapter[cur_verse.toString()] = "<span>"+cur_verse.toString()+"</span> " + buffer.customTrim(" ");
                  }
                  buffer = "";
                  cur_verse = cur_verse+1;
                } else {
                  buffer += $$(element).text().customTrim("\n\r\t ") + " ";
                }

                if ($$(element)[0].nextSibling && $$(element)[0].nextSibling.nodeValue){
                  buffer += $$(element)[0].nextSibling.nodeValue.customTrim("\n\r\t ");
                }
              });
            }

            chapter[(cur_verse).toString()] = "<span>"+cur_verse.toString()+"</span> " + buffer.customTrim(" ");

            bookInfo.chapters[j.toString()] = chapter;
        }
        fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
        bibleInfo.books.push({"name": bookName, "numChapters": parseInt(numChapters), "synonyms": [bookName]});
    }
    fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}

/**
 * Quickly add synonyms given the array of them which is exact size as the length of books in target Bible
 * @param lang
 * @param version
 * @param synonyms
 */
function addSynonyms(lang, version, synonyms){
    var bibleInfo = require("./bibles/" + lang + "/" + version + "/info.js");
    if (bibleInfo.books.length === synonyms.length){
        for (var i = 0; i < bibleInfo.books.length; i++){
            bibleInfo.books[i].synonyms.push(synonyms[i]);
        }
    }
    fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}


/**
 *
 */
function reformatBibleJson(lang, version, path){
    var bibleJSON = require(path);
    var bookNames = [
          {
            "book_id": 1,
            "name": "1. Мојсеева"
          },
          {
            "book_id": 2,
            "name": "2. Мојсеева"
          },
          {
            "book_id": 3,
            "name": "3. Мојсеева"
          },
          {
            "book_id": 4,
            "name": "4. Мојсеева"
          },
          {
            "book_id": 5,
            "name": "5. Мојсеева"
          },
          {
            "book_id": 6,
            "name": "Исус Навин"
          },
          {
            "book_id": 7,
            "name": "Судии"
          },
          {
            "book_id": 8,
            "name": "Рута"
          },
          {
            "book_id": 9,
            "name": "1. Самоилова"
          },
          {
            "book_id": 10,
            "name": "2. Самоилова"
          },
          {
            "book_id": 11,
            "name": "1. Царевите"
          },
          {
            "book_id": 12,
            "name": "2. Царевите"
          },
          {
            "book_id": 13,
            "name": "1. Летописи"
          },
          {
            "book_id": 14,
            "name": "2. Летописи"
          },
          {
            "book_id": 15,
            "name": "Ездра"
          },
          {
            "book_id": 16,
            "name": "Неемија"
          },
          {
            "book_id": 17,
            "name": "Естира"
          },
          {
            "book_id": 18,
            "name": "За Јов"
          },
          {
            "book_id": 19,
            "name": "Псалми"
          },
          {
            "book_id": 20,
            "name": "Мудри изреки"
          },
          {
            "book_id": 21,
            "name": "Проповедник"
          },
          {
            "book_id": 22,
            "name": "Песна над песните"
          },
          {
            "book_id": 23,
            "name": "Исаија"
          },
          {
            "book_id": 24,
            "name": "Еремија"
          },
          {
            "book_id": 25,
            "name": "Плачот на Еремија"
          },
          {
            "book_id": 26,
            "name": "Езекиел"
          },
          {
            "book_id": 27,
            "name": "Даниел"
          },
          {
            "book_id": 28,
            "name": "Осија"
          },
          {
            "book_id": 29,
            "name": "Јоил"
          },
          {
            "book_id": 30,
            "name": "Амос"
          },
          {
            "book_id": 31,
            "name": "Авдија"
          },
          {
            "book_id": 32,
            "name": "Јона"
          },
          {
            "book_id": 33,
            "name": "Михеј"
          },
          {
            "book_id": 34,
            "name": "Наум"
          },
          {
            "book_id": 35,
            "name": "Авакум"
          },
          {
            "book_id": 36,
            "name": "Софонија"
          },
          {
            "book_id": 37,
            "name": "Агеј"
          },
          {
            "book_id": 38,
            "name": "Захарија"
          },
          {
            "book_id": 39,
            "name": "Малахија"
          },
          {
            "book_id": 40,
            "name": "Матеј"
          },
          {
            "book_id": 41,
            "name": "Марко"
          },
          {
            "book_id": 42,
            "name": "Лука"
          },
          {
            "book_id": 43,
            "name": "Јован"
          },
          {
            "book_id": 44,
            "name": "Дела апостолски"
          },
          {
            "book_id": 45,
            "name": "Јаков"
          },
          {
            "book_id": 46,
            "name": "1. Петрово"
          },
          {
            "book_id": 47,
            "name": "2. Петрово"
          },
          {
            "book_id": 48,
            "name": "1. Јованово"
          },
          {
            "book_id": 49,
            "name": "2. Јованово"
          },
          {
            "book_id": 50,
            "name": "3. Јованово"
          },
          {
            "book_id": 51,
            "name": "Јуда"
          },
          {
            "book_id": 52,
            "name": "Римјаните"
          },
          {
            "book_id": 53,
            "name": "1. Коринќаните"
          },
          {
            "book_id": 54,
            "name": "2. Коринќаните"
          },
          {
            "book_id": 55,
            "name": "Галатите"
          },
          {
            "book_id": 56,
            "name": "Ефесјаните"
          },
          {
            "book_id": 57,
            "name": "Филипјаните"
          },
          {
            "book_id": 58,
            "name": "Колошаните"
          },
          {
            "book_id": 59,
            "name": "1. Солуњаните"
          },
          {
            "book_id": 60,
            "name": "2. Солуњаните"
          },
          {
            "book_id": 61,
            "name": "1. Тимотеј"
          },
          {
            "book_id": 62,
            "name": "2. Тимотеј"
          },
          {
            "book_id": 63,
            "name": "Тит"
          },
          {
            "book_id": 64,
            "name": "Филимон"
          },
          {
            "book_id": 65,
            "name": "Евреите"
          },
          {
            "book_id": 66,
            "name": "Откровение"
          }
        ];

    var getBookInfo = function(){
        return {
            "name": "",
            "numChapters": 0,
            "chapters": {}
        }
    };

    var bookCursor = 0,
        bookInfo = getBookInfo(),
        chapterCursor = 0,
        chapterInfo = {};

    for(var i = 0; i < bibleJSON.data.length; i++){



        if (bookCursor !== bibleJSON.data[i].book_id){
            if (bookCursor){
                fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
            }

            bookInfo = getBookInfo();
            bookCursor = bibleJSON.data[i].book_id;
            chapterCursor = -1;

            var _bibleInfo = require("./bibles/"+lang+"/"+version+"/info");
            _bibleInfo.books.push(
              {
                "name": bookNames[bookCursor-1].name,
                "numChapters": 0,
                "synonyms": []
              }
            );
            fswf("./bibles/"+lang+"/"+version+"/info.js", "var info = " + JSON.stringify(_bibleInfo, null, '\t') + ";\nmodule.exports = info;");
        }

        if (chapterCursor !== bibleJSON.data[i].chapter){
            chapterInfo = {};
            chapterCursor = bibleJSON.data[i].chapter;
            if (chapterCursor){
                bookInfo.chapters[chapterCursor] = chapterInfo;
                bookInfo.numChapters = chapterCursor;
                bookInfo.name = bookNames[bookCursor-1].name;

              var _bibleInfo = require("./bibles/"+lang+"/"+version+"/info");
              _bibleInfo.books[bookCursor-1].numChapters++;
              fswf("./bibles/"+lang+"/"+version+"/info.js", "var info = " + JSON.stringify(_bibleInfo, null, '\t') + ";\nmodule.exports = info;");
            }


        }



        chapterInfo[bibleJSON.data[i].verse] = "<sup>"+bibleJSON.data[i].verse+"</sup> " + bibleJSON.data[i].text;
    }
    bookInfo.chapters[chapterCursor] = chapterInfo;
    bookInfo.numChapters = chapterCursor;
    bookInfo.name = bookNames[bookCursor-1].name;
    fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
}

function reformatBibleJsonTwo(lang, version, bookNamesPath, bookVersesPath){
    var bookNamesJSON = require(bookNamesPath),
        bibleJSON = require(bookVersesPath);

    var getBookInfo = function(){
        return {
            "name": "",
            "numChapters": 0,
            "chapters": {}
        }
    };

    var bookCursor = 0,
        bookName = "",
        bookInfo = getBookInfo(),
        chapterCursor = 0,
        chapterInfo = {},
        verseBaseLen = 0;

    for(var i = 0; i < bibleJSON.length; i++){

        if (bookName !== bibleJSON[i].book){
            if (bookCursor > 0){
                console.log(bookCursor)
                fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
            }

            bookInfo = getBookInfo();
            bookCursor++;
            bookName = bibleJSON[i].book;
            chapterCursor = -1;
        }

        var tempChapter = parseInt(bibleJSON[i].verse.substr(0, bibleJSON[i].verse.indexOf(".")));


        if (chapterCursor !== tempChapter){
            verseBaseLen = bibleJSON[i].verse.substr(bibleJSON[i].verse.indexOf(".")+1).length;
            chapterInfo = {};
            chapterCursor = tempChapter;
            if (chapterCursor){
                bookInfo.chapters[chapterCursor] = chapterInfo;
                bookInfo.numChapters = chapterCursor;
                bookInfo.name = bookNamesJSON[bookCursor-1].human;
            }
        }

        var tempVerse = bibleJSON[i].verse.substr(bibleJSON[i].verse.indexOf(".")+1);

        if (verseBaseLen - tempVerse.length) {
            tempVerse += new Array(verseBaseLen - tempVerse.length + 1).join("0");
        }

        tempVerse = parseInt(tempVerse)

        chapterInfo[tempVerse] = "<sup>"+tempVerse+"</sup> " + bibleJSON[i].unformatted;
    }
    bookInfo.chapters[chapterCursor] = chapterInfo;
    bookInfo.numChapters = chapterCursor;
    bookInfo.name = bookNamesJSON[bookCursor-1].human;

    fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");

    var bibleInfo = {
        "lang": lang,
        "version": version,
        "books": []
    };

    for (var i = 0; i < bookNamesJSON.length; i++){
        bibleInfo.books.push({
            "name": bookNamesJSON[i].human,
            "numChapters": parseInt(bookNamesJSON[i].chapters),
            "synonyms": [
                bookNamesJSON[i].osis
            ]
        });
    }
    fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}

function createBibleInfoForSerbian(){
    var ruBibleInfo = require("./bibles/ru/rusv/info");
    var bibleInfo = require("./bibles/hu/mb1975/info");

    for (var i = 0; i < ruBibleInfo.books.length; i++){
        var osisName = ruBibleInfo.books[i].synonyms[ruBibleInfo.books[i].synonyms.length-1];
        bibleInfo.books[i].synonyms = [osisName];
        console.log(bibleInfo.books[i].name);
    }

    fswf("./bibles/hu/mb1975/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}

// createBibleInfoForSerbian()

function scrapeBeblia(lang, version){
  var tasks = [],
      chapterTasks = [];

  for (var i = 0; i < 66; i++){
    tasks.push((function(bookId){
      return function(callback){
        request(
          {
            "url": "http://www.beblia.com/pages/main.aspx?Language=Hungarian&Book="+bookId+"&Chapter=1",
            "headers" : {
              "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
            }
          },
          function(err, response, body) {
            if (err) {console.log(err);return;}

            var output = "";
            var $ = cheerio.load(body, {decodeEntities: false});

            setTimeout(function(){callback(null, {
              "id": bookId,
              "title": $(".dropDownListBooks").find(":selected").text(),
              "chapters": $(".dropDownListBookChapters").children().length
            })}, 800);
          }
        );
      }
    })(i+1));
  }

  async.series(tasks, function(err, results){
    var bibleInfo = {
      lang: lang,
      version: version,
      books: []
    };
    for(var i = 0; i < results.length; i++){
      var bookInfo = {
        name: htmlEntities.decode(results[i].title),
        numChapters: results[i].chapters,
        chapters: {}
      };
      fswf("./bibles/"+lang+"/"+version+"/books/" + (i+1).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
      bookInfo.synonyms = [];
      delete bookInfo.chapters;
      bibleInfo.books.push(bookInfo);

      for(var j = 0; j < results[i].chapters; j++){
        chapterTasks.push((function(lang, version, bookId, bookTitle, chapterIterator){
          return function(callback){
            var redis_client = redis.createClient();
            var url = "http://www.beblia.com/pages/main.aspx?Language=Hungarian&Book="+bookId+"&Chapter="+chapterIterator;

            var writer = function(chapterRaw){
              var chapter = {};
              var $ = cheerio.load(chapterRaw, {decodeEntities: false});

              var verseIterator = 0;

              $(".verseTextText").each(function(i, e){
                var verse = $($(".verseTextButton")[verseIterator]).text();

                chapter[parseInt(verse)] = "<span>"+verse+"</span> " + $(e).html();
                verseIterator++;
              });

              try {
                var bookInfo = require("./bibles/"+lang+"/"+version+"/books/" + bookId.toString().lpad(2) + ".js");
                bookInfo.chapters[chapterIterator] = chapter;
                fswf("./bibles/"+lang+"/"+version+"/books/" + bookId.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
              } catch (err){
                console.log(err);
              }
            };

            redis_client.get(url, function(err, reply) {
              if (!reply){
                request(
                  {
                    "url": url,
                    "headers" : {
                      "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
                    }
                  },
                  function(err, response, body) {
                    if (err) {console.log(err);return;}

                    redis_client.set(url, body);
                    redis_client.quit();

                    writer(body);

                    setTimeout(function(){callback(null, 'test')}, 800);
                  }
                );
              } else {
                redis_client.quit();
                writer(reply);
                callback(null, 'test');
              }
            });
          }
        })(lang, version, results[i].id, results[i].title, j+1));
      }
    }

    fswf("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(bibleInfo, null, '\t')+";\nmodule.exports = info;");
    async.series(chapterTasks);
  });
}

// scrapeBeblia("hu", "mb1975");

// scrapeBibleInfo("en", "nasb", "New-American-Standard-Bible-NASB");
// scrapeBibleInfo("pt", "arc", "Almeida-Revista-e-Corrigida-2009-ARC");
// scrapeBibleInfo("uk", "ukr", "Ukrainian-Bible-UKR");
// scrapeBibleInfo("fr", "lsg", "Louis-Segond-LSG");
// scrapeBibleInfo("bg", "bg1940", "1940-Bulgarian-Bible-BG1940");
// scrapeBibleInfo("es", "rvr1960", "Reina-Valera-1960-RVR1960-Biblia");
// scrapeBibleInfo("ja", "jlb", "Japanese-Living-Bible-JLB");
// scrapeBibleInfo("ro", "rmnn", "Cornilescu-1924-RMNN-Bible");
// scrapeBibleInfo("pt", "nvi-pt", encodeURIComponent("Nova-Versão-Internacional-NVI-PT-Bíblia"))
// scrapeBibleInfo("de", "luth1545", "Luther-Bibel-1545-LUTH1545")
// scrapeBibleInfo("zh", "cuvs", "Chinese-Union-Version-Simplified-CUVS");
// scrapeBibleInfo("da", "dn1933", encodeURIComponent("Dette-er-Biblen-på-dansk-1933"));
// scrapeBibleInfo("da", "bph", encodeURIComponent("Bibelen-på-hverdagsdansk-BPH"));

// scrapeBible("en", "nkjv");
// scrapeBible("ja", "jlb");
// scrapeBible("pt", "arc");
// scrapeBible("fr", "lsg");
// scrapeBible("bg", "bg1940");
// scrapeBible("es", "rvr1960");
// scrapeBible("ro", "rmnn");
// scrapeBible("uk", "ukr");
// scrapeBible("pt", "nvi-pt");
// scrapeBible("de", "luth1545");
// scrapeBible("zh", "cuvs");
// scrapeBible("da", "dn1933");
// scrapeBible("da", "bph");

// parseOfflineBible("fj", "fov", "/Users/vitaliy/Downloads/fiji/fj/");
//
// function fixNamesCZ(){
//     var bibleInfo = require("./bibles/zh/ctv/info");
//
//     for (var i = 0; i < bibleInfo.books.length; i++){
//         var bookId = i+1;
//
//         var bookInfo = require("./bibles/zh/ctv/books/"+bookId.toString().lpad(2));
//         bookInfo.name = bibleInfo.books[i].name;
//         fswf("./bibles/zh/ctv/books/"+bookId.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
//     }
// }
//
// fixNamesCZ()

// createBibleInfoForSerbian()
// reformatBibleJson("mk", "MKB", "/Users/vitaliy/Sites/Adventech/bible-tools/mk_bible.json");
// reformatBibleJsonTwo("ne", "ERV", "/Users/vitaliy/Sites/Adventech/bible-tools/books.json", "/Users/vitaliy/Sites/Adventech/bible-tools/ervne.json")

var createBTIBible = function(){
  var books = require("/Users/vitaliy/Downloads/bti/books.json"),
      verses = require("/Users/vitaliy/Downloads/bti/verses.json"),
      bookIterator = 0,
      bookContent = {},
      lastBookNumber = "",
    lastBookInfo = {},
      bookInfo = {};

  var getBookByID = function(id){
    for (var i = 0; i < books.length; i++){
      if (books[i].book_number===id){
        return books[i];
      }
    }
    return null;
  };

  var write = function(){
    if (bookIterator>0){
      var book = {
        "name": lastBookInfo.long_name,
        "numChapters": Object.keys(bookContent).length,
        "chapters": bookContent
      };

      fswf("./bibles/ru/bti/books/"+bookIterator.toString().lpad(2) + ".js", "var book = "+JSON.stringify(book, null, '\t')+";\nmodule.exports = book;");
    }
  };

  for(var i = 0; i < verses.length; i++){
    bookInfo = getBookByID(verses[i].book_number);

    if (bookInfo){
      if (bookInfo.book_number!==lastBookNumber){

        write();

        bookContent = {};
        bookIterator++;
        lastBookNumber = bookInfo.book_number;
        lastBookInfo = bookInfo;
      }

      if(!bookContent.hasOwnProperty(verses[i].chapter)){
        bookContent[verses[i].chapter] = {};
      }

      var verse = verses[i].text;

      verse = verse.replace(/<pb\/> ?/g, "");
      verse = verse.replace(/<f>.*<\/f>/g, "");
      verse = verse.replace(/<t>/g, "<div>");
      verse = verse.replace(/<\/t>/g, "<\/div>");
      verse = verse.replace(/<e>/g, "<em>");
      verse = verse.replace(/<\/e>/g, "<\/em>");

      bookContent[verses[i].chapter][verses[i].verse] = "<sup>"+verses[i].verse+"</sup> "+verse;
    } else {
      console.log("Warning, null returned from getBookById, ", verses[i].book_number);
    }
  }
  write();
};

// createBTIBible();

// reformatBibleJsonTwo("ta", "ervta", "/Users/vitaliy/Downloads/books.json", "/Users/vitaliy/Downloads/verses.json");
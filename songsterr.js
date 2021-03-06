var request = require('request')
var cheerio = require('cheerio')
var debug = require('debug')('songsterr')

module.exports.getTabByUrl = function (url, callback) {
  debug('Getting tab by url:', url, ', retrieving revision id...')

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // find regex in ...&revision=260350&demoSong...
      var revisionId = /\d+(?=&demoSong)/i.exec(html)

      if (revisionId && revisionId[0]) {
        debug('Successfully retrieved revision id:', revisionId[0])
        module.exports.getTabByRevisionId(revisionId[0], callback)
      } else {
        callback({status:'error', error:error, message:'No match for revision id in page source. exiting now'})
      }
    } else if(!response || response.statusCode == 404) {
      callback({status:'not found', error:error, message: "This tab does not exist"})
    } else {
      callback({status:'error', error:error, message:'Error on retrieving revisionId'})
    }
  })
}

module.exports.getTabByRevisionId = function (revisionId, callback) {
  var revisionUrl = 'http://www.songsterr.com/a/ra/player/songrevision/' + revisionId + '.xml'

  debug('retrieving tab info from url', revisionUrl)

  request(revisionUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html)

      var gp5Url = $('guitarProTab > attachmentUrl').html()
      var artistName = $('artist > name').html()
      var artistId = $('artist').attr('id')
      var title = $('title').html()
      var songRevisionId = $('SongRevision').attr("id")
      var songId = $('song').attr('id')
      var tabId = $('tab').attr('id')

      debug('gp5Url', gp5Url)

      callback(null, {
        title: title,
        artist: {
          id: artistId,
          name: artistName
        },
        gp5: gp5Url,
        songId: songId,
        tabId: tabId,
        revisionId: songRevisionId
      })

    } else {
      callback({status:'error', error:error, message:'Error on tab details'})
    }
  })
}

module.exports.isSongsterrTab = function (url, callback) {
  var validFormat = /http:\/\/www.songsterr.com\/a\/wsa\/.+s\d+t\d+/i.test(url)
  callback(null, validFormat);
}

module.exports.getLatestSongId = function(callback) {
  var newestUrl = "http://www.songsterr.com/a/wa/all?inst=any&sort=d"

  debug('retrieving latest song id from url')

  request(newestUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html)

      var links = $('.tab-link');

      if(!links || links.length == 0) {
        callback({status:'error', error:error, message:'Error on getting latest tab id'})
        return;
      }

      var latestSongId = -1;

      links.each(function(i, elem){
        var href = $(this).attr('href');
        var id = /\d+(?=t\d$)/i.exec(href)
        if(id && parseInt(id)){
          latestSongId = parseInt(id) > latestSongId ? parseInt(id) : latestSongId;
        }
      })

      if(latestSongId == -1) {
        callback({status:'error', error:error, message:'Error on latest tab id'})
      } else {
        callback(null, latestSongId)
      }


    } else {
      callback({status:'error', error:error, message:'Error on latest tab id'})
      return -1;
    }
  });
}

module.exports.getTabBySongId = function(id, callback) {
  var redirectUrl = "http://www.songsterr.com/a/wa/song?id="+id;
  //TODO
  request(redirectUrl, function (error, response, html) {
    if(!response || !response.request || !response.request.uri) {
      callback({status:'error', error:error, message:'Could not get redirect. Wrong id?'})
    }
    var redirect = response.request.uri.href;
    if(redirect){
      module.exports.getTabByUrl(redirect, callback);
    }else{
      callback({status:'error', error:error, message:'Could not get redirect. Wrong id?'})
    }
  });

}

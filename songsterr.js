var request = require('request')
var cheerio = require('cheerio')
var debug = require('debug')('songsterr')

module.exports.getTabByUrl = function (url, callback) {
  debug('Getting tab by url:', url, ', retrieving revision id...')

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // find regex in ...&revision=260350&demoSong...
      var revisionId = /\d+(?=&demoSong)/i.exec(html)

      if (revisionId[0]) {
        debug('Successfully retrieved revision id:', revisionId[0])
        module.exports.getTabByRevisionId(revisionId[0], callback)
      } else {
        callback('No match for revision id in page source. exiting now')
      }
    } else {
      callback(error ? error : 'Error on retrieving revisionId')
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
      callback(error ? error : 'Error on getting tab details')
    }
  })
}

module.exports.isSongsterrTab = function (url) {
  return /http:\/\/www.songsterr.com\/a\/wsa\/.+s\d+t\d+/i.test(url)
}

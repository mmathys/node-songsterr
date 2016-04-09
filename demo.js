var songsterr = require('./songsterr')

/*
var test = songsterr.getTabByUrl("http://www.songsterr.com/a/wsa/pachelbel-canon-in-c-tab-s90818t0", function(err, tab) {
  console.log(tab);
})
*/

/* Works
songsterr.getTabBySongId(90811, function(err, res){
  console.log(err);

  console.log(res);

});

*/

/* doesn't work */
songsterr.getTabBySongId(90812, function(err, res){
  console.log(err);

  console.log(res);

});

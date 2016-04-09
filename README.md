# node-songsterr
Unofficial extended Songsterr Client for Node.js

This package provides simplified access to public tab data of [Songsterr](//www.songsterr.com).

## Documentation

*Get tab info by url* responds with tabInfo

```javascript
getTabByUrl: function (url, callback)
```

*Get tab info by revision id* responds with tabInfo

```javascript
getTabByRevisionId: function (url, callback)
```

*Get Latest Song Id* responds with Integer

```javascript
getLatestSongId: function (callback)
```

*`callback` format*

```javascript
function (error, response)
```

*sample `tabInfo`* as `response` in callback

```js
{ title: 'Canon In C',
  artist: { id: '12024', name: 'Pachelbel' },
  gp5: 'http://d12drcwhcokzqv.cloudfront.net/18018423.gp5',
  songId: '90818',
  tabId: '163940',
  revisionId: '264243' }
```

*Check if url is valid songsterr tab*

```javascript
isSongsterrTab: function (url, callback)
```

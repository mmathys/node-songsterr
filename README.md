# node-songsterr
Unofficial extended Songsterr Client for Node.js

[![NPM](https://nodei.co/npm/songsterr.png)](https://nodei.co/npm/songsterr/)

This package provides simplified access to public tab data of [Songsterr](//www.songsterr.com).

## Documentation

*Get tab info by url* responds with tabInfo

```javascript
getTabByUrl: function (url, callback)
```

*Get tab info by song id* responds with tabInfo

```javascript
getTabBySongId: function (url, callback)
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

*Check if url is valid songsterr tab*. Only check if the url has the correct
format, not if the tab actually exists.

```javascript
isSongsterrTab: function (url, callback)
```

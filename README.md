# node-songsterr
Unofficial extended Songsterr Client for Node.js

This package provides simplified access to public tab data of [Songsterr](//www.songsterr.com).

## Documentation

*Get tab info by url*

```javascript
getTabByUrl: function (url, callback)
```

*Get tab info by revision id*

```javascript
getTabByRevisionId: function (url, callback)
```

*`callback` format*

```javascript
function (error, tabInfo)
```

*sample `tabInfo`*

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
isSongsterrTab: function (url)
```

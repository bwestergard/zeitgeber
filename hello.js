var osc = require('osc')
var R = require('ramda')

console.log('starting')

// Create an osc.js UDP Port listening on port 57121.
var udpPort = new osc.UDPPort({
  localAddress: '0.0.0.0',
  localPort: 57121
})

// Listen for incoming OSC bundles.
udpPort.on('bundle', function (oscBundle, timeTag, info) {
  console.log('An OSC bundle just arrived for time tag', timeTag, ':', oscBundle)
  console.log('Remote info is: ', info)
})

// Open the socket.
udpPort.open()

var pingBundle = function (pingPairs) {
  return R.map(
    function (pingPair) {
        return {
          address: '/s_new',
          args: [ 'ping', -1, 0, 1, 'freq', pingPair[0], 'duration', pingPair[1] ]
        }
    },
    pingPairs
  )
}

var klang = function (n) {
  udpPort.send(
    {
      timeTag: osc.timeTag(n),
      packets: pingBundle([
        [440 * 1 / 4, 8],
        [440 * 2 / 4, 6],
        [440 * 3 / 8, 4]
      ])
    },
    '127.0.0.1',
    57110
  )
}

klang(0)
klang(1)
klang(4)

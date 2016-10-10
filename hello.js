var osc = require('osc')
var R = require('ramda')
var midiutils = require('midiutils')

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

var ping = function (note, duration) {
  return {
    address: '/s_new',
    args: [ 'ping', -1, 0, 1, 'freq', midiutils.noteNumberToFrequency(note), 'duration', duration ]
  }
}

var pingBundle = function (pingPairs) {
  return R.map(
    function (pingPair) {
      return ping(pingPair[0], pingPair[1])
    },
    pingPairs
  )
}

var root = 50

var klang = function (n) {
  udpPort.send(
    {
      timeTag: osc.timeTag(n),
      packets: pingBundle([
        [root + 0, 16],
        [root + 4, 8],
        [root + 7, 4],
        [root + 9, 16]
      ])
    },
    '127.0.0.1',
    57110
  )
}

klang(0)
klang(1)
klang(4)

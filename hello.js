var osc = require('osc')

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

// Send an OSC message to, say, SuperCollider
udpPort.send({
  address: '/s_new',
  args: [ 'ping', -1, 0, 1, 'freq', 80, 'duration', 8 ]
}, '127.0.0.1', 57110)

udpPort.send({
  address: '/s_new',
  args: [ 'ping', -1, 0, 1, 'freq', 80 * (3 / 2), 'duration', 2 ]
}, '127.0.0.1', 57110)

udpPort.send({
  address: '/s_new',
  args: [ 'ping', -1, 0, 1, 'freq', 80 * (6 / 2) * 2, 'duration', 2 ]
}, '127.0.0.1', 57110)

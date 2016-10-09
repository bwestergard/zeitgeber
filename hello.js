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
  args: ['default', 200]
}, '127.0.0.1', 57110)

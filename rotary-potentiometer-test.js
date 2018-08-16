var five = require("johnny-five");
const raspi = require('raspi-io'); 
// Make a new `Board()` instance and use raspi-io 
const board = new five.Board({ 
       io: new raspi(), 
});

//var board = new five.Board();

board.on("ready", function() {

  var sensor = new five.Sensor.Digital(5);

  sensor.on("change", function() {
    console.log(this.value);
  });
});

var five = require("johnny-five");
const raspi = require('raspi-io'); 
// Make a new `Board()` instance and use raspi-io 
const board = new five.Board({ 
       io: new raspi(), 
});

//var board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  var button = new five.Button(7);

  button.on("hold", function() {
    console.log( "Button held" );
  });

  button.on("press", function() {
    console.log( "Button pressed" );
  });

  button.on("release", function() {
    console.log( "Button released" );
  });
});

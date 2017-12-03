// Test file for using the Raspberry Pi and Johnny-Five 
const five = require('johnny-five'); 
const raspi = require('raspi-io'); 
// Make a new `Board()` instance and use raspi-io 
const board = new five.Board({ 
       io: new raspi(), 
});

// Run Board 
board.on('ready', function() { 
       // LED Pin variable 
       const led = new five.Led('P1-15'); 
       const led2 = new five.Led('P1-16');
       const led3 = new five.Led('P1-13');
       led.on(); 
       led2.on();
       led3.on();
       this.repl.inject({ 
               on: () => { 
                       led.on(); 
                       led2.on();
                       led3.on();
               }, 
               off: () => { 
                       led.stop().off(); 
                       led2.stop().off();
                       led3.stop().off();
               }, 
               strobe: () => { 
                       led.stop().off(); 
                       led.strobe(); 
                       led2.stop().off();
                       led2.strobe();
                       led3.stop().off();
                       led3.strobe();
               }, 
               blink: () => { 
                       led.stop().off(); 
                       led.blink(500); 
                       led2.stop().off(); 
                       led2.blink(500);
                       led3.stop().off(); 
                       led3.blink(500);
               }, 
       }); 
       // When this script is stopped, turn the LED off 
       // This is just for convenience 
       this.on('exit', function() { 
               led.stop().off(); 
               led2.stop().off();
               led3.stop().off();
       }); 
}); 

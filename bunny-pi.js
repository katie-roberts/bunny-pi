
const five = require("johnny-five"),
	raspi = require("raspi-io");

const board = new five.Board({
       io: new raspi()
});

board.on("ready", function() {
  var leftEar;
  var rightEar;

  const led = new five.Led('P1-15');
  const led2 = new five.Led('P1-16');
  const led3 = new five.Led('P1-13');
  led.on();
  led2.on();
  led3.on();

	leftEar = new five.Motor({
	pins: {
		pwm: 7,
		dir: 6,
		cdir: 5
	},
	address: 0x60,
	controller: 'PCA9685'

	});
	rightEar = new five.Motor({
	pins: {
		pwm: 13,
		dir: 12,
		cdir: 11
	},
	address: 0x60,
	controller: 'PCA9685'
	});

	board.repl.inject({
		leftEar: leftEar,
		rightEar: rightEar
	});

	leftEar.on("stop", function() {
   		 console.log("automated stop on timer", Date.now());
  	});

  	leftEar.on("forward", function() {
    		console.log("forward", Date.now());

    // enable the motor after 2 seconds
    board.wait(2000, function() {
      leftEar.enable();
    });
  });

  leftEar.on("enable", function() {
    console.log("motor enabled", Date.now());

    // enable the motor after 2 seconds
    board.wait(2000, function() {
      leftEar.stop();
    });
  });

  leftEar.on("disable", function() {
    console.log("motor disabled", Date.now());
  });


  rightEar.on("stop", function() {
    console.log("automated stop on timer", Date.now());
  });

  rightEar.on("forward", function() {
    console.log("forward", Date.now());

    // enable the motor after 2 seconds
    board.wait(2000, function() {
      rightEar.enable();
    });
  });

  rightEar.on("enable", function() {
    console.log("motor enabled", Date.now());

    // enable the motor after 2 seconds
    board.wait(2000, function() {
      rightEar.stop();
    });
  });

  rightEar.on("disable", function() {
    console.log("motor disabled", Date.now());
  });

  // disable the motor
  leftEar.disable();
  rightEar.disable();

  // set the motor going forward full speed (nothing happen)
//  leftEar.forward(255);
//  rightEar.forward(255);

  this.repl.inject({
    buildStart: () => {
        leftEar.forward(255);
        rightEar.forward(245);
        led.stop().off();
        led2.stop().off();
        led3.stop().off();
    },
    buildComplete: () => {
      leftEar.stop();
      rightEar.stop();
      led.stop().on();
      led2.stop().on();
      led3.stop().on();
    },
    buildFail: () => {
      leftEar.reverse(154);
      rightEar.forward(101);
      led.stop().off();
      led.blink(500);
      led2.stop().off();
      led2.blink(500);
      led3.stop().off();
      led3.blink(500);
    }
  })


   this.on('exit', function() {
      leftEar.stop();
      rightEar.stop();
   });
});

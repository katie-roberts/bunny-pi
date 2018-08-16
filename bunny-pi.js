
const five = require("johnny-five"),
	raspi = require("raspi-io");

const board = new five.Board({
       io: new raspi()
});

board.on("ready", function() {
  var leftEar;
  var rightEar;
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
  leftEar.forward(255);
  rightEar.forward(255);
});

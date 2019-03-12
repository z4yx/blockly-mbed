/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview mbed code generator for the Servo library blocks.
 *     The mbed Servo library docs: http://mbed.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.mbed.servo');

goog.require('Blockly.mbed');


/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * mbed code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoPulseWidth = Blockly.mbed.valueToCode(
      block, 'SERVO_PULSEWIDTH', Blockly.mbed.ORDER_ATOMIC) || '1';      
  var servoName = 'myServo' + pinKey;
 var timeDomain = block.getFieldValue('TimeDomain');
  Blockly.mbed.reservePin(
      block, pinKey, Blockly.mbed.PinTypes.SERVO, 'Servo Write');

  //Blockly.mbed.addInclude('servo', '#include <Servo.h>');
  Blockly.mbed.addDeclaration('servo_' + pinKey, 'PwmOut '+servoName+'(' + pinKey + ');');

  //var setupCode = servoName + '.attach(' + pinKey + ');';
  //Blockly.mbed.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.period_ms(20);\n';
  
  code = code+servoName + '.pulsewidth_'+timeDomain+'(' + servoPulseWidth + ');\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo PWM pin (X).
 * mbed code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.read();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['servo_read'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoName = 'myServo' + pinKey;

  Blockly.mbed.reservePin(
      block, pinKey, Blockly.mbed.PinTypes.SERVO, 'Servo Read');

  Blockly.mbed.addInclude('servo', '#include <Servo.h>');
  Blockly.mbed.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.mbed.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.read()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

Blockly.mbed['stepper_setup'] = function(block) {
  var stepPin = block.getFieldValue('STEP_Pin');
  var dirPin = block.getFieldValue('DIR_Pin');
  var enPin = block.getFieldValue('EN_Pin');
  
  Blockly.mbed.reservePin(
    block, stepPin, Blockly.mbed.PinTypes.STEPPER, 'Stepper STEP');
  Blockly.mbed.reservePin(
      block, dirPin, Blockly.mbed.PinTypes.STEPPER, 'Stepper DIR');
  Blockly.mbed.reservePin(
      block, enPin, Blockly.mbed.PinTypes.STEPPER, 'Stepper EN');

  Blockly.mbed.addInclude('Stepper', '#include <stepper.h>');
  Blockly.mbed.addDeclaration('stepper' + stepPin, 'Stepper stepper' + stepPin + ' = {' + stepPin + ',' + dirPin + ',' + enPin + '};');

  return '';
};

Blockly.mbed['stepper_rotate'] = function(block) {
  var stepPin = block.getFieldValue('STEP_Pin');
  var period = Blockly.mbed.valueToCode(
      block, 'PERIOD', Blockly.mbed.ORDER_ATOMIC) || '1';
  var steps = Blockly.mbed.valueToCode(
      block, 'STEP', Blockly.mbed.ORDER_ATOMIC) || '1';
  var unitPeriod = block.getFieldValue('UNIT_PERIOD') === 'us' ? '_us' : '';
  var code = 'stepper' + stepPin;
  code = code + '.rotate'+unitPeriod+'(' + period + ', ' + steps + ');\n';
  return code;
};

Blockly.mbed['stepper_wait'] = function(block) {
  var stepPin = block.getFieldValue('STEP_Pin');
  var code = 'while(stepper' + stepPin + '.remain);\n';
  return code;
};
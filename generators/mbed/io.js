/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for mbed Digital and Analogue input/output.
 *     mbed built in function docs: http://mbed.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.mbed.IO');

goog.require('Blockly.mbed');


/**
 * Function for 'set pin' (X) to a state (Y).
 * mbed code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['io_digitalwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var stateOutput = Blockly.mbed.valueToCode(
      block, 'STATE', Blockly.mbed.ORDER_ATOMIC) || 'LOW';

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.OUTPUT, 'Digital Write');

  var digitalOut_Name = 'myDigitalOut'+ pin;
  Blockly.mbed.addDeclaration(digitalOut_Name , 'DigitalOut '+digitalOut_Name+'(' + pin + ');');
  
  var code = digitalOut_Name+'.write(' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading a digital pin (X).
 * mbed code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['io_digitalread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Digital Read');

  var digitalIn_Name = 'myDigitalIn'+ pin;
  Blockly.mbed.addDeclaration(digitalIn_Name , 'DigitalIn '+digitalIn_Name+'(' + pin + ');');

  var code = digitalIn_Name+'.read()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};
Blockly.mbed['io_interrupt'] = function(block) {
  var intrName = 'intr' + block.getFieldValue('Pin');
  var intrType = block.getFieldValue('Type');
  var branch = Blockly.mbed.statementToCode(block, 'function_body');
  
  if (Blockly.mbed.STATEMENT_PREFIX) {
    branch = Blockly.mbed.prefixLines(
        Blockly.mbed.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.mbed.INDENT) + branch;
  }
  if (Blockly.mbed.INFINITE_LOOP_TRAP) {
    branch = Blockly.mbed.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.mbed.valueToCode(block, 'RETURN',
      Blockly.mbed.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }

  // Get arguments with type
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] =
        Blockly.mbed.getmbedType_(block.getArgType(block.arguments_[x])) +
        ' ' +
        Blockly.mbed.getVariableName(block, block.arguments_[x],
            Blockly.Variables.NAME_TYPE);
  }

  // Get return type
  var returnType = Blockly.Types.NULL;
  if (block.getReturnType) {
    returnType = block.getReturnType();
  }
  returnType = Blockly.mbed.getmbedType_(returnType);

  // Construct code
  var functionName=intrName+'_interrupt_fun';
  var code = returnType + ' ' + functionName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  // code = Blockly.mbed.scrub_(block, code);
  Blockly.mbed.userFunctions_[functionName] = code;  
  
  // TODO: Assemble mbed into code variable.
  
  var attach_code = intrName + '.'+intrType+'(&' + functionName+');\n';  
  return attach_code;
};


/**
 * Function for setting the state (Y) of a built-in LED (X).
 * mbed code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['io_builtin_led'] = function(block) {
  var pin = block.getFieldValue('BUILT_IN_LED');
  var stateOutput = Blockly.mbed.valueToCode(
      block, 'STATE', Blockly.mbed.ORDER_ATOMIC) || 'LOW';

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.OUTPUT, 'Set LED');

  var digitalOut_Name = 'myDigitalOut'+ pin;
  Blockly.mbed.addDeclaration(digitalOut_Name , 'DigitalOut '+digitalOut_Name+'(' + pin + ');');
  
  var code = digitalOut_Name+'.write(' + stateOutput + ');\n';
  return code;
};

Blockly.mbed['io_pwm_set'] = function(block) {
  var pinKey = block.getFieldValue('PWM_PIN');
  var pwmPeriod = Blockly.mbed.valueToCode(
      block, 'PWM_PERIOD', Blockly.mbed.ORDER_ATOMIC) || '1';
  var pwmPulseWidth = Blockly.mbed.valueToCode(
      block, 'PWM_WIDTH', Blockly.mbed.ORDER_ATOMIC) || '1';
  var pwmName = 'myPwm' + pinKey;
  var unitPeriod = block.getFieldValue('UNIT_PERIOD');
  var unitPulseWidth = block.getFieldValue('UNIT_WIDTH');
  Blockly.mbed.reservePin(
      block, pinKey, Blockly.mbed.PinTypes.PWM, 'PWM Write');

  //Blockly.mbed.addInclude('pwm', '#include <Servo.h>');
  Blockly.mbed.addDeclaration('pwm_' + pinKey, 'PwmOut '+pwmName+'(' + pinKey + ');');

  //var setupCode = pwmName + '.attach(' + pinKey + ');';
  //Blockly.mbed.addSetup('pwm_' + pinKey, setupCode, true);

  var code = '';
  code = code+pwmName + '.period_'+unitPeriod+'(' + pwmPeriod + ');\n';
  code = code+pwmName + '.pulsewidth_'+unitPulseWidth+'(' + pwmPulseWidth + ');\n';
  return code;
};


/**
 * Function for reading an analogue pin value (X).
 * mbed code: setup { pinMode(X, INPUT); }
 *            loop  { analogRead(X)      }
 *  modified on 2018/4/25
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['io_analogread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Analogue Read');
  var ioName = 'myIO' + pin;

  Blockly.mbed.addDeclaration('io_' + pin, 'AnalogIn ' + ioName + '(' + pin + ');');

  var code = ioName + '.read()';  
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Value for defining a digital pin state.
 * mbed code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['io_highlow'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

Blockly.mbed['io_pulsein'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.mbed.valueToCode(block, "PULSETYPE", Blockly.mbed.ORDER_ATOMIC);

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.mbed.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ')';

  return [code, Blockly.mbed.ORDER_ATOMIC];
};

Blockly.mbed['io_pulsetimeout'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.mbed.valueToCode(block, "PULSETYPE", Blockly.mbed.ORDER_ATOMIC);
  var timeout = Blockly.mbed.valueToCode(block, "TIMEOUT", Blockly.mbed.ORDER_ATOMIC);

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.mbed.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ', ' + timeout + ')';

  return [code, Blockly.mbed.ORDER_ATOMIC];
}; 

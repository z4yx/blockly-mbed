/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview mbed code generator for the Time blocks.
 *     mbed built-in function docs: http://mbed.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.mbed.time');

goog.require('Blockly.mbed');


/**
 * Code generator for the delay mbed block.
 * mbed code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.mbed['time_delay'] = function(block) {
  var delayTime = Blockly.mbed.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.mbed.ORDER_ATOMIC) || '0';
  var code = 'wait(' + delayTime/1000.0 + ');\n';
  return code;
};

/**
 * Code generator for the delayMicroseconds block.
 * mbed code: loop { delayMicroseconds(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.mbed['time_delaymicros'] = function(block) {
  var delayTimeMs = Blockly.mbed.valueToCode(
      block, 'DELAY_TIME_MICRO', Blockly.mbed.ORDER_ATOMIC) || '0';
  var code = 'delayMicroseconds(' + delayTimeMs + ');\n';
  return code;
};

/**
 * Code generator for the elapsed time in milliseconds block.
 * mbed code: loop { millis() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.mbed['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for the elapsed time in microseconds block.
 * mbed code: loop { micros() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.mbed['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for the wait forever (end of program) block
 * mbed code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.mbed['infinite_loop'] = function(block) {
  return 'while(true);\n';
};

Blockly.mbed['ticker_attach'] = function(block) {
  var ticks = block.getFieldValue('ticks');
  var tickName = 'tick' + String(Math.random()).substring(2,8);
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
  var functionName=tickName+'_handle';
  var code = returnType + ' ' + functionName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  // code = Blockly.mbed.scrub_(block, code);
  Blockly.mbed.userFunctions_[functionName] = code;  
  
  Blockly.mbed.addDeclaration(tickName , 'Ticker '+tickName+';');
  
  var attach_code = tickName + '.attach'+'(&' + functionName+',' + ticks +');\n';  
  return attach_code;
};
/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating mbed code for variables blocks.
 */
'use strict';

goog.provide('Blockly.mbed.variables');

goog.require('Blockly.mbed');


Blockly.mbed['variables_declare_array'] =
Blockly.mbed['variables_declare'] = function(block) {
  return '';
};

/**
 * Code generator for variable (X) getter.
 * mbed code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['variables_get'] = function(block) {
  var code = Blockly.mbed.getVariableName(block, block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for variable (X) setter (Y).
 * mbed code: type X;
 *               loop { X = Y; }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['variables_set'] = function(block) {
  var argument0 = Blockly.mbed.valueToCode(block, 'VALUE',
      Blockly.mbed.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.mbed.getVariableName(block, 
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/**
 * Code generator for variable (X) casting (Y).
 * mbed code: loop { (Y)X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['variables_set_type'] = function(block) {
  var varName = Blockly.mbed.getVariableName(block, 
      block.getFieldValue('VARNAME'), Blockly.Variables.NAME_TYPE);
  var varType = Blockly.mbed.getVariableType(block, 
      block.getFieldValue('VARNAME'));
  var targetType = Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')];
  // console.log(varName, varType, targetType);

  if (targetType.typeId == varType.typeId) // No casting
    return [varName, Blockly.mbed.ORDER_ATOMIC];

  var code = '(' + Blockly.mbed.getmbedType_(targetType) + ')(' + varName + ')';
  if (targetType.typeId == Blockly.Types.TEXT.typeId) {
    code = 'std::to_string(' + varName + ')';
  } else if (varType.typeId == Blockly.Types.TEXT.typeId) {
    switch (targetType.typeId) {
      case Blockly.Types.SHORT_NUMBER.typeId:
      case Blockly.Types.NUMBER.typeId:
        code = 'std::stoi(' + varName + ')';
        break;
      case Blockly.Types.LARGE_NUMBER.typeId:
        code = 'std::stol(' + varName + ')';
        break;
      case Blockly.Types.DECIMAL.typeId:
        code = 'std::stof(' + varName + ')';
        break;
      }
  }
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the mbed parser blocks.
 */

'use strict';

goog.provide('Blockly.mbed.parser');
goog.require('Blockly.mbed');
goog.require('Blockly.Types');


Blockly.mbed['gcode_parse'] = function (block) {
    var line = Blockly.mbed.valueToCode(block, 'GCODE', Blockly.mbed.ORDER_NONE) || '""';
    return 'GCode_DoNext(' + line + ');\n';
};

Blockly.mbed['gcode_init'] = function (block) {
    return 'GCode_Init();\n';
};

Blockly.mbed['gcode_cb_home'] =
Blockly.mbed['gcode_cb_absmove'] =
Blockly.mbed['gcode_cb_setpos'] = function (block) {
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
        var name = Blockly.mbed.variableDB_.getName(block.arguments_[x],
            Blockly.Variables.NAME_TYPE);
        args[x] = Blockly.mbed.getmbedType_(block.argumentsType_[x]);
        if (block.argumentsType_[x].typeId === Blockly.Types.ARRAY.typeId)
            args[x] = args[x].replace(/\[/, name + '[');
        else
            args[x] += ' ' + name;
    }

    // Get return type
    var returnType = Blockly.Types.NULL;
    if (block.getReturnType) {
        returnType = block.getReturnType();
    }
    returnType = Blockly.mbed.getmbedType_(returnType);

    // Construct code
    var functionName = block.callbackName_;
    var code = returnType + ' ' + functionName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}';
    // code = Blockly.mbed.scrub_(block, code);
    Blockly.mbed.userFunctions_[functionName] = code;

    // TODO: Assemble mbed into code variable.

    return '';
};
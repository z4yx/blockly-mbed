/**
 * @license 
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @fileoverview Blocks for the mbed text parser functions.
 * Last modified on 2/03/2019 
 */

'use strict';

goog.provide('Blockly.Blocks.parser');
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.parser.HUE = 0;
Blockly.Blocks.parser.TypeIntArray4 = new Blockly.Type({
    typeId: 'Array',
    typeMsgName: 'MBED_TYPE_ARRAY',
    compatibleTypes: [],
    typeAtom: Blockly.Types.NUMBER,
    typeLength: 4,
    typeContent: ''
});

Blockly.Blocks.gcode_cb_home = {

    init: function() {
        this.appendDummyInput()
            .appendField('G-Code "Home" command callback');
        this.appendDummyInput()
            .appendField('Args: ')
            .appendField(new Blockly.FieldLabel('int selected_axes'));
        this.appendStatementInput("function_body")
            .setCheck(null);
        this.setInputsInline(false);
        this.setColour(Blockly.Blocks.parser.HUE);
        this.setTooltip("declare a function to handle G-Code command");
        this.arguments_ = ['selected_axes'];
        this.argumentsType_ = [Blockly.Types.NUMBER];
        this.callbackName_ = 'Move_Home';
    }
};

Blockly.Blocks.gcode_cb_absmove = {

    init: function() {
        this.appendDummyInput()
            .appendField('G-Code "Absolute Move" command callback');
        this.appendDummyInput()
            .appendField('Args: ')
            .appendField(new Blockly.FieldLabel('int xyza[4]'))
            .appendField(new Blockly.FieldLabel('int feedrate'));
        this.appendStatementInput("function_body")
            .setCheck(null);
        this.setInputsInline(false);
        this.setColour(Blockly.Blocks.parser.HUE);
        this.setTooltip("declare a function to handle G-Code command");
        this.arguments_ = ['xyza', 'feedrate'];
        this.argumentsType_ = [Blockly.Blocks.parser.TypeIntArray4, Blockly.Types.NUMBER];
        this.callbackName_ = 'Move_AbsoluteMove';
    }
};

Blockly.Blocks.gcode_cb_setpos = {

    init: function() {
        this.appendDummyInput()
            .appendField('G-Code "Set Position" command callback');
        this.appendDummyInput()
            .appendField('Args: ')
            .appendField(new Blockly.FieldLabel('int xyza[4]'));
        this.appendStatementInput("function_body")
            .setCheck(null);
        this.setInputsInline(false);
        this.setColour(Blockly.Blocks.parser.HUE);
        this.setTooltip("declare a function to handle G-Code command");
        this.arguments_ = ['xyza'];
        this.argumentsType_ = [Blockly.Blocks.parser.TypeIntArray4];
        this.callbackName_ = 'Move_SetCurrentPos';
    }
};

Blockly.Blocks.gcode_init = {
    init: function() {
        this.setColour(Blockly.Blocks.parser.HUE);
        this.appendDummyInput()
            .appendField("Initialize G-Code parser");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
};
Blockly.Blocks.gcode_parse = {
    init: function() {
        this.setColour(Blockly.Blocks.parser.HUE);
        this.appendValueInput('GCODE')
            .setCheck("String")
            .appendField("Parse G-Code line");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
};
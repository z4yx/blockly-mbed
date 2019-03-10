/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the mbed map functionality.
 *     The mbed built in functions syntax can be found at:
 *     http://mbed.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.variables.HUE = 330;

Blockly.Blocks['variables_declare'] = {
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField("Declare")
        .appendField(new Blockly.FieldVariable('item'), 'VARNAME')
        .appendField("as")
        .appendField(new Blockly.FieldDropdown(
                         Blockly.Types.getValidTypeArray()),
                     'VARIABLE_SETTYPE_TYPE');
    this.setInputsInline(true);
  },
  getVars: function () {
      return [this.getFieldValue('VARNAME')];
  },
  getVarType: function (varName) {
      return Blockly.Types[this.getFieldValue('VARIABLE_SETTYPE_TYPE')];
  },
};

Blockly.Blocks['variables_declare_array'] = {
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField("Declare")
        .appendField(new Blockly.FieldVariable('item'), 'VARNAME')
        .appendField("as a list of")
        .appendField(new Blockly.FieldNumber(10,1), 'LEN')
        .appendField(new Blockly.FieldDropdown(
                         Blockly.Types.getValidTypeArray()),
                     'VARIABLE_SETTYPE_TYPE');
    this.setInputsInline(true);
  },
  getVars: function () {
      return [this.getFieldValue('VARNAME')];
  },
  getVarType: function (varName) {
      return new Blockly.Type({
        typeId: 'Array',
        typeMsgName: 'MBED_TYPE_ARRAY',
        compatibleTypes: [],
        typeAtom: Blockly.Types[this.getFieldValue('VARIABLE_SETTYPE_TYPE')],
        typeLength: this.getFieldValue('LEN'),
        typeContent: ''
      });
  },
};

Blockly.Blocks['variables_set_type'] = {
  /**
   * Block for variable casting.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Reference/HomePage');
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField("Cast");
    this.appendValueInput('VARIABLE_SETTYPE_INPUT');
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_VAR_AS)
        .appendField(new Blockly.FieldDropdown(
                         Blockly.Types.getValidTypeArray()),
                     'VARIABLE_SETTYPE_TYPE');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.MBED_VAR_AS_TIP);
  },
  /**
   * Assigns a type to the block based on the selected type to cast.
   * @return {!string} Blockly type for this block configuration.
   * @this Blockly.Block
   */
  getBlockType: function() {
    var blocklyTypeKey = this.getFieldValue('VARIABLE_SETTYPE_TYPE');
    return Blockly.Types[blocklyTypeKey];
  }
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for mbed Tone generation
 *     The mbed function syntax can be found at
 *     https://www.mbed.cc/en/Reference/tone
 *
 */
'use strict';

goog.provide('Blockly.Blocks.tone');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.tone.HUE = 250;

Blockly.Blocks['io_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_SETTONE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.digitalPins), "TONEPIN");
    this.appendValueInput("FREQUENCY")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.MBED_TONEFREQ);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.MBED_TONE_TIP);
    this.setHelpUrl('https://www.mbed.cc/en/Reference/tone');
  },
  onchange: function() {
    var freq = Blockly.mbed.valueToCode(this, "FREQUENCY", Blockly.mbed.ORDER_ATOMIC)
    if (freq < 31 || freq > 65535) {
      this.setWarningText(Blockly.Msg.MBED_TONE_WARNING, 'io_tone');
    } else {
      this.setWarningText(null, 'io_tone');
    }
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_notone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_NOTONE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.digitalPins), "TONEPIN");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.MBED_NOTONE_TIP);
    this.setHelpUrl('https://www.mbed.cc/en/Reference/noTone');
  },
    /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

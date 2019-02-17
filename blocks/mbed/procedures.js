/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the mbed functions.
 *     The mbed built in functions syntax can be found at:
 *     https://mbed.cc/en/Reference/HomePage
 */
'use strict';

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.procedures.HUE = 290;

Blockly.Blocks['mbed_functions'] = {
  /**
   * Block for defining the mbed setup() and loop() functions.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_FUN_RUN_SETUP);
    this.appendStatementInput('SETUP_FUNC');
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_FUN_RUN_LOOP);
    this.appendStatementInput('LOOP_FUNC');
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.procedures.HUE);
    this.setTooltip(Blockly.Msg.MBED_FUN_RUN_TIP);
    this.setHelpUrl('https://mbed.cc/en/Reference/Loop');
    this.contextMenu = false;
  },
  /** @return {!boolean} True if the block instance is in the workspace. */
  getmbedLoopsInstance: function() {
    return true;
  }
};

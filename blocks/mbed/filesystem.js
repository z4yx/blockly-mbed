/**
 * @license 
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @fileoverview Blocks for the mbed filesystem functions.
 * Last modified on 2/03/2019 
 */

'use strict';

goog.provide('Blockly.Blocks.filesystem');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.filesystem.HUE = 20;

Blockly.Blocks.sd_fs = {
    init: function(){
        this.setColour(Blockly.Blocks.filesystem.HUE);
        // mosi, miso, sclk, cs, name
        this.appendDummyInput()
            .appendField("SD Card: MOSI")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'MOSI')
            .appendField("MISO")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'MISO')
            .appendField("SCK")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'SCK')
            .appendField("CS")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'CS');
        this.setInputsInline(true);
        /*  previous statement can not be revised to true, otherwise this block-svg is not top-level block and
            it is very hard to detect whether the i2c is initialized or not
        */
        this.setPreviousStatement(false, null);
        this.setNextStatement(true, null);
    },
};

Blockly.Blocks.fs_fopen = {
    init: function() {
        this.setColour(Blockly.Blocks.filesystem.HUE);
        this.appendValueInput('PATH')
            .setCheck("String")
            .appendField("Open file")
            .appendField(new Blockly.FieldVariable('fp'), 'FILE')
            .appendField("at");
        this.appendDummyInput()
            .appendField("for")
            .appendField(
                new Blockly.FieldDropdown([['writing','w'], ['reading', 'r']]), 'MODE');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
};

Blockly.Blocks.fs_fprintf = {
    init: function() {
        this.setColour(Blockly.Blocks.filesystem.HUE);
        this.appendDummyInput()
            .appendField("Write file")
            .appendField(new Blockly.FieldVariable('fp'), 'FILE');
        this.appendValueInput('CONTENT')
            .setCheck('String')  
            .appendField("with format text");
        this.appendValueInput('CONTENT_STR')
            .setCheck(null)
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
            .appendField(Blockly.Msg.MBED_SERIAL_PRINT_NEWLINE);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MBED_SERIAL_PRINT_TIP);    
    },
};

Blockly.Blocks.fs_fscanf = {
    init: function() {
        this.setColour(Blockly.Blocks.filesystem.HUE);
        this.appendDummyInput()
            .appendField("Read file")
            .appendField(new Blockly.FieldVariable('fp'), 'FILE');
        this.appendValueInput('CONTENT')
            .setCheck('String')  
            .appendField("with format text");
        this.appendValueInput('CONTENT_STR')
            .setCheck(null)
            .appendField('into variables');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
};

Blockly.Blocks.fs_fclose = {
    init: function() {
        this.setColour(Blockly.Blocks.filesystem.HUE);
        this.appendDummyInput()
            .appendField("Close file")
            .appendField(new Blockly.FieldVariable('fp'), 'FILE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
};
/**
 * @license 
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @fileoverview mbed blocks for the Servo library.
 * Last modified on 2/03/2018 
 */
'use strict';

goog.provide('Blockly.Blocks.servo'); // "servo" not exist, initiate as {}

goog.require('Blockly.Blocks'); // not work in browser env
goog.require('Blockly.Types');




/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.servo.HUE = 60;

/**
 * @namespace Blockly.Blocks.servo_write
 */
Blockly.Blocks.servo_write ={};
/**
 * @namespace Blockly.Blocks.servo_read
 */
Blockly.Blocks.servo_read ={};

/**
 * Block for writing an angle value into a servo PWM pin.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.servo_write.init=function() {
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendValueInput('SERVO_PULSEWIDTH')
    .setCheck(Blockly.Types.NUMBER.checkList)
    .appendField(Blockly.Msg.MBED_SERVO_WRITE)
    .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.pwmPins), 'SERVO_PIN')
    .appendField('pulsewidth:');
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([['us','us'],['ms','ms']]), 'TimeDomain')    
    this.setInputsInline(true);                
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.MBED_SERVO_WRITE_TIP);
};

/**
 * Updates the content of the the pin related fields.
 * @memberof Blockly.Blocks
 * @this Blockly.Block
 */
Blockly.Blocks.servo_write.updateFields=function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
};

/**
 * Block for reading an angle value of a servo PWM pin.
 * @memberof Blockly.Blocks
 * @this Blockly.Block
 */
Blockly.Blocks.servo_read.init= function() {
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_SERVO_READ)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.pwmPins), 'SERVO_PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.MBED_SERVO_READ_TIP);
};

/** 
 * @return {string} The type of return value for the block, an integer. 
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.servo_read.getBlockType=function() {
    return Blockly.Types.NUMBER;
};

/**
 * Updates the content of the the pin related fields.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.servo_read.updateFields=function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
};

Blockly.Blocks.stepper_setup = {

    init: function () {
        this.setColour(Blockly.Blocks.servo.HUE);
        this.appendDummyInput()
            .appendField("Stepper Motor step:")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'STEP_Pin')
            .appendField("dir:")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'DIR_Pin')
            .appendField("en:")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'EN_Pin');
        this.setInputsInline(true);
        /*  previous statement can not be revised to true, otherwise this block-svg is not top-level block and
            it is very hard to detect whether the stepper is initialized or not
        */
        this.setPreviousStatement(false, null);
        this.setNextStatement(true, null);
    },
    getStepperSetupInstance: function () {
        return this.getFieldValue('STEP_Pin');
    },
    updateFields: function () {
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'STEP_Pin', 'digitalPins');
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'DIR_Pin', 'digitalPins');
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'EN_Pin', 'digitalPins');
    },
};

Blockly.Blocks.stepper_rotate = {
    init: function () {
        this.setColour(Blockly.Blocks.servo.HUE);
        this.appendValueInput('PERIOD')
          .setCheck(Blockly.Types.NUMBER.checkList)
          .appendField("Rotate stepper on")
          .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.pwmPins), 'STEP_Pin')
          .appendField('Period:');
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([['us','us'],['s','s']]), 'UNIT_PERIOD')    
          .appendField('Step:');
        this.appendValueInput('STEP')
          .setCheck(Blockly.Types.NUMBER.checkList);
        this.setInputsInline(true);                
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("Rotate a stepper motor.");
    },
    // updateFields: function () {
    //     Blockly.mbed.Boards.refreshBlockFieldDropdown(
    //         this, 'STEP_Pin', 'digitalPins');
    // },
    onchange: function () {
        if (!this.workspace) { return; }  // Block has been deleted.
    
        //Get the Stepper instance from this block
        var thisInstanceName = this.getFieldValue('STEP_Pin');
        var setupInstancePresent = false;
        //Iterate through top level blocks to find setup instance
        var blocks = Blockly.mainWorkspace.getTopBlocks();
        for (var x = 0; x < blocks.length; x++) {
            var func = blocks[x].getStepperSetupInstance;
            if (func) {
                var setupBlockInstanceName = func.call(blocks[x]);
                if (thisInstanceName == setupBlockInstanceName) {
                    setupInstancePresent = true;
                }
            }
        }
        if (!setupInstancePresent) {
            this.setWarningText(Blockly.Msg.MBED_SERIAL_PRINT_WARN.replace('%1',
                thisInstanceName), 'stepper_rotate');
        } else {
            this.setWarningText(null, 'stepper_rotate');
        }
    },
};

Blockly.Blocks.stepper_wait = {
    init: function () {
        this.setColour(Blockly.Blocks.servo.HUE);
        this.appendDummyInput()
          .appendField("Wait stepper on")
          .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.pwmPins), 'STEP_Pin');
        this.setInputsInline(true);                
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("Wait a stepper motor until it stops.");
    },
    onchange: function () {
        if (!this.workspace) { return; }  // Block has been deleted.
    
        //Get the Stepper instance from this block
        var thisInstanceName = this.getFieldValue('STEP_Pin');
        var setupInstancePresent = false;
        //Iterate through top level blocks to find setup instance
        var blocks = Blockly.mainWorkspace.getTopBlocks();
        for (var x = 0; x < blocks.length; x++) {
            var func = blocks[x].getStepperSetupInstance;
            if (func) {
                var setupBlockInstanceName = func.call(blocks[x]);
                if (thisInstanceName == setupBlockInstanceName) {
                    setupInstancePresent = true;
                }
            }
        }
        if (!setupInstancePresent) {
            this.setWarningText(Blockly.Msg.MBED_SERIAL_PRINT_WARN.replace('%1',
                thisInstanceName), 'stepper_rotate');
        } else {
            this.setWarningText(null, 'stepper_rotate');
        }
    },
};

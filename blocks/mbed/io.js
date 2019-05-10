/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for mbed Digital and Analogue input and output
 *     functions. The mbed function syntax can be found at
 *     http://mbed.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */
'use strict';

goog.provide('Blockly.Blocks.io');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.io.HUE = 250;

Blockly.Blocks['io_digitalwrite'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.MBED_DIGITALWRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.digitalPins), 'PIN')
        .appendField(Blockly.Msg.MBED_WRITE_TO)
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.MBED_DIGITALWRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_digitalread'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_DIGITALREAD)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.digitalPins), 'PIN');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.MBED_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_interrupt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'Pin')
        .appendField("attach")
        .appendField(new Blockly.FieldDropdown([["Fall", "fall"], ["Rise", "rise"]]), 'Type')
        .appendField("interrupt");
    this.appendDummyInput()
        .appendField("input pin")
        .appendField(new Blockly.FieldDropdown([["without pulls", "PullNone"], ["with pull down", "PullDown"], ["with pull up", "PullUp"]]), 'Pull');
    this.appendStatementInput("function_body")
        .setCheck(null);
    // this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip("attach an interrupt function to digital input");
    this.setHelpUrl("");
    this.arguments_ = [];
  }
};

Blockly.Blocks['set_interrupt_prio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set priority of")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.irqNumber), 'IRQ')
        .appendField("to")
        .appendField(new Blockly.FieldNumber(1,0,15), 'PRIO');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
  }
};

Blockly.Blocks['io_builtin_led'] = {
  /**
   * Block for setting built-in LED to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.MBED_BUILTIN_LED)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.builtinLed), 'BUILT_IN_LED')
        .appendField('to')
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.MBED_BUILTIN_LED_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'BUILT_IN_LED', 'builtinLed');
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
};

Blockly.Blocks.io_pwm_set = {
  init: function() {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('PWM_PERIOD')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("Set hardware PWM on")
      .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.pwmPins), 'PWM_PIN')
      .appendField('Period:');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['us','us'],['ms','ms']]), 'UNIT_PERIOD')    
      .appendField('Pulse width:');
    this.appendValueInput('PWM_WIDTH')
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['us','us'],['ms','ms']]), 'UNIT_WIDTH')    
    this.setInputsInline(true);                
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Set PWM output period and pulse width");
  },
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'PWM_PIN', 'pwmPins');
  }
};

Blockly.Blocks.io_soft_pwm_set = {
  init: function() {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('PWM_PERIOD')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("Set software PWM on")
      .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'PWM_PIN')
      .appendField('Period:');
    this.appendDummyInput()
      .appendField('us, Duty cycle:');
    this.appendValueInput('PWM_DUTY')
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);                
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Set PWM output period and duty cycle");
  },
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'PWM_PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_analogread'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_ANALOGREAD)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.analogPins), 'PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.MBED_ANALOGREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};

Blockly.Blocks['io_highlow'] = {
  /**
   * Block for creating a pin state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Reference/Constants');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown([[Blockly.Msg.MBED_HIGH, 'HIGH'], [Blockly.Msg.MBED_LOW, 'LOW']]),
           'STATE');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.MBED_HIGHLOW_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_pulsein'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_PULSEREAD);
    this.appendValueInput("PULSETYPE")
        .setCheck(Blockly.Types.BOOLEAN.check);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_PULSEON)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.digitalPins), "PULSEPIN");
    this.setOutput(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.MBED_PULSE_TIP);
    this.setHelpUrl('https://www.mbed.cc/en/Reference/PulseIn');
  },
      /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_pulsetimeout'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_PULSEREAD);
    this.appendValueInput("PULSETYPE")
        .setCheck(Blockly.Types.BOOLEAN.check);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_PULSEON)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.digitalPins), "PULSEPIN");
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_PULSETIMEOUT);
    this.appendValueInput('TIMEOUT')
        .setCheck(Blockly.Types.NUMBER.output);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_PULSETIMEOUT_MS);
    this.setOutput(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.MBED_PULSETIMEOUT_TIP);
    this.setHelpUrl('https://www.mbed.cc/en/Reference/PulseIn');
  },
        /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

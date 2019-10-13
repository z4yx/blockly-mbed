  /**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for mbed SPI library.
 *     The mbed SPI functions syntax can be found in:
 *     http://mbed.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.Blocks.spi');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.spi.HUE = 170;

Blockly.Blocks['spi_setup'] = {
  /**
   * Block for the spi configuration. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Reference/SPI');
    this.setColour(Blockly.Blocks.spi.HUE);
    var dropdown = new Blockly.FieldDropdown(
      Blockly.mbed.Boards.selected.spi, function(option) {
      var SPI1_CHOICE = (option == 'SPI1');
      this.sourceBlock_.updateShape_(SPI1_CHOICE);
    });     
    this.appendDummyInput("Select")
        .appendField(Blockly.Msg.MBED_SPI_SETUP)
        .appendField(dropdown, 'SPI_ID'); 
    this.appendDummyInput()
        .appendField("CS")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'PIN');        
    this.appendValueInput("frequency")
        .setCheck("Number")
        .appendField("Frequency(MHz)");
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_SPI_SETUP_MODE)
        .appendField(
            new Blockly.FieldDropdown(
                [[Blockly.Msg.MBED_SPI_SETUP_MODE0, '0'],
                 [Blockly.Msg.MBED_SPI_SETUP_MODE1, '1'],
                 [Blockly.Msg.MBED_SPI_SETUP_MODE2, '2'],
                 [Blockly.Msg.MBED_SPI_SETUP_MODE3, '3']]),
            'SPI_MODE');
    this.setInputsInline(false);    
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);    
    this.setTooltip(Blockly.Msg.MBED_SPI_SETUP_TIP);
  },
  /**
   * Returns the selected SPI instance.
   * @return {!string} SPI instance name.
   * @this Blockly.Block
   */
  getSpiSetupInstance: function() {
    return this.getFieldValue('SPI_ID');
  },
  /**
   * Updates the content of the the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SPI_ID', 'spi');
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SPI_CLOCK_DIVIDE', 'spiClockDivide');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var SPI_CHOISE = (this.getFieldValue('SPI_ID') == 'SPI1');
    container.setAttribute('SPI_CHOISE', SPI_CHOISE);
    return container;
  },  
  domToMutation: function(xmlElement) {
    var SPI_CHOISE = (xmlElement.getAttribute('SPI_CHOISE') == 'true');
    this.updateShape_(SPI_CHOISE);
  },  
  updateShape_: function(SPI_CHOISE) {
    // Add or remove a Dummy Input.
    var SelectInput = this.getInput("SPI1_CHOICE");
    if (SPI_CHOISE) {
      if (!SelectInput) {
          this.appendDummyInput("SPI1_CHOICE")
          .appendField("SPI1 ID")
          .appendField(new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.spi1_choice), 'SPI1_ID')
      }
    } else if (SelectInput) {
      this.removeInput("SPI1_CHOICE");  
    }
  },  
};

Blockly.Blocks['spi_transfer'] = {
  /**
   * Block for for the spi transfer. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    // Drop down list to contain all digital pins plus an option for 'none'
    var slaveNone = [[Blockly.Msg.MBED_SPI_TRANS_NONE, 'none']];
    var digitalPinsExtended = slaveNone.concat(
        Blockly.mbed.Boards.selected.digitalPins);

    this.setHelpUrl('http://mbed.cc/en/Reference/SPITransfer');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.spi), 'SPI_ID');
    this.appendValueInput('SPI_DATA')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.MBED_SPI_TRANS_VAL);
    // this.appendDummyInput()
        // .appendField(Blockly.Msg.MBED_SPI_TRANS_SLAVE)
        // .appendField(
            // new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
            //we only consider the microcontroller as master mode
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.MBED_SPI_TRANS_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SPI_ID');

    // Iterate through top level blocks to find a setup instance for the SPI id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0, length_ = blocks.length; x < length_; x++) {
      var func = blocks[x].getSpiSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(Blockly.Msg.MBED_SPI_TRANS_WARN1.replace('%1', thisInstanceName),
								  'spi_setup');
    } else {
      this.setWarningText(null, 'spi_setup');
    }
  },
  /**
   * Retrieves the type of the selected variable, mbed code returns a byte,
   * for now set it to integer.
   * @return {!string} Blockly type.
   */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    // Special case, otherwise Blockly.mbed.Boards.refreshBlockFieldDropdown
    var field = this.getField('SPI_SS');
    var fieldValue = field.getValue();
    var slaveNone = [[Blockly.Msg.MBED_SPI_TRANS_NONE, 'none']];
    field.menuGenerator_ =
        slaveNone.concat(Blockly.mbed.Boards.selected['digitalPins']);

    var currentValuePresent = false;
    for (var i = 0, length_ = field.menuGenerator_.length; i < length_; i++) {
      if (fieldValue == field.menuGenerator_[i][1]) {
        currentValuePresent = true;
      }
    }
    // If the old value is not present any more, add a warning to the block.
    if (!currentValuePresent) {
      this.setWarningText(Blockly.Msg.MBED_SPI_TRANS_WARN2.replace('%1', fieldValue),
			  'bPin');
    } else {
      this.setWarningText(null, 'bPin');
    }
  }
};

Blockly.Blocks['spi_transfer_return'] = {
  /**
   * Block for for the spi transfer with a return value.
   * @this Blockly.Block
   */
  init: function() {
    // Drop down list to contain all digital pins plus an option for 'none'
    var slaveNone = [[Blockly.Msg.MBED_SPI_TRANS_NONE, 'none']];
    var digitalPinsExtended = slaveNone.concat(
        Blockly.mbed.Boards.selected.digitalPins);

    this.setHelpUrl('http://mbed.cc/en/Reference/SPITransfer');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.spi), 'SPI_ID');
    this.appendValueInput('SPI_DATA')
        .appendField(Blockly.Msg.MBED_SPI_TRANS_VAL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MBED_SPI_TRANS_SLAVE)
        .appendField(
            new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.MBED_SPI_TRANSRETURN_TIP);
  },
  /** Same as spi_transfer block */
  onchange: Blockly.Blocks['spi_transfer'].onchange,
  /** Same as spi_transfer block */
  getBlockType: Blockly.Blocks['spi_transfer'].getBlockType,
  /** Same as spi_transfer block */
  updateFields: Blockly.Blocks['spi_transfer'].updateFields
};

Blockly.Blocks.nrf24_setup = {
  init: function(){
      this.setColour(Blockly.Blocks.spi.HUE);
      // mosi, miso, sck, csn, ce, irq
      this.appendDummyInput()
          .appendField("nRF24L01 Setup: MOSI")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'MOSI')
          .appendField("MISO")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'MISO');
      this.appendDummyInput()
          .appendField("SCK")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'SCK')
          .appendField("CSn")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'CS')
          .appendField("CE")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'CE')
          .appendField("IRQ")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'IRQ');
      this.appendDummyInput()
          .appendField("Message size")
          .appendField(new Blockly.FieldNumber(4, 1, 32), 'SIZE')
          .appendField("Channel Number")
          .appendField(new Blockly.FieldNumber(114514, 1, 4294967295), 'CH');

      this.setInputsInline(false);
      /*  previous statement can not be revised to true, otherwise this block-svg is not top-level block and
          it is very hard to detect whether the i2c is initialized or not
      */
      this.setPreviousStatement(false, null);
      this.setNextStatement(false, null);
  },
};

Blockly.Blocks.nrf24_readable = {
  init: function () {
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField("nRF24L01 on")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'MOSI')
        .appendField("is readable");
    this.setInputsInline(false);
  },
};

Blockly.Blocks.nrf24_read = {
  init: function () {
    this.setColour(Blockly.Blocks.spi.HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendField("nRF24L01 on")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'MOSI')
        .appendField("receive data")
        .appendField(new Blockly.FieldVariable('buf'), 'BUF');
  },
};

Blockly.Blocks.nrf24_write = {
  init: function () {
    this.setColour(Blockly.Blocks.spi.HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendField("nRF24L01 on")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'MOSI')
        .appendField("send data")
        .appendField(new Blockly.FieldVariable('buf'), 'BUF');
  },
};

Blockly.Blocks.w5500_setup = {
  init: function(){
      this.setColour(Blockly.Blocks.spi.HUE);
      this.appendDummyInput()
          .appendField("W5500 on: MOSI")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'MOSI')
          .appendField("MISO")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'MISO');
      this.appendDummyInput()
          .appendField("SCK")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'SCK')
          .appendField("CSn")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'CS')
          .appendField("RESET")
          .appendField(
              new Blockly.FieldDropdown(
                  Blockly.mbed.Boards.selected.digitalPins), 'RESET');
      this.appendDummyInput()
          .appendField("connects to")
          .appendField(
              new Blockly.FieldTextInput("192.168.12.1"), 'host')
          .appendField("with name")
          .appendField(
              new Blockly.FieldTextInput("node1"), 'node');
      this.appendDummyInput()
          .appendField("Auth(optional): user")
          .appendField(
              new Blockly.FieldTextInput(""), 'mqttUser')
          .appendField("password")
          .appendField(
              new Blockly.FieldTextInput(""), 'mqttPasswd');
      this.appendDummyInput()
          .appendField("Sensors: ")
          .appendField(
            new Blockly.FieldTextInput("light,switch"), 'sensors');
      this.appendDummyInput()
          .appendField("Actuators: ")
          .appendField(
            new Blockly.FieldTextInput("door,motor"), 'actuators');
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
  },
};

Blockly.Blocks.w5500_publish = {
  init: function(){
      this.setColour(Blockly.Blocks.spi.HUE);
      this.appendValueInput('topic')
          .setCheck("String")
          .appendField("W5500 publishes topic");
      this.appendValueInput('value')
          .setCheck("String")
          .appendField("with value");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
  },
};

Blockly.Blocks.w5500_yield = {
  init: function(){
      this.setColour(Blockly.Blocks.spi.HUE);
      this.appendDummyInput()
          .appendField("W5500 yield")
          .appendField(new Blockly.FieldNumber(200, 1, 1000000), 'timeout')
          .appendField("ms");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
  },
};

Blockly.Blocks.w5500_command = {
  init: function() {
      this.appendDummyInput()
          .appendField('W5500 on command received');
      this.appendDummyInput()
          .appendField('Args: ')
          .appendField(new Blockly.FieldLabel('string topic'))
          .appendField(new Blockly.FieldLabel('string value'));
      this.appendStatementInput("function_body")
          .setCheck(null);
      this.setInputsInline(false);
      this.setColour(Blockly.Blocks.spi.HUE);
      this.arguments_ = ['topic', 'value'];
      this.argumentsType_ = [Blockly.Types.TEXT, Blockly.Types.TEXT];
      this.callbackName_ = 'W5500_on_command';
  }
};

Blockly.Blocks.ld3320_setup = {
  init: function () {
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
      .appendField("LD3320 on: MOSI")
      .appendField(
        new Blockly.FieldDropdown(
          Blockly.mbed.Boards.selected.digitalPins), 'MOSI')
      .appendField("MISO")
      .appendField(
        new Blockly.FieldDropdown(
          Blockly.mbed.Boards.selected.digitalPins), 'MISO');
    this.appendDummyInput()
      .appendField("SCK")
      .appendField(
        new Blockly.FieldDropdown(
          Blockly.mbed.Boards.selected.digitalPins), 'SCK')
      .appendField("NSS")
      .appendField(
        new Blockly.FieldDropdown(
          Blockly.mbed.Boards.selected.digitalPins), 'CS')
      .appendField("RST")
      .appendField(
        new Blockly.FieldDropdown(
          Blockly.mbed.Boards.selected.digitalPins), 'RESET');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

Blockly.Blocks.ld3320_read = {
  init: function () {
    this.setColour(Blockly.Blocks.spi.HUE);
    this.setOutput(true, null);
    this.setInputsInline(false);
    this.appendDummyInput()
      .appendField("Read from LD3320")
      // .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'MOSI');
  },
};
Blockly.Blocks.ld3320_start = {
  init: function () {
    this.setColour(Blockly.Blocks.spi.HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
      .appendField("Start LD3320")
      // .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'MOSI');
  },
};
Blockly.Blocks.ld3320_add = {
  init: function () {
    this.setColour(Blockly.Blocks.spi.HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.appendDummyInput()
      .appendField("Add command")
      .appendField(new Blockly.FieldTextInput("ni hao"), 'words')
      .appendField("ID")
      .appendField(new Blockly.FieldNumber("0"), 'id');
    this.appendDummyInput()
      .appendField("to LD3320")
      // .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'MOSI');
  },
};
/**
 * @license 
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @fileoverview Blocks for the mbed sensors communication functions.
 * Last modified on 2/03/2019 
 */

'use strict';

goog.provide('Blockly.Blocks.sensors');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.sensors.HUE = 40;

Blockly.Blocks.bh1750_setup = {};
Blockly.Blocks.bh1750_read = {};

Blockly.Blocks.bh1750_setup.init = function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField("BH1750 Setup SDA:", 'BH1750_NAME')
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.i2cPinsSDA), 'I2C_SDA')
        .appendField("SCL:")
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.i2cPinsSCL), 'I2C_SCL');
    this.setInputsInline(true);
    /*  previous statement can not be revised to true, otherwise this block-svg is not top-level block and
        it is very hard to detect whether the i2c is initialized or not
    */
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
};
/**
 * Returns the i2c instance name.
 * @return {!string} BH1750 instance name.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bh1750_setup.getBH1750SetupInstance = function () {
    return Blockly.mbed.Boards.selected.i2cMapper[this.getFieldValue('I2C_SDA')];
};
Blockly.Blocks.bh1750_setup.onchange = function () {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the BH1750 instance from this block
    var sda = this.getFieldValue('I2C_SDA');
    var scl = this.getFieldValue('I2C_SCL');
    var sdaIns = Blockly.mbed.Boards.selected.i2cMapper[sda];
    var sclIns = Blockly.mbed.Boards.selected.i2cMapper[scl];
    if (sdaIns == sclIns) {
        this.setWarningText(null, 'i2c_mismatch');
        this.setFieldValue('BH1750 on %1 Setup SDA:'.replace('%1', sdaIns), 'BH1750_NAME');
    }
    else {
        this.setWarningText(sdaIns + " mismatches " + sclIns, 'i2c_mismatch');
        this.setFieldValue('BH1750 Setup SDA', 'BH1750_NAME');
    }
};
/**
 * Updates the content of the the i2c related fields.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bh1750_setup.updateFields = function () {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'I2C_SDA', 'digitalPins');
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'I2C_SCL', 'digitalPins');
};
/**
 * Read value from BH1750.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bh1750_read.init = function () {
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField("Read BH1750 on ")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.i2cPins), 'I2C_Pins');
    this.setInputsInline(false);
    this.setTooltip("Read value from BH1750");

};
/**
 * Called whenever anything on the workspace changes.
 * It checks the instances of bh1750_setup and attaches a warning to this
 * block if not valid data is found.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bh1750_read.onchange = function () {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the I2C instance from this block
    var thisInstanceName = this.getFieldValue('I2C_Pins');
    var setupInstancePresent = false;
    //Iterate through top level blocks to find setup instance for the I2C id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var func = blocks[x].getBH1750SetupInstance;
        if (func) {
            var setupBlockInstanceName = func.call(blocks[x]);
            if (thisInstanceName == setupBlockInstanceName) {
                setupInstancePresent = true;
            }
        }
    }
    if (!setupInstancePresent) {
        this.setWarningText(Blockly.Msg.MBED_SERIAL_PRINT_WARN.replace('%1',
            thisInstanceName), 'bh1750_read');
    } else {
        this.setWarningText(null, 'bh1750_read');
    }
};
/**
 * Updates the content of the the bh1750 related fields.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bh1750_read.updateFields = function () {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'I2C_Pins', 'i2cPins');
};



Blockly.Blocks.bmp180_setup = {};
Blockly.Blocks.bmp180_temp = {};
Blockly.Blocks.bmp180_pressure = {};

Blockly.Blocks.bmp180_setup.init = function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField("BMP180 Setup SDA:", 'BMP180_NAME')
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.i2cPinsSDA), 'I2C_SDA')
        .appendField("SCL:")
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.i2cPinsSCL), 'I2C_SCL');
    this.setInputsInline(true);
    /*  previous statement can not be revised to true, otherwise this block-svg is not top-level block and
        it is very hard to detect whether the i2c is initialized or not
    */
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
};
/**
 * Returns the i2c instance name.
 * @return {!string} BMP180 instance name.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_setup.getBMP180SetupInstance = function () {
    return Blockly.mbed.Boards.selected.i2cMapper[this.getFieldValue('I2C_SDA')];
};
Blockly.Blocks.bmp180_setup.onchange = function () {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the BMP180 instance from this block
    var sda = this.getFieldValue('I2C_SDA');
    var scl = this.getFieldValue('I2C_SCL');
    var sdaIns = Blockly.mbed.Boards.selected.i2cMapper[sda];
    var sclIns = Blockly.mbed.Boards.selected.i2cMapper[scl];
    if (sdaIns == sclIns) {
        this.setWarningText(null, 'i2c_mismatch');
        this.setFieldValue('BMP180 on %1 Setup SDA:'.replace('%1', sdaIns), 'BMP180_NAME');
    }
    else {
        this.setWarningText(sdaIns + " mismatches " + sclIns, 'i2c_mismatch');
        this.setFieldValue('BMP180 Setup SDA', 'BMP180_NAME');
    }
};
/**
 * Updates the content of the the i2c related fields.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_setup.updateFields = function () {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'I2C_SDA', 'digitalPins');
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'I2C_SCL', 'digitalPins');
};
/**
 * Read temperature from BMP180.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_temp.init = function () {
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField("Temperature of BMP180 on ")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.i2cPins), 'I2C_Pins');
    this.setInputsInline(false);
    this.setTooltip("Read temperature from BMP180");

};
/**
 * Called whenever anything on the workspace changes.
 * It checks the instances of bmp180_setup and attaches a warning to this
 * block if not valid data is found.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_temp.onchange = function () {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the I2C instance from this block
    var thisInstanceName = this.getFieldValue('I2C_Pins');
    var setupInstancePresent = false;
    //Iterate through top level blocks to find setup instance for the I2C id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var func = blocks[x].getBMP180SetupInstance;
        if (func) {
            var setupBlockInstanceName = func.call(blocks[x]);
            if (thisInstanceName == setupBlockInstanceName) {
                setupInstancePresent = true;
            }
        }
    }
    if (!setupInstancePresent) {
        this.setWarningText(Blockly.Msg.MBED_SERIAL_PRINT_WARN.replace('%1',
            thisInstanceName), 'bmp180_temp');
    } else {
        this.setWarningText(null, 'bmp180_temp');
    }
};
/**
 * Updates the content of the the bmp180 related fields.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_temp.updateFields = function () {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'I2C_Pins', 'i2cPins');
};


/**
 * Read pressure from BMP180.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_pressure.init = function () {
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField("Pressure BMP180 on ")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.i2cPins), 'I2C_Pins');
    this.setInputsInline(false);
    this.setTooltip("Read pressure from BMP180");

};
/**
 * Called whenever anything on the workspace changes.
 * It checks the instances of bmp180_setup and attaches a warning to this
 * block if not valid data is found.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_pressure.onchange = function () {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the I2C instance from this block
    var thisInstanceName = this.getFieldValue('I2C_Pins');
    var setupInstancePresent = false;
    //Iterate through top level blocks to find setup instance for the I2C id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var func = blocks[x].getBMP180SetupInstance;
        if (func) {
            var setupBlockInstanceName = func.call(blocks[x]);
            if (thisInstanceName == setupBlockInstanceName) {
                setupInstancePresent = true;
            }
        }
    }
    if (!setupInstancePresent) {
        this.setWarningText(Blockly.Msg.MBED_SERIAL_PRINT_WARN.replace('%1',
            thisInstanceName), 'bmp180_pressure');
    } else {
        this.setWarningText(null, 'bmp180_pressure');
    }
};
/**
 * Updates the content of the the bmp180 related fields.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.bmp180_pressure.updateFields = function () {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'I2C_Pins', 'i2cPins');
};

function block_setup_digitalPin(sensor_name)
{
    var setup = {};
    setup.init = function () {
        this.setColour(Blockly.Blocks.sensors.HUE);
        this.appendDummyInput()
            .appendField(sensor_name+" On:", sensor_name+'_NAME')
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'IO');
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(true, null);
    };
    setup.updateFields = function () {
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'IO', 'digitalPins');
    };
    return setup;
}

function block_read_input(sensor_name, input_name)
{
    var read_value = {};
    read_value.init = function () {
        this.setOutput(true, null);
        this.setColour(Blockly.Blocks.sensors.HUE);
        this.appendDummyInput()
            .appendField(input_name+" of "+sensor_name+" on ")
            .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'IO');
        this.setInputsInline(false);
        this.setTooltip("Read "+input_name+" from "+sensor_name);
    };
    read_value.updateFields = function () {
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'IO', 'digitalPins');
    };
    return read_value;
}

function block_value_readable(sensor_name)
{
    var read_value = {};
    read_value.init = function () {
        this.setOutput(true, null);
        this.setColour(Blockly.Blocks.sensors.HUE);
        this.appendDummyInput()
            .appendField(sensor_name+" on ")
            .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'IO')
            .appendField(" is readable");
        this.setInputsInline(false);
    };
    read_value.updateFields = function () {
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'IO', 'digitalPins');
    };
    return read_value;
}

function block_value_reset(sensor_name)
{
    var read_value = {};
    read_value.init = function () {
        this.setColour(Blockly.Blocks.sensors.HUE);
        this.appendDummyInput()
            .appendField("Reset "+sensor_name+" on ")
            .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.digitalPins), 'IO');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    };
    read_value.updateFields = function () {
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'IO', 'digitalPins');
    };
    return read_value;
}

Blockly.Blocks.dht11_setup = block_setup_digitalPin("DHT11");
Blockly.Blocks.dht11_temp = block_read_input("DHT11", "Temperature");
Blockly.Blocks.dht11_humidity = block_read_input("DHT11", "Humidity");
Blockly.Blocks.dht11_readable = block_value_readable("DHT11");

Blockly.Blocks.ds18B20_setup = block_setup_digitalPin("DS18B20");
Blockly.Blocks.ds18B20_temp = block_read_input("DS18B20", "Temperature");
Blockly.Blocks.ds18B20_readable = block_value_readable("DS18B20");

Blockly.Blocks.sr501_setup = block_setup_digitalPin("SR501");
Blockly.Blocks.sr501_o = block_read_input("SR501", "Output");
Blockly.Blocks.sr501_readable = block_value_readable("SR501");
Blockly.Blocks.sr501_reset = block_value_reset("SR501");

Blockly.Blocks.analog_setup = {
    init: function () {
        var sensor_name = "GenericAnalog";
        this.setColour(Blockly.Blocks.sensors.HUE);
        this.appendDummyInput()
            .appendField(sensor_name+" on DIO", sensor_name+'_NAME')
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.digitalPins), 'IO');
        this.appendDummyInput()
            .appendField("AIO")
            .appendField(
                new Blockly.FieldDropdown(
                    Blockly.mbed.Boards.selected.analogPins), 'AIO');
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(true, null);
    },
    updateFields: function () {
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'IO', 'digitalPins');
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'AIO', 'analogPins');
    },
};
Blockly.Blocks.analog_o = block_read_input("GenericAnalog", "Value");
Blockly.Blocks.analog_readable = block_value_readable("GenericAnalog");
Blockly.Blocks.analog_reset = block_value_reset("GenericAnalog");

function block_jy901_get_val(input_name)
{
    var read_value = {};
    read_value.init = function () {
        this.setColour(Blockly.Blocks.sensors.HUE);
        this.appendDummyInput()
            .appendField("Get "+input_name+" from ")
            .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.serialPins), 'JY901_NAME')
            .appendField(" into ");
        this.appendValueInput('ARG1');
        this.appendValueInput('ARG2');
        this.appendValueInput('ARG3');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    };
    read_value.updateFields = function () {
        Blockly.mbed.Boards.refreshBlockFieldDropdown(
            this, 'JY901_NAME', 'serialPins');
    };
    return read_value;
}

Blockly.Blocks.jy901_setup = {};
Blockly.Blocks.jy901_receive = {};
Blockly.Blocks.jy901_getacc = block_jy901_get_val("Accel");
Blockly.Blocks.jy901_getgyo = block_jy901_get_val("Gyro");
Blockly.Blocks.jy901_getmag = block_jy901_get_val("Magnetic");
Blockly.Blocks.jy901_getatt = block_jy901_get_val("Axes");

Blockly.Blocks.jy901_setup.init = function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField("JY901 Setup TX:", 'JY901_NAME')
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.serialPinsTX), 'TX')
        .appendField("RX:")
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.serialPinsRX), 'RX');
    this.setInputsInline(true);
    /*  previous statement can not be revised to true, otherwise this block-svg is not top-level block and
        it is very hard to detect whether the i2c is initialized or not
    */
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
};
Blockly.Blocks.jy901_setup.getSetupInstance = function () {
    return Blockly.mbed.Boards.selected.serialMapper[this.getFieldValue('TX')];
};
Blockly.Blocks.jy901_setup.onchange = function () {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the JY901 instance from this block
    var tx = this.getFieldValue('TX');
    var rx = this.getFieldValue('RX');
    var txIns = Blockly.mbed.Boards.selected.serialMapper[tx];
    var rxIns = Blockly.mbed.Boards.selected.serialMapper[rx];
    if (txIns == rxIns) {
        this.setWarningText(null, 'serial_setup');
        this.setFieldValue('JY901 on %1 Setup TX:'.replace('%1', txIns), 'JY901_NAME');
    }
    else {
        this.setWarningText(txIns + " mismatches " + rxIns, 'serial_setup');
        this.setFieldValue('JY901 Setup TX', 'JY901_NAME');
    }
};
Blockly.Blocks.jy901_setup.updateFields = function () {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'TX', 'serialPinsTX');
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'RX', 'serialPinsRX');
};

Blockly.Blocks.jy901_receive.init = function () {
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField("Receive from JY901 on ")
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.serialPins), 'JY901_NAME')
        this.setPreviousStatement(true);
    this.setNextStatement(true);
};
Blockly.Blocks.jy901_receive.updateFields = function () {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'JY901_NAME', 'serialPins');
};
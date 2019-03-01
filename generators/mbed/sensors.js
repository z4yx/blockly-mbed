/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the mbed serial blocks.
 *     mbed Serial library docs: https://www.mbed.cc/en/Reference/Serial
 *
 * TODO: There are more functions that can be added:
 *       http://mbed.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.mbed.sensors');

goog.require('Blockly.mbed');

Blockly.mbed['bh1750_read'] = function (block) {
    var name = 'bh1750_' + block.getFieldValue('I2C_Pins');
    var code;
    code = name + '.getlightdata()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['bh1750_setup'] = function (block) {
    var sda = this.getFieldValue('I2C_SDA');
    var scl = this.getFieldValue('I2C_SCL');
    var sdaIns = Blockly.mbed.Boards.selected.i2cMapper[sda];
    var sclIns = Blockly.mbed.Boards.selected.i2cMapper[scl];
    console.assert(sdaIns == sclIns);
    var name = 'bh1750_' + sdaIns;
    Blockly.mbed.addDeclaration(name, 'BH1750 ' + name + '(' + sda + ',' + scl + ');');
    return "";
};

Blockly.mbed['bmp180_temp'] = function (block) {
    var name = 'bmp180_' + block.getFieldValue('I2C_Pins');
    var code;
    code = name + '.BMP180GetTemperature()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['bmp180_pressure'] = function (block) {
    var name = 'bmp180_' + block.getFieldValue('I2C_Pins');
    var code;
    code = name + '.BMP180GetPressure()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['bmp180_setup'] = function (block) {
    var sda = this.getFieldValue('I2C_SDA');
    var scl = this.getFieldValue('I2C_SCL');
    var sdaIns = Blockly.mbed.Boards.selected.i2cMapper[sda];
    var sclIns = Blockly.mbed.Boards.selected.i2cMapper[scl];
    console.assert(sdaIns == sclIns);
    var name = 'bmp180_' + sdaIns;
    Blockly.mbed.addDeclaration(name, 'BMP180 ' + name + '(' + sda + ',' + scl + ');');
    return "";
};

Blockly.mbed['dht11_temp'] = function (block) {
    var name = 'dht11_' + block.getFieldValue('IO');
    var code;
    code = name + '.gettemperature()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['dht11_humidity'] = function (block) {
    var name = 'dht11_' + block.getFieldValue('IO');
    var code;
    code = name + '.gethumidity()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['dht11_readable'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'dht11_' + io;
    var code;
    code = name + '.getdata()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['dht11_setup'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'dht11_' + io;
    Blockly.mbed.addDeclaration(name, 'dht11 ' + name + '(' + io + ');');
    return "";
};

Blockly.mbed['ds18B20_temp'] = function (block) {
    var name = 'ds18B20_' + block.getFieldValue('IO');
    var code;
    code = name + '.gettemperature()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['ds18B20_readable'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'ds18B20_' + io;
    var code;
    code = name + '.getdata()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['ds18B20_setup'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'ds18B20_' + io;
    Blockly.mbed.addDeclaration(name, 'DS18B20 ' + name + '(' + io + ');');
    return "";
};

Blockly.mbed['sr501_o'] = function (block) {
    var name = 'sr501_' + block.getFieldValue('IO');
    var code;
    code = name + '.read()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['sr501_readable'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'sr501_' + io;
    var code;
    code = name + '==true';
    return [code, Blockly.mbed.ORDER_EQUALITY];
};

Blockly.mbed['sr501_reset'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'sr501_' + io;
    var code;
    code = name + '.reset()\n';
    return code;
};

Blockly.mbed['sr501_setup'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'sr501_' + io;
    Blockly.mbed.addDeclaration(name, 'sr501 ' + name + '(' + io + ');');
    return "";
};
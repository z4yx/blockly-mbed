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
    code = name + '.reset();\n';
    return code;
};

Blockly.mbed['sr501_setup'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'sr501_' + io;
    Blockly.mbed.addDeclaration(name, 'sr501 ' + name + '(' + io + ');');
    return "";
};

Blockly.mbed['analog_o'] = function (block) {
    var name = 'analog_' + block.getFieldValue('IO');
    var code;
    code = name + '.read()';
    return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['analog_readable'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'analog_' + io;
    var code;
    code = name + '==true';
    return [code, Blockly.mbed.ORDER_EQUALITY];
};

Blockly.mbed['analog_reset'] = function (block) {
    var io = this.getFieldValue('IO');
    var name = 'analog_' + io;
    var code;
    code = name + '.reset();\n';
    return code;
};

Blockly.mbed['analog_setup'] = function (block) {
    var io = this.getFieldValue('IO');
    var aio = this.getFieldValue('AIO');
    var name = 'analog_' + io;
    Blockly.mbed.addDeclaration(name, 'YL ' + name + '(' + io + ',' + aio + ');');
    return "";
};

Blockly.mbed['jy901_setup'] = function (block) {
    var tx = this.getFieldValue('TX');
    var rx = this.getFieldValue('RX');
    var txIns = Blockly.mbed.Boards.selected.serialMapper[tx];
    var rxIns = Blockly.mbed.Boards.selected.serialMapper[rx];
    console.assert(txIns == rxIns);
    var name = 'jy901_' + txIns;
    Blockly.mbed.addDeclaration(name, 'JY901 ' + name + '(' + tx + ',' + rx + ');');
    return "";
};

Blockly.mbed['jy901_receive'] = function (block) {
    var io = this.getFieldValue('JY901_NAME');
    var name = 'jy901_' + io;
    var code;
    code = name + '.receiveData();\n';
    return code;
};

function jy901_get_any(method_name) {
    return function (block) {
        var io = this.getFieldValue('JY901_NAME');
        var arg1 = Blockly.mbed.valueToCode(block,'ARG1',Blockly.mbed.ORDER_COMMA) || 'invalid1';
        var arg2 = Blockly.mbed.valueToCode(block,'ARG2',Blockly.mbed.ORDER_COMMA) || 'invalid2';
        var arg3 = Blockly.mbed.valueToCode(block,'ARG3',Blockly.mbed.ORDER_COMMA) || 'invalid3';
        var name = 'jy901_' + io;
        var code;
        code = name + '.' + method_name + '(' + arg1 + ',' + arg2 + ',' + arg3 + ');\n';
        return code;
    };
}

Blockly.mbed['jy901_getacc'] = jy901_get_any('getAcc');
Blockly.mbed['jy901_getgyo'] = jy901_get_any('getGyo');
Blockly.mbed['jy901_getmag'] = jy901_get_any('getMag');
Blockly.mbed['jy901_getatt'] = jy901_get_any('getAttitude');
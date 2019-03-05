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

goog.provide('Blockly.mbed.filesystem');

goog.require('Blockly.mbed');


Blockly.mbed['sd_fs'] = function (block) {
    var mosi = this.getFieldValue('MOSI');
    var miso = this.getFieldValue('MISO');
    var sck = this.getFieldValue('SCK');
    var cs = this.getFieldValue('MISO');
    var name = 'sd_' + mosi;
    Blockly.mbed.addDeclaration(name, 'SDFileSystem ' + name + '(' + mosi + ',' + miso + ',' + sck + ',' + cs + ',' + '"sd"' + ');');
    return "";
};

Blockly.mbed['fs_fopen'] = function (block) {
    var path = Blockly.mbed.valueToCode(
        block, 'PATH', Blockly.mbed.ORDER_NONE);
    var fp = Blockly.mbed.getVariableName(block, this.getFieldValue('FILE'), Blockly.Variables.NAME_TYPE);
    var mode = this.getFieldValue('MODE');
    return fp + ' = fopen(' + path + ', "' + mode + '");\n';
};

Blockly.mbed['fs_fscanf'] = function (block) {
    var fp = Blockly.mbed.getVariableName(block, this.getFieldValue('FILE'), Blockly.Variables.NAME_TYPE);
    var content = Blockly.mbed.valueToCode(
        block, 'CONTENT', Blockly.mbed.ORDER_NONE) || '0';
    var content_str = Blockly.mbed.valueToCode(block, 'CONTENT_STR', Blockly.mbed.ORDER_NONE) || '';      

    var code;
    if(content_str){
        content_str = content_str.replace(/\b(\w)/g, '&$1');
        code = 'fscanf(' + fp + ',' + content + ',' + content_str + ');\n';  
    }else
        code = 'fscanf(' + fp + ',' + content + ');\n';
    return code;
};

Blockly.mbed['fs_fprintf'] = function(block) {
    var fp = Blockly.mbed.getVariableName(block, this.getFieldValue('FILE'), Blockly.Variables.NAME_TYPE);
    var content = Blockly.mbed.valueToCode(
        block, 'CONTENT', Blockly.mbed.ORDER_NONE) || '0';
    var content_str = Blockly.mbed.valueToCode(block, 'CONTENT_STR', Blockly.mbed.ORDER_NONE) || '';      
    var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');
    
    if (checkbox_name && content[content.length-1]==='"') {
      content=content.slice(0,content.length-1)+'\\n"';
    }
    var code;
    if(content_str)
      code = 'fprintf(' + fp + ',' + content+','+content_str + ');\n';  
    else
      code = 'fprintf(' + fp + ',' + content + ');\n';        
    return code;
  };

Blockly.mbed['fs_fclose'] = function (block) {
    var fp = Blockly.mbed.getVariableName(block, this.getFieldValue('FILE'), Blockly.Variables.NAME_TYPE);
    return 'fclose(' + fp + ');\n';
};
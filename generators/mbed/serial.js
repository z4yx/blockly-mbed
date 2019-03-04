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

goog.provide('Blockly.mbed.serial');

goog.require('Blockly.mbed');

Blockly.mbed['print_content'] = function(block) {
  var format_content = Blockly.mbed.valueToCode(block, 'format_content', Blockly.mbed.ORDER_ATOMIC);
  var join_content = Blockly.mbed.valueToCode(block, 'join_content', Blockly.mbed.ORDER_ATOMIC) || '';
  // TODO: Assemble mbed into code variable.
  var code;
  if(join_content)  
     code = format_content+','+join_content;
  else
     code = format_content;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.mbed.ORDER_ATOMIC];
};
/**
 * Code generator of block for writing to the serial com.
 * mbed code: loop { Serial.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['serial_print'] = function(block) {
  var serialName = block.getFieldValue('SERIAL_Pins');
  var content = Blockly.mbed.valueToCode(
      block, 'CONTENT', Blockly.mbed.ORDER_ATOMIC) || '0';
  var content_str = Blockly.mbed.valueToCode(block, 'CONTENT_STR', Blockly.mbed.ORDER_ATOMIC) || '';      
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  
  if (checkbox_name && content[content.length-1]==='"') {
    content=content.slice(0,content.length-1)+'\\n"';
  }
  var code;
  if(content_str)
    code = serialName + '.printf(' + content+','+content_str + ');\n';  
  else
    code = serialName + '.printf(' + content + ');\n';        
  return code;
};
/** Get character. This is a blocking call, waiting for a character
 * int  serial_getc(serial_t *obj);
 */

Blockly.mbed['serial_getc'] = function(block) {
    var serialName = block.getFieldValue('SERIAL_Pins');
    var code;
    code = serialName + '.getc()';  
    return [code, Blockly.mbed.ORDER_ATOMIC];
};    
/**
 * Code generator for block for setting the serial com speed.
 * mbed code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.mbed['serial_setup'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialId_TX = block.getFieldValue('SERIAL_ID_TX');
  var serialRX=Blockly.mbed.Boards.selected.serialMapper[serialId];
  var serialTX=Blockly.mbed.Boards.selected.serialMapper[serialId_TX];
//  if(serialRX==serialTX)
//     block.setWarningText(null,'serial_rx_tx_mismatch');
//  else
//     block.setWarningText(serialRX+" mismatches "+serialTX,'serial_rx_tx_mismatch');
      
  console.assert(serialRX==serialTX);
  var serialName = serialRX;
  var serialSpeed = block.getFieldValue('SPEED');
  var serialSetupCode = serialName + '.baud(' + serialSpeed + ');';
  //Add serialId, serialID_TX to Blockly.mbed.Boards.selected.serialPins
  Blockly.mbed.addDeclaration('serial_' + serialId, 'Serial '+serialName+'(' + serialId_TX+','+serialId + ');');
  //Blockly.mbed.addSetup('serial_' + serialId, serialSetupCode, true);
  var code = serialSetupCode+'\n';
  return code;
};
Blockly.mbed['serial_attach'] = function(block) {
  var serialName = block.getFieldValue('SERIAL_Pins');
  var branch = Blockly.mbed.statementToCode(block, 'function_body');
  
  
  if (Blockly.mbed.STATEMENT_PREFIX) {
    branch = Blockly.mbed.prefixLines(
        Blockly.mbed.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.mbed.INDENT) + branch;
  }
  if (Blockly.mbed.INFINITE_LOOP_TRAP) {
    branch = Blockly.mbed.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.mbed.valueToCode(block, 'RETURN',
      Blockly.mbed.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }

  // Get arguments with type
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] =
        Blockly.mbed.getmbedType_(block.getArgType(block.arguments_[x])) +
        ' ' +
        Blockly.mbed.variableDB_.getName(block.arguments_[x],
            Blockly.Variables.NAME_TYPE);
  }

  // Get return type
  var returnType = Blockly.Types.NULL;
  if (block.getReturnType) {
    returnType = block.getReturnType();
  }
  returnType = Blockly.mbed.getmbedType_(returnType);

  // Construct code
  var functionName=serialName+'_interrupt_fun';
  var code = returnType + ' ' + functionName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  // code = Blockly.mbed.scrub_(block, code);
  Blockly.mbed.userFunctions_[functionName] = code;  
  
  // TODO: Assemble mbed into code variable.
  
  var attach_code = serialName + '.attach(&' + functionName+');\n';  
  return attach_code;
};

Blockly.mbed['pn532_setup'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialId_TX = block.getFieldValue('SERIAL_ID_TX');
  var serialRX=Blockly.mbed.Boards.selected.serialMapper[serialId];
  var serialTX=Blockly.mbed.Boards.selected.serialMapper[serialId_TX];
      
  console.assert(serialRX==serialTX);
  var hsuName = 'pn_hsu_' + serialId;
  var pn532Name = 'pn532_' + serialId;
  Blockly.mbed.addDeclaration(hsuName, 'Serial '+hsuName+'(' + serialId_TX+','+serialId + ',115200);');
  Blockly.mbed.addDeclaration(pn532Name, 'PN532Checker '+pn532Name+'(&' + hsuName + ');');
  return '';
};

Blockly.mbed['pn532_wait_card'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_Pins');
  var timeo = block.getFieldValue('TIMEOUT') || '100';
  var pn532Name = 'pn532_' + serialId;
  var code;
  code = pn532Name + '.start_check(' + timeo + ')';  
  return [code, Blockly.mbed.ORDER_UNARY_POSTFIX];
};

Blockly.mbed['pn532_read_user'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_Pins');
  var pn532Name = 'pn532_' + serialId;
  var code;
  code = pn532Name + '.get_userid()';  
  return [code, Blockly.mbed.ORDER_UNARY_POSTFIX];
};

Blockly.mbed['pn532_read_passwd'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_Pins');
  var pn532Name = 'pn532_' + serialId;
  var code;
  code = pn532Name + '.get_passwd()';  
  return [code, Blockly.mbed.ORDER_UNARY_POSTFIX];
};
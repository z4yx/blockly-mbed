/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview mbed ode generator for SPI library blocks.
 *     The mbed SPI library docs: http://mbed.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.mbed.spi');

goog.require('Blockly.mbed');


/**
 * Code generator for the SPI configuration block. It does not add any LoC to
 * the loop(), but it generates code for the setup() function.
 * mbed code: #include <SPI.h>
 *               setup() { SPI.setBitOrder(X);
 *                         SPI.setDataMode(Y);
 *                         SPI.setClockDivider(Z);
 *                         SPI.begin(); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['spi_setup'] = function(block) {
  var spiId = block.getFieldValue('SPI_ID');
  var spiFrequency = Blockly.mbed.valueToCode(block, 'frequency', Blockly.mbed.ORDER_ATOMIC) || 1;
  var spiMode = block.getFieldValue('SPI_MODE');  
  var cs = block.getFieldValue('PIN');  
  var spi_pins=[];
  if(spiId=='SPI1' && block.getFieldValue('SPI1_ID')=='PB_3,PB_4,PB_5')
      spi_pins=Blockly.mbed.Boards.selected.spi1_alternative;
  else
      spi_pins=Blockly.mbed.Boards.selected.spiPins[spiId];
  var spiName='spi_' + spiId;
  var digitalOut_Name = 'myDigitalOut'+ cs;
  // SPI spi(p5, p6, p7);  
  // mosi, miso, sclk 
  Blockly.mbed.addDeclaration(spiName, 'SPI '+spiName+'(' + spi_pins['MOSI']+','+spi_pins['MISO']+','+spi_pins['SCK'] + ');');  
  Blockly.mbed.addDeclaration(digitalOut_Name , 'DigitalOut '+digitalOut_Name+'(' + cs + ');');
  
  var code='';
  //deselect
  //code = digitalOut_Name+'.write(1);\n';
  code +=spiName+'.frequency('+spiFrequency*100000+');\n';
  code +=spiName+'.format(8,'+spiMode+');\n';
  //select
  code += digitalOut_Name+'.write(0);\n';    
  return code;
};

/**
 * Code generator for the SPI transfer block.
 * SPI bus can have several slaves, which are selected using a digital output
 * as a SS pin. This digital pin will be configured as a normal output.
 * mbed code: #include <SPI.h>
 *               setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, HIGH);
 *                       SPI.transfer(0);
 *                       digitalWrite(X, LOW); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['spi_transfer'] = function(block) {
  var spiId = block.getFieldValue('SPI_ID');
  //var spiSs = block.getFieldValue('SPI_SS');
  var spiData = Blockly.mbed.valueToCode(
      block, 'SPI_DATA', Blockly.mbed.ORDER_ATOMIC) || '0';


  // Reserve SPI pins MOSI, MISO, and SCK
  // var spiPins = Blockly.mbed.Boards.selected.spiPins[spiId];
  // for (var i = 0; i < spiPins.length; i++) {
    // Blockly.mbed.reservePin(block, spiPins[i][1],
        // Blockly.mbed.PinTypes.SPI, 'SPI ' + spiPins[i][0]);
  // }

  // Configure the Slave Select as a normal output if a pin is used
  // if (spiSs !== 'none') {
    // Blockly.mbed.reservePin(
        // block, spiSs, Blockly.mbed.PinTypes.OUTPUT, 'SPI Slave pin');
    // var setupCode = 'pinMode(' + spiSs + ', OUTPUT);';
    // Blockly.mbed.addSetup('io_' + spiSs, setupCode, false);
  // } 
  // else means the SS pin is always set for the device

  // Add the code, but only use a SS pin if one is selected
  var spiName='spi_' + spiId;
  var code = spiName+'.write('+spiData+');\n';
  return code;
};

/**
 * Code generator for the SPI transfer block with a return value.
 * The rest is the same as the spi_transfer block.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['spi_transfer_return'] = function(block) {
  var spiId = block.getFieldValue('SPI_ID');
  var spiSs = block.getFieldValue('SPI_SS');
  var spiData = Blockly.mbed.valueToCode(
      block, 'SPI_DATA', Blockly.mbed.ORDER_ATOMIC) || '0';
  // The spi_transfer block invoked to generate all setup stuff, code discarded
  var spiTransferOnlyCode = Blockly.mbed['spi_transfer'](block);
  if (spiSs === 'none') {
    var code = spiId + '.transfer(' + spiData + ')';
  } else {
    var func = [
        'int ' + Blockly.mbed.DEF_FUNC_NAME + '() {',
        '  int spiReturn = 0;',
        '  digitalWrite(' + spiSs + ', HIGH);',
        '  spiReturn = ' + spiId + '.transfer(' + spiData + ');',
        '  digitalWrite(' + spiSs + ', LOW);',
        '  return spiReturn;',
        '}'];
    var functionName = Blockly.mbed.addFunction(
        'spiReturnSlave' + spiSs, func.join('\n'));
    var code = functionName + '()';
  }
  return [code, Blockly.mbed.ORDER_UNARY_POSTFIX];
};

Blockly.mbed['nrf24_setup'] = function (block) {
  var mosi = this.getFieldValue('MOSI');
  var miso = this.getFieldValue('MISO');
  var sck = this.getFieldValue('SCK');
  var cs = this.getFieldValue('CS');
  var ce = this.getFieldValue('CE');
  var irq = this.getFieldValue('IRQ');
  var size = this.getFieldValue('SIZE');
  var name = 'nrf24_' + mosi;
  var macroSize = 'NRF24_TRANSFER_SIZE';
  Blockly.mbed.addDeclaration(macroSize,'#define '+macroSize+' '+size);
  Blockly.mbed.addDeclaration(name, 'nRF24L01P ' + name + '(' + mosi + ',' + miso + ',' + sck + ',' + cs + ',' + ce + ',' + irq + ');');
  return name + '.powerUp();\n' +
        name + '.setTransferSize( '+ macroSize + ' );\n' +
        name + '.setReceiveMode();\n' +
        name + '.enable();\n';
};

Blockly.mbed['nrf24_readable'] = function (block) {
  var mosi = this.getFieldValue('MOSI');
  var name = 'nrf24_' + mosi;
  var code;
  code = name + '.readable()';
  return [code, Blockly.mbed.ORDER_MEMBER];
};

Blockly.mbed['nrf24_read'] = function (block) {
  var buf = Blockly.mbed.getVariableName(block, this.getFieldValue('BUF'), Blockly.Variables.NAME_TYPE);
  var mosi = this.getFieldValue('MOSI');
  var name = 'nrf24_' + mosi;
  var code;
  code = name + '.read( NRF24L01P_PIPE_P0, ' + buf + ', NRF24_TRANSFER_SIZE);\n';
  return code;
};

Blockly.mbed['nrf24_write'] = function (block) {
  var buf = Blockly.mbed.getVariableName(block, this.getFieldValue('BUF'), Blockly.Variables.NAME_TYPE);
  var mosi = this.getFieldValue('MOSI');
  var name = 'nrf24_' + mosi;
  var code;
  code = name + '.write( NRF24L01P_PIPE_P0, ' + buf + ', NRF24_TRANSFER_SIZE);\n';
  return code;
};

function w5500_build_sensors_actuators(arr) {
  return arr.map(function(item){
    item = item.trim();
    if(item) return '{"'+item+'",""},';
    else return '';
  })
  .filter(function(item){
    return item.length>0;
  })
  .join('');
}

Blockly.mbed['w5500_setup'] = function (block) {
  var host = this.getFieldValue('host');
  var sensors = w5500_build_sensors_actuators(this.getFieldValue('sensors').split(','));
  var actuators = w5500_build_sensors_actuators(this.getFieldValue('actuators').split(','));
  var code= "";
  code += "MQTTSocket w5500sock_;\n";
  code += "MClient w5500client_(w5500sock_);\n";
  code += "const char* w5500sensors_[][2] = {"+sensors+"{NULL,NULL}};\n";
  code += "const char* w5500actuators_[][2] = {"+actuators+"{NULL,NULL}};\n";
  code += 'networking_init(sock, client, "' + host + '", w5500sensors_, w5500actuators_, W5500_on_command);\n';
  return code;
};

Blockly.mbed['w5500_yield'] = function (block) {
  var t = this.getFieldValue('timeout');
  var code;
  code = 'w5500client_.yield('+t+');\n';
  return code;
};

Blockly.mbed['w5500_publish'] = function (block) {
  var topic = Blockly.mbed.valueToCode(block, 'topic', Blockly.mbed.ORDER_COMMA) || '""';
  var value = Blockly.mbed.valueToCode(block, 'value', Blockly.mbed.ORDER_COMMA) || '""';
  return 'publish_value(client, '+topic+', '+value+');\n';
};

Blockly.mbed['w5500_command'] = function (block) {
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
      var name = block.arguments_[x];
      args[x] = Blockly.mbed.getmbedType_(block.argumentsType_[x]);
      if (block.argumentsType_[x].typeId === Blockly.Types.ARRAY.typeId)
          args[x] = args[x].replace(/\[/, name + '[');
      else
          args[x] += ' ' + name;
  }

  // Get return type
  var returnType = Blockly.Types.NULL;
  if (block.getReturnType) {
      returnType = block.getReturnType();
  }
  returnType = Blockly.mbed.getmbedType_(returnType);

  // Construct code
  var functionName = block.callbackName_;
  var code = returnType + ' ' + functionName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  // code = Blockly.mbed.scrub_(block, code);
  Blockly.mbed.userFunctions_[functionName] = code;

  // TODO: Assemble mbed into code variable.

  return '';
};
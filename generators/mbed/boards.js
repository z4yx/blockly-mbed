/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Implements the required data for functions for selecting
 *     amongst different mbed boards.
 */
'use strict';

goog.provide('Blockly.mbed.boards');

goog.require('Blockly.mbed');


Blockly.mbed.Boards=new Object();
/** Object to contain all mbed board profiles. */
Blockly.mbed.Boards['profiles'] = new Object();

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the analogue IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     analogue IO pins.
 */
Blockly.mbed.Boards['generateAnalogIo'] = function(pinStart, pinEnd) {
  var analogIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    analogIo.push(['A' + i.toString(), 'A' + i.toString()]);
  }
  return analogIo;
};

//STM32F103
Blockly.mbed.Boards['profiles']['nucleo_f103rb']={
    name: 'NUCLEO F103RB',
    description: 'mbed NUCLEO standard compatible board',
    /*GPIO*/
    digitalPins: [ [ 'PA_0', 'PA_0' ],
  [ 'PA_1', 'PA_1' ],
  [ 'PA_10', 'PA_10' ],
  [ 'PA_11', 'PA_11' ],
  [ 'PA_12', 'PA_12' ],
  [ 'PA_13', 'PA_13' ],
  [ 'PA_14', 'PA_14' ],
  [ 'PA_15', 'PA_15' ],
  [ 'PA_2', 'PA_2' ],
  [ 'PA_3', 'PA_3' ],
  [ 'PA_4', 'PA_4' ],
  [ 'PA_5', 'PA_5' ],
  [ 'PA_6', 'PA_6' ],
  [ 'PA_7', 'PA_7' ],
  [ 'PA_8', 'PA_8' ],
  [ 'PA_9', 'PA_9' ],
  [ 'PB_0', 'PB_0' ],
  [ 'PB_1', 'PB_1' ],
  [ 'PB_10', 'PB_10' ],
  [ 'PB_11', 'PB_11' ],
  [ 'PB_12', 'PB_12' ],
  [ 'PB_13', 'PB_13' ],
  [ 'PB_14', 'PB_14' ],
  [ 'PB_15', 'PB_15' ],
  [ 'PB_2', 'PB_2' ],
  [ 'PB_3', 'PB_3' ],
  [ 'PB_4', 'PB_4' ],
  [ 'PB_5', 'PB_5' ],
  [ 'PB_6', 'PB_6' ],
  [ 'PB_7', 'PB_7' ],
  [ 'PB_8', 'PB_8' ],
  [ 'PB_9', 'PB_9' ],
  [ 'PC_0', 'PC_0' ],
  [ 'PC_1', 'PC_1' ],
  [ 'PC_10', 'PC_10' ],
  [ 'PC_11', 'PC_11' ],
  [ 'PC_12', 'PC_12' ],
  [ 'PC_13', 'PC_13' ],
  [ 'PC_14', 'PC_14' ],
  [ 'PC_15', 'PC_15' ],
  [ 'PC_2', 'PC_2' ],
  [ 'PC_3', 'PC_3' ],
  [ 'PC_4', 'PC_4' ],
  [ 'PC_5', 'PC_5' ],
  [ 'PC_6', 'PC_6' ],
  [ 'PC_7', 'PC_7' ],
  [ 'PC_8', 'PC_8' ],
  [ 'PC_9', 'PC_9' ],
  [ 'PD_2', 'PD_2' ],
  [ 'PF_0', 'PF_0' ],
  [ 'PF_1', 'PF_1' ] ],
  analogPins: [
    [ 'PA_0', 'PA_0' ],
    [ 'PA_1', 'PA_1' ],
    [ 'PA_2', 'PA_2' ],
    [ 'PA_3', 'PA_3' ],
    [ 'PA_4', 'PA_4' ],
    [ 'PA_5', 'PA_5' ],
    [ 'PA_6', 'PA_6' ],
    [ 'PA_7', 'PA_7' ],
    [ 'PB_0', 'PB_0' ],
    [ 'PB_1', 'PB_1' ],
    [ 'PC_0', 'PC_0' ],
    [ 'PC_1', 'PC_1' ],
    [ 'PC_2', 'PC_2' ],
    [ 'PC_3', 'PC_3' ],
    [ 'PC_4', 'PC_4' ],
    [ 'PC_5', 'PC_5' ],
  ],
    /*not distinguish Timer */
    pwmPins: [ [ 'PA_1', 'PA_1' ],
  [ 'PA_10', 'PA_10' ],
  [ 'PA_11', 'PA_11' ],
  [ 'PA_15', 'PA_15' ],
  [ 'PA_2', 'PA_2' ],
  [ 'PA_3', 'PA_3' ],
  [ 'PA_6', 'PA_6' ],
  [ 'PA_7', 'PA_7' ],
  [ 'PA_8', 'PA_8' ],
  [ 'PA_9', 'PA_9' ],
  [ 'PB_0', 'PB_0' ],
  [ 'PB_1', 'PB_1' ],
  [ 'PB_10', 'PB_10' ],
  [ 'PB_11', 'PB_11' ],
  [ 'PB_13', 'PB_13' ],
  [ 'PB_14', 'PB_14' ],
  [ 'PB_15', 'PB_15' ],
  [ 'PB_3', 'PB_3' ],
  [ 'PB_4', 'PB_4' ],
  [ 'PB_5', 'PB_5' ],
  [ 'PC_4', 'PC_4' ],
  [ 'PC_6', 'PC_6' ],
  [ 'PC_7', 'PC_7' ],
  [ 'PC_8', 'PC_8' ],
  [ 'PC_9', 'PC_9' ]],
    serialPinsRX:[['PA_10','PA_10'],['PA_3','PA_3'],['PB_11','PB_11'],['PB_7','PB_7'],['PC_11','PC_11']],
    serialPinsTX:[['PB_6','PB_6'],['PC_10','PC_10'],['PA_9','PA_9'],['PB_10','PB_10'],['PA_2','PA_2']],
    serialPins:[['Serial_1','Serial_1'],['Serial_2','Serial_2'],['Serial_3','Serial_3']],
    serialMapper:{'PC_10':'Serial_3','PB_7':'Serial_1','PC_11':'Serial_3',
    'PB_6':'Serial_1','PA_9':'Serial_1','PB_10':'Serial_3','PA_10':'Serial_1','PA_2':'Serial_2',
    'PA_3':'Serial_2','PB_11':'Serial_3'},
    serialSpeed: [['9600', '9600'],['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
    spi: [['SPI2', 'SPI2'],['SPI1', 'SPI1']],
    spi1_choice:[['PA_5,PA_6,PA_7','PA_5,PA_6,PA_7'],['PB_3,PB_4,PB_5','PB_3,PB_4,PB_5']],
    spi1_alternative:{'MOSI': 'PB_5', 'MISO':'PB_4', 'SCK': 'PB_3'},
    spiPins: { SPI1: {'MOSI': 'PA_7','MISO': 'PA_6','SCK': 'PA_5'},
               SPI2: {'MOSI': 'PB_15','MISO': 'PB_14','SCK': 'PB_13'}},
    i2cMapper: {'PB_6': 'I2C_1', 'PB_7': 'I2C_1', 'PB_8': 'I2C_1', 'PB_9': 'I2C_1', 
            'PB_10': 'I2C_2', 'PB_11': 'I2C_2'},
    i2cPins: [['I2C_1','I2C_1'],['I2C_2','I2C_2']],
    i2cPinsSDA: [['PB_9','PB_9'],['PB_11','PB_11'],['PB_7','PB_7']],
    i2cPinsSCL: [['PB_8','PB_8'],['PB_10','PB_10'],['PB_6','PB_6']],
    i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
    eepModels: [["24C01", "T24C01"], ["24C02", "T24C02"], ["24C04", "T24C04"], ["24C08", "T24C08"], ["24C16", "T24C16"],
      ["24C32", "T24C32"], ["24C64", "T24C64"], ["24C128", "T24C128"], ["24C256", "T24C256"],
      ["24C512", "T24C512"], ["24C1024", "T24C1024"], ["24C1025", "T24C1025"]],
    builtinLed: [['LED_1', 'PA_5']],
    interrupt: [['interrupt0', '2'], ['interrupt1', '3']],
    irqNumber: [
      ['WWDG_IRQn','WWDG_IRQn'],      /*!< Window WatchDog Interrupt                            */
      ['PVD_IRQn','PVD_IRQn'],      /*!< PVD through EXTI Line detection Interrupt            */
      ['TAMPER_IRQn','TAMPER_IRQn'],      /*!< Tamper Interrupt                                     */
      ['RTC_IRQn','RTC_IRQn'],      /*!< RTC global Interrupt                                 */
      ['FLASH_IRQn','FLASH_IRQn'],      /*!< FLASH global Interrupt                               */
      ['RCC_IRQn','RCC_IRQn'],      /*!< RCC global Interrupt                                 */
      ['EXTI0_IRQn','EXTI0_IRQn'],      /*!< EXTI Line0 Interrupt                                 */
      ['EXTI1_IRQn','EXTI1_IRQn'],      /*!< EXTI Line1 Interrupt                                 */
      ['EXTI2_IRQn','EXTI2_IRQn'],      /*!< EXTI Line2 Interrupt                                 */
      ['EXTI3_IRQn','EXTI3_IRQn'],      /*!< EXTI Line3 Interrupt                                 */
      ['EXTI4_IRQn','EXTI4_IRQn'],     /*!< EXTI Line4 Interrupt                                 */
      ['DMA1_Channel1_IRQn','DMA1_Channel1_IRQn'],     /*!< DMA1 Channel 1 global Interrupt                      */
      ['DMA1_Channel2_IRQn','DMA1_Channel2_IRQn'],     /*!< DMA1 Channel 2 global Interrupt                      */
      ['DMA1_Channel3_IRQn','DMA1_Channel3_IRQn'],     /*!< DMA1 Channel 3 global Interrupt                      */
      ['DMA1_Channel4_IRQn','DMA1_Channel4_IRQn'],     /*!< DMA1 Channel 4 global Interrupt                      */
      ['DMA1_Channel5_IRQn','DMA1_Channel5_IRQn'],     /*!< DMA1 Channel 5 global Interrupt                      */
      ['DMA1_Channel6_IRQn','DMA1_Channel6_IRQn'],     /*!< DMA1 Channel 6 global Interrupt                      */
      ['DMA1_Channel7_IRQn','DMA1_Channel7_IRQn'],     /*!< DMA1 Channel 7 global Interrupt                      */
      ['ADC1_2_IRQn','ADC1_2_IRQn'],     /*!< ADC1 and ADC2 global Interrupt                       */
      ['USB_HP_CAN1_TX_IRQn','USB_HP_CAN1_TX_IRQn'],     /*!< USB Device High Priority or CAN1 TX Interrupts       */
      ['USB_LP_CAN1_RX0_IRQn','USB_LP_CAN1_RX0_IRQn'],     /*!< USB Device Low Priority or CAN1 RX0 Interrupts       */
      ['CAN1_RX1_IRQn','CAN1_RX1_IRQn'],     /*!< CAN1 RX1 Interrupt                                   */
      ['CAN1_SCE_IRQn','CAN1_SCE_IRQn'],     /*!< CAN1 SCE Interrupt                                   */
      ['EXTI9_5_IRQn','EXTI9_5_IRQn'],     /*!< External Line[9:5] Interrupts                        */
      ['TIM1_BRK_IRQn','TIM1_BRK_IRQn'],     /*!< TIM1 Break Interrupt                                 */
      ['TIM1_UP_IRQn','TIM1_UP_IRQn'],     /*!< TIM1 Update Interrupt                                */
      ['TIM1_TRG_COM_IRQn','TIM1_TRG_COM_IRQn'],     /*!< TIM1 Trigger and Commutation Interrupt               */
      ['TIM1_CC_IRQn','TIM1_CC_IRQn'],     /*!< TIM1 Capture Compare Interrupt                       */
      ['TIM2_IRQn','TIM2_IRQn'],     /*!< TIM2 global Interrupt                                */
      ['TIM3_IRQn','TIM3_IRQn'],     /*!< TIM3 global Interrupt                                */
      ['TIM4_IRQn','TIM4_IRQn'],     /*!< TIM4 global Interrupt                                */
      ['I2C1_EV_IRQn','I2C1_EV_IRQn'],     /*!< I2C1 Event Interrupt                                 */
      ['I2C1_ER_IRQn','I2C1_ER_IRQn'],     /*!< I2C1 Error Interrupt                                 */
      ['I2C2_EV_IRQn','I2C2_EV_IRQn'],     /*!< I2C2 Event Interrupt                                 */
      ['I2C2_ER_IRQn','I2C2_ER_IRQn'],     /*!< I2C2 Error Interrupt                                 */
      ['SPI1_IRQn','SPI1_IRQn'],     /*!< SPI1 global Interrupt                                */
      ['SPI2_IRQn','SPI2_IRQn'],     /*!< SPI2 global Interrupt                                */
      ['USART1_IRQn','USART1_IRQn'],     /*!< USART1 global Interrupt                              */
      ['USART2_IRQn','USART2_IRQn'],     /*!< USART2 global Interrupt                              */
      ['USART3_IRQn','USART3_IRQn'],     /*!< USART3 global Interrupt                              */
      ['EXTI15_10_IRQn','EXTI15_10_IRQn'],     /*!< External Line[15:10] Interrupts                      */
      ['RTC_Alarm_IRQn','RTC_Alarm_IRQn'],     /*!< RTC Alarm through EXTI Line Interrupt                */
      ['USBWakeUp_IRQn','USBWakeUp_IRQn'],     /*!< USB Device WakeUp from suspend through EXTI Line Interrupt */
    ],
}
/** Set default profile to mbed standard-compatible board */
Blockly.mbed.Boards['selected'] = Blockly.mbed.Boards['profiles']['nucleo_f103rb'];

/**
 * Refreshes the contents of a block Field Dropdown.
 * This is use to refresh the blocks after the board profile has been changed.
 * @param {!Blockly.Block} block Generated code.
 * @param {!string} fieldName Name of the block FieldDropdown to refresh.
 * @param {!string} boardKey Name of the board profile property to fetch.
 */
Blockly.mbed.Boards['refreshBlockFieldDropdown'] =
    function(block, fieldName, boardKey) {
  var field = block.getField(fieldName);
  var fieldValue = field.getValue();
  var dataArray = Blockly.mbed.Boards.selected[boardKey];
  field.menuGenerator_ = dataArray;

  var currentValuePresent = false;
  for (var i = 0; i < dataArray.length; i++) {
    if (fieldValue == dataArray[i][1]) {
      currentValuePresent = true;
    }
  }
  // If the old value is not present any more, add a warning to the block.
  if (!currentValuePresent) {
    block.setWarningText(
        'The old pin value ' + fieldValue + ' is no longer available.', 'bPin');
  } else {
    block.setWarningText(null, 'bPin');
  }
};

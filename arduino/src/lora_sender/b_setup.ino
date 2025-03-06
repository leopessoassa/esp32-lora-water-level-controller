void setupDisplay(void){
  VextON();
  delay(100);

  // Inicializando o Display
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
  display.setTextAlignment(TEXT_ALIGN_LEFT);
}

void setupLoRa(void){
  Mcu.begin(HELTEC_BOARD,SLOW_CLK_TPYE);

  RadioEvents.TxDone = OnTxDone;
  RadioEvents.TxTimeout = OnTxTimeout;
  
  Radio.Init( &RadioEvents );
  Radio.SetChannel( RF_FREQUENCY );
  Radio.SetTxConfig(  MODEM_LORA, TX_OUTPUT_POWER, 0, LORA_BANDWIDTH,
                      LORA_SPREADING_FACTOR, LORA_CODINGRATE,
                      LORA_PREAMBLE_LENGTH, LORA_FIX_LENGTH_PAYLOAD_ON,
                      true, 0, 0, LORA_IQ_INVERSION_ON, 3000 ); 

  idMessage = 0;
}

void setupLevelSensor(void)
{
  pinMode(LEVEL_SENSOR_TRIG_RX_PIN, OUTPUT); 
  pinMode(LEVEL_SENSOR_ECHO_TX_PIN, INPUT);
}

void setup() {
  Serial.begin(115200);
  while (!Serial);
  delay(1000);
  
  setupDisplay();  
  setupLoRa();
  setupLevelSensor();

  ShowIntroduction();
}


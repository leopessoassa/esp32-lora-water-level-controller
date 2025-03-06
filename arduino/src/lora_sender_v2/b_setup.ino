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
  // Inicializa LoRa
  if (!LoRa.begin(LORA_BAND)) {
    Serial.println("Erro ao iniciar o LoRa!");
    display.drawString(0, 20, "Erro ao iniciar!");
    display.display();
    while (1);
  }

  // Configuração avançada LoRa para melhor desempenho
  LoRa.setSpreadingFactor(LORA_SF);
  LoRa.setSignalBandwidth(LORA_BW);
  LoRa.setCodingRate4(LORA_CR);
  LoRa.setTxPower(LORA_TX_POWER);
  LoRa.setSyncWord(LORA_SYNC_WORD);

  Serial.println("LoRa inicializado com sucesso!");
  display.drawString(0, 20, "LoRa OK!");
  display.display();

  /*Mcu.begin(HELTEC_BOARD,SLOW_CLK_TPYE);

  RadioEvents.TxDone = OnTxDone;
  RadioEvents.TxTimeout = OnTxTimeout;
  
  Radio.Init( &RadioEvents );
  Radio.SetChannel( RF_FREQUENCY );
  Radio.SetTxConfig(  MODEM_LORA, TX_OUTPUT_POWER, 0, LORA_BANDWIDTH,
                      LORA_SPREADING_FACTOR, LORA_CODINGRATE,
                      LORA_PREAMBLE_LENGTH, LORA_FIX_LENGTH_PAYLOAD_ON,
                      true, 0, 0, LORA_IQ_INVERSION_ON, 3000 ); 

  idMessage = 0;*/
}

void setupLevelSensor(void)
{
  // Inicializa sensor de nível de água
    pinMode(TRIGGER_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
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


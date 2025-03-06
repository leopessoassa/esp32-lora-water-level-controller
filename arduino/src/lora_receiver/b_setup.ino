void DisplayWiFiStatus(char* texto) {
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, "Conectando WiFi");
  display.drawString(0, 10, texto);
  display.display();
}

void setupDisplay(void){
  VextON();
  delay(100);

  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
  display.setTextAlignment(TEXT_ALIGN_LEFT);
}

void setupLoRa(void){
  Mcu.begin(HELTEC_BOARD,SLOW_CLK_TPYE);
  
  RadioEvents.RxDone = OnRxDone;
  Radio.Init( &RadioEvents );
  Radio.SetChannel( RF_FREQUENCY );
  Radio.SetRxConfig(  MODEM_LORA, LORA_BANDWIDTH, LORA_SPREADING_FACTOR,
                      LORA_CODINGRATE, 0, LORA_PREAMBLE_LENGTH,
                      LORA_SYMBOL_TIMEOUT, LORA_FIX_LENGTH_PAYLOAD_ON,
                      0, true, 0, 0, LORA_IQ_INVERSION_ON, true );
  rxRssi = 0;
}

void setupWiFi(void){
  WiFi.disconnect(true);  //disconnect form wifi to set new wifi connection
  WiFi.mode(WIFI_STA);    //init wifi mode
  WiFi.setSleep(false);
  wifiMulti.addAP(ssid, password);
  
  while (wifiMulti.run() != WL_CONNECTED)
  {
    delay(500);
    DisplayWiFiStatus("Aguarde");
  }
  
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, "Conectado");
  display.setFont(ArialMT_Plain_16);
  display.drawString(0, 18, String(WiFi.localIP()));
  display.display();

  delay(2000);
}

void setup() {
  Serial.begin(115200);
  while (!Serial);
  delay(1000);
  
  setupDisplay();  
  setupLoRa();
  setupWiFi();

  ShowIntroduction();

  WaitMassage();
}
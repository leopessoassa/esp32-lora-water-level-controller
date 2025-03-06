void DisplayRecibedInfo(void){
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, "[RECEIVER] " + String(TX_OUTPUT_POWER) + "db");
  display.drawString(0, 10, "RSSI: " + String(rxRssi));
  display.drawString(0, 20, "Mensagem recebida");
  display.drawString(0, 30, Substr(rxpacket, 0, 9));
  display.setFont(ArialMT_Plain_16);
  display.drawString(0, 40, Substr(rxpacket, 10, rxSize - 1));

  display.display();
  Serial.printf("[DisplayRecibedInfo] rxRssi: %d\n", rxRssi);
}

void OnRxDone( uint8_t *payload, uint16_t size, int16_t rssi, int8_t snr  ) {
  Serial.printf("[OnRxDone] rssi: %d, size: %d, snr: %d", rssi, size, snr);
  Serial.println("");
	rxRssi=rssi;
  rxSize=size;
  memcpy(rxpacket, payload, size );
  rxpacket[size]='\0';
  Radio.Sleep( );

  DisplayRecibedInfo();
  SendRequest();

	loraIdle = true;
}

void WaitMassage( void ) {
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, "Aguardando mensagem");
  display.display();
}
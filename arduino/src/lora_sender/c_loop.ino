void DisplaySendInfo(void){
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, "[SENDER] " + String(TX_OUTPUT_POWER) + "db");
  display.drawString(0, 10, "Enviando");
  display.drawString(0, 20, txpacket);
  display.drawString(0, 30, "Length: " + String(strlen(txpacket)));
  display.display();
}

void UpdateSendInfo(void){
  idMessage += 1;
  
  UpdateLevelSensor();  
  sprintf(txpacket,"%s;%d;%0.2f", qrCode, idMessage, levelDistance);  
  DisplaySendInfo();
}

void loop() {
  if(loraIdle == true)
	{
    delay(2000);
		
    UpdateSendInfo();

    Radio.Send( (uint8_t *)txpacket, strlen(txpacket) );
    loraIdle = false;
	}
  Radio.IrqProcess();
}

























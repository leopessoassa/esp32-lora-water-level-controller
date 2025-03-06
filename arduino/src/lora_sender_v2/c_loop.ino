void DisplaySendInfo(void){
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, "[SENDER] " + String(LORA_TX_POWER) + "db");
  display.drawString(0, 10, "Enviando");
  display.drawString(0, 20, txpacket);
  display.drawString(0, 30, "Length: " + String(strlen(txpacket)));
  display.display();
}

void EnviarDadosNovaMedicao(void){
  idMessage += 1;
  sprintf(txpacket,"%s;%d;%0.2f", qrCode, idMessage, nivelAgua);  

  // Envia os dados via LoRa
  LoRa.beginPacket();
  LoRa.print(txpacket);
  LoRa.endPacket();

  DisplaySendInfo();
}

void ErroRecuperarNivel() {
  display.clear();
  display.setFont(ArialMT_Plain_16);
  display.drawString(0, 5, "Erro ao recuperar");
  display.drawString(0, 21, "Nível da água");
  display.display();
}

void loop() {
  nivelAgua = GetNivelAguaAtual();
  if (nivelAgua > 0 )
  {
    EnviarDadosNovaMedicao();
  }
  else {
    ErroRecuperarNivel();
  }
  
  delay(5000); // Aguarda 5 segundos antes de enviar novamente
}

























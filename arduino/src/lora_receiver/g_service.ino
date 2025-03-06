void SendRequest(void) {
  //Verifica se o WiFi está conectado
  if(wifiMulti.run() == WL_CONNECTED){

    Serial.print("[HTTP] begin...\n");
    String url = String(urlBase)+"/water-levels/sensor-create?params=";
    url += rxpacket;
    url += ";";
    url += String(rxRssi);

    Serial.print("url: ");
    Serial.println(url);

    http.begin(url);
    int httpCode = http.GET();

    // Verifica se ocorreu um erro
    if (httpCode > 0) {
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);

      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println(payload);
      }
    } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    Serial.println("");
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}
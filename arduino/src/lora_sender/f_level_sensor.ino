void UpdateLevelSensor(void) {
  digitalWrite(LEVEL_SENSOR_TRIG_RX_PIN, LOW);
  delayMicroseconds(2); 

  digitalWrite(LEVEL_SENSOR_TRIG_RX_PIN, HIGH); // define o pino de Trigger como ALTO para gerar pulso
  delayMicroseconds(10); // Mantenha o Trigger como "ON" por 10 ms para gerar pulso
  digitalWrite(LEVEL_SENSOR_TRIG_RX_PIN, LOW); // define o pino de Trigger como BAIXO para parar o pulso
  
  //Se o pulso atingiu o receptor LEVEL_SENSOR_ECHO_TX_PIN
  //torna-se alto, então pulseIn() retorna o
  //tempo que o pulso leva para chegar ao receptor.
  
  //Armazena o tempo que leva para o sinal ultrassônico retornar ao sensor
  duration = pulseIn(LEVEL_SENSOR_ECHO_TX_PIN, HIGH);

  Serial.printf("duration: %f", duration);
    
  //Converte o atraso em distância usando as informações de velocidade do som. (aproximadamente 344 m/s).
  //Distância calculada em cm.
  levelDistance = duration * 0.0344 / 2;

  Serial.printf(" levelDistance: %f\n", levelDistance);
}

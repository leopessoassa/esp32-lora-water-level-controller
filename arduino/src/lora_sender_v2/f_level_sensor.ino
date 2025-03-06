float GetNivelAguaAtual(void) {
  digitalWrite(TRIGGER_PIN, LOW);
  delayMicroseconds(2); 

  digitalWrite(TRIGGER_PIN, HIGH); // define o pino de Trigger como ALTO para gerar pulso
  delayMicroseconds(10); // Mantenha o Trigger como "ON" por 10 ms para gerar pulso
  digitalWrite(TRIGGER_PIN, LOW); // define o pino de Trigger como BAIXO para parar o pulso
  
  //Se o pulso atingiu o receptor LEVEL_SENSOR_ECHO_TX_PIN
  //torna-se alto, então pulseIn() retorna o
  //tempo que o pulso leva para chegar ao receptor.
  
  //Armazena o tempo que leva para o sinal ultrassônico retornar ao sensor
  long duracao = pulseIn(ECHO_PIN, HIGH);
    
  //Converte o atraso em distância usando as informações de velocidade do som. (aproximadamente 344 m/s).
  //Distância calculada em cm.
  float distancia = (duracao * 0.0343) / 2;

  return distancia;
}

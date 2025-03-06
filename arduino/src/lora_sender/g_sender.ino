void OnTxDone( void ) {
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 40, "ok");
  display.display();
	loraIdle = true;
}

void OnTxTimeout( void ) {
  display.setFont(ArialMT_Plain_16);
  display.drawString(0, 40, "Timeout");
  display.display();

  Radio.Sleep( );
  loraIdle = true;
}

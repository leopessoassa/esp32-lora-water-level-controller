#include "src/logo.h"

void DrawLogo(void) {
  display.clear();
  display.drawXbm(34, 7, logo_width, logo_height, logo_bits);
  display.display();
  delay(5000);
}

void DrawMessage(void) {
  display.clear();
  display.setFont(ArialMT_Plain_16);
  display.drawString(0, 5, "Leonardo Pessoa");
  display.setFont(ArialMT_Plain_24);
  display.drawString(0, 21, "Projeto TCC");
  display.display();
  delay(5000);
}

void ShowIntroduction(void) {
  DrawLogo();
  DrawMessage();
}
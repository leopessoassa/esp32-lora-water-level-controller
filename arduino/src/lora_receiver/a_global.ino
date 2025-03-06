#include "HT_SSD1306Wire.h"
#include "LoRaWan_APP.h"
#include <Wire.h>
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

#ifdef WIRELESS_STICK_V3
static SSD1306Wire  display(0x3c, 500000, SDA_OLED, SCL_OLED, GEOMETRY_64_32, RST_OLED); // addr , freq , i2c group , resolution , rst
#else
static SSD1306Wire  display(0x3c, 500000, SDA_OLED, SCL_OLED, GEOMETRY_128_64, RST_OLED); // addr , freq , i2c group , resolution , rst
#endif

// Lora Receiver
#define RF_FREQUENCY                                915000000 // Hz
#define TX_OUTPUT_POWER                             14        // dBm (5 14)
#define LORA_BANDWIDTH                              0         // [0: 125 kHz,
                                                              //  1: 250 kHz,
                                                              //  2: 500 kHz,
                                                              //  3: Reserved]
#define LORA_SPREADING_FACTOR                       7         // [SF7..SF12]
#define LORA_CODINGRATE                             1         // [1: 4/5,
                                                              //  2: 4/6,
                                                              //  3: 4/7,
                                                              //  4: 4/8]
#define LORA_PREAMBLE_LENGTH                        8         // Mesmo para Tx and Rx
#define LORA_SYMBOL_TIMEOUT                         0         // Simbolo
#define LORA_FIX_LENGTH_PAYLOAD_ON                  false
#define LORA_IQ_INVERSION_ON                        false
#define RX_TIMEOUT_VALUE                            1000
#define BUFFER_SIZE                                 25 // Tamanho do payload

// Variáveis globais
char rxpacket[BUFFER_SIZE];
static RadioEvents_t RadioEvents;
int16_t rxRssi, rxSize;
bool loraIdle = true;

WiFiMulti wifiMulti;
HTTPClient http;

const char* ssid = "iPhone Leonardo";
const char* password = "qwertyui";
const char* urlBase = "https://b88b-2804-29b8-508c-8c7e-e5b0-27f8-6f4f-1136.ngrok-free.app/api";


// Funções que podem ser acessíveis no programa
void VextON(void);
void OnRxDone(uint8_t *payload, uint16_t size, int16_t rssi, int8_t snr);
void ShowIntroduction(void);
void WaitMassage( void );
void SendRequest(void);
char* Substr(char* arr, int begin, int len);

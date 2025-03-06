#include <Wire.h>                // Comunicação I2C
#include "HT_SSD1306Wire.h"      // Biblioteca para o display OLED
#include "LoRaWan_APP.h"         // Comunicação LoRa
#include <Arduino.h>             // Biblioteca base do Arduino

#ifdef WIRELESS_STICK_V3
static SSD1306Wire  display(0x3c, 500000, SDA_OLED, SCL_OLED, GEOMETRY_64_32, RST_OLED); // addr , freq , i2c group , resolution , rst
#else
static SSD1306Wire  display(0x3c, 500000, SDA_OLED, SCL_OLED, GEOMETRY_128_64, RST_OLED); // addr , freq , i2c group , resolution , rst
#endif

// Lora Sender
#define RF_FREQUENCY                                915000000 // Frequência de operação (Brasil: 915 MHz)
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
#define LORA_SYMBOL_TIMEOUT                         0         // Simbolos
#define LORA_FIX_LENGTH_PAYLOAD_ON                  false
#define LORA_IQ_INVERSION_ON                        false
#define RX_TIMEOUT_VALUE                            1000
#define BUFFER_SIZE                                 25 // Tamanho do payload

//Sensor de nível 
#define LEVEL_SENSOR_ECHO_TX_PIN 13
#define LEVEL_SENSOR_TRIG_RX_PIN 12

// Variáveis globais
char txpacket[BUFFER_SIZE];
static RadioEvents_t RadioEvents;
uint32_t idMessage;
double levelDistance;   // Armazena a distância calculada em cm.
double duration;

const char *qrCode = "123456782"; // Identificador único do transmissor
bool loraIdle = true;

// Funções que podem ser acessíveis no programa
void VextON(void);
void OnTxDone(void);
void OnTxTimeout(void);
void UpdateLevelSensor(void);
void ShowIntroduction(void);

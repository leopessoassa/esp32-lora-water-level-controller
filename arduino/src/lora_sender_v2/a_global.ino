#include <Wire.h>           // Comunicação I2C
#include "HT_SSD1306Wire.h" // Biblioteca para o display OLED
#include "LoRa.h"           // Comunicação LoRa
#include <Arduino.h>        // Biblioteca base do Arduino

// Configuração do display OLED
#ifdef WIRELESS_STICK_V3
static SSD1306Wire  display(0x3c, 500000, SDA_OLED, SCL_OLED, GEOMETRY_64_32, RST_OLED); // addr , freq , i2c group , resolution , rst
#else
static SSD1306Wire  display(0x3c, 500000, SDA_OLED, SCL_OLED, GEOMETRY_128_64, RST_OLED); // addr , freq , i2c group , resolution , rst
#endif

// Configuração do módulo LoRa
#define LORA_BAND       915E6 // Frequência de operação (Brasil: 915 MHz)
#define LORA_SF         7     // Spreading Factor (ótimo para longo alcance)
#define LORA_BW         125E3 // Largura de banda
#define LORA_CR         5     // Coding Rate (redução de erros)
#define LORA_TX_POWER   20    // Potência máxima de transmissão (20 dBm)
#define LORA_SYNC_WORD  0x12  // Palavra de sincronização
#define BUFFER_SIZE     25    // Tamanho do payload

// Pinos do sensor ultrassônico JSN-SR04T
#define TRIGGER_PIN 12
#define ECHO_PIN 13

// Variáveis para medição
char txpacket[BUFFER_SIZE];       // string a ser enviada para o receptor
float nivelAgua = 0.0;            // Nível de água estimado
uint32_t idMessage = 0;           // Identificador da mensagem
const char *qrCode = "123456782"; // Identificador único do transmissor

/*

// Lora Sender
#define RF_FREQUENCY                                915000000 // Hz
#define TX_OUTPUT_POWER                             20        // dBm (5 14 20)
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

static RadioEvents_t RadioEvents;
uint32_t idMessage;
double levelDistance;   // Armazena a distância calculada em cm.
double duration;


bool loraIdle = true;
*/
// Funções que podem ser acessíveis no programa
void VextON(void);
//void OnTxDone(void);
//void OnTxTimeout(void);
float GetNivelAguaAtual(void);
void ShowIntroduction(void);

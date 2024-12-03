const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');


const app = express();
const port = 5000;

// Configurações do broker MQTT
const brokerUrl = 'mqtt://broker.hivemq.com';
const topic = 'jorgenerico'; // Altere para o tópico desejado

// Conexão com o broker MQTT
const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on('connect', () => {
    console.log('Conectado ao broker MQTT');
});

mqttClient.on('error', (err) => {
    console.error('Erro ao conectar ao broker MQTT:', err);
});

// Middleware para parsear JSON no corpo da requisição
app.use(bodyParser.json());

// Rota POST para enviar mensagem ao tópico MQTT
app.post('/publish', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send({ error: 'O campo "message" é obrigatório.' });
    }

    mqttClient.publish(topic, message, (err) => {
        if (err) {
            console.error('Erro ao publicar mensagem:', err);
            return res.status(500).send({ error: 'Erro ao publicar mensagem.' });
        }
        console.log(`Mensagem publicada no tópico ${topic}: ${message}`);
        res.send({ success: true, topic, message });
    });
});

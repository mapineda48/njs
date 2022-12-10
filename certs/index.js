const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const express = require('express');
const https = require('https');
const app = express();
const server = https.createServer({key: key, cert: cert }, app);

app.get('/', (req, res) => { res.send('this is an secure server') });
server.listen(3001, () => { console.log('listening on 3001') });
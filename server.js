const express = require('express');

const app = express();

app.use(express.static('./dist/payment-tracker'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/payment-tracker/'}),
);

app.listen(process.env.PORT || 8080);

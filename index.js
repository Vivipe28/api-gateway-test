const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/gateway', async (req, res) => {
    console.log('Request body:', req.body); // Log para verificar el cuerpo de la solicitud

    try {
        // Realiza la solicitud a la API externa
        const response = await axios.post('https://api.preveo.bocetos.co/auth/keycloak/login', {
            username: req.body.username,
            password: req.body.password
        });

        console.log('API response data:', response.data); // Log para verificar los datos de la API

        res.json({ accessToken: response.data.access_token });
    } catch (error) {
        console.error('Error during API request:', error.message); // Log del error
        res.status(500).send('Error en la autenticación xd');
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

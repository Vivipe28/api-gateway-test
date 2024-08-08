const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/gateway', async (req, res) => {
    console.log('Request body:', req.body); // Log para verificar el cuerpo de la solicitud

    try {
        // Realiza la solicitud a la API externa para obtener el token
        const tokenResponse = await axios.post('https://api.preveo.bocetos.co/auth/keycloak/login', {
            username: req.body.username,
            password: req.body.password
        });

        console.log('Token response data:', tokenResponse.data); // Log para verificar los datos del token

        const token = tokenResponse.data.data.access_token;

        // if (!token) {
        //     return res.status(500).send('Error en la autenticación: Token no recibido');
        // }

        // Realiza la solicitud GET usando el token obtenido
        const dataResponse = await axios.get('https://api.preveo.bocetos.co/vg16get_info_update/beeff9c2-ae1e-4fad-8265-26030bb89c9d', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Data response status:', dataResponse.status);
        console.log('Data response data:', dataResponse.data);

        // Enviar los datos obtenidos como respuesta
        res.json(dataResponse.data);

    } catch (error) {
        console.error('Error during API request:', error.message); // Log del error
        res.status(500).send('Error al procesar la solicitud');
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
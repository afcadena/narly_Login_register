import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const registerRequest = async (values) => {
    try {
        const response = await axios.post(`${API_URL}/register`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Register response data:', response.data);  // Mostrar datos en la consola
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const loginRequest = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Login response data:', response.data);  // Mostrar datos en la consola
        return response.data;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        throw error;
    }
};

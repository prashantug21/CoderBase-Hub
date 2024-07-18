const axios = require('axios');

async function codechef(handle) {
    const url = `https://codechef-api.vercel.app/${handle}`;

    try {
        const response = await axios.get(url);

        if (response.data.success === false) {
            return "User not found";
        }

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return "Error fetching data";
    }
}

module.exports =  codechef ;

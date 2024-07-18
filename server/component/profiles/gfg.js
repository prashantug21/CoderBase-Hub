const gfg =async (handle) => {
    const url=`https://geeks-for-geeks-stats-api.vercel.app/?raw=Y&userName=${handle}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {   
        console.error('Error:', error);
        return "Error fetching data";
    }
}

module.exports =  gfg;
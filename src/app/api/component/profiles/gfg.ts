import axios from 'axios';

const gfg =async (handle:string) => {
    const url=`https://geeks-for-geeks-stats-api.vercel.app/?raw=Y&userName=${handle}`

    try {
        const response = await axios.get(url);
        const data = await response.data;
        return {
            // data:data,
            handle: handle,
            easy:data.Easy+data.Basic,
            medium:data.Medium,
            hard:data.Hard
        };

    } catch (error) {   
        console.error('Error:', error);
        return "Error fetching data";
    }
}

export default  gfg;
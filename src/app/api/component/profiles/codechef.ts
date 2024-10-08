import axios from 'axios';

interface CodeChefData {
  rating: number;
  handle: string;
  history: any[]; // Adjust this type based on the structure of ratingData
}

const codechef = async (handle: string): Promise<CodeChefData | string> => {
  const url = `https://codechef-api.vercel.app/${handle}`;

  try {
    const response = await axios.get(url);

    if (response.data.success === false) {
      return "User not found";
    }

    return {
      rating: response.data.highestRating,
      handle: handle,
      history: response.data.ratingData,
    };
  } catch (error: any) {
    console.error('Error:', error);
    return "Error fetching data";
  }
};

export default codechef;

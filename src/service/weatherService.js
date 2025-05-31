import axios from "axios";

const API_KEY = import.meta.env.VITE_IPSTACK_API_KEY;

export const getWeatherData = async (ip = "134.201.250.155") => {
  try {
    const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Default export (optional)
export default getWeatherData;

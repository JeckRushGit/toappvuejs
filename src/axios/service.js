import axios from 'axios';
const XKCD_API_URL = 'http://localhost:3000/xkcd';

export const getXKCDComic = async (comicNumber) => {
    try {
        const response = await axios.get(`${XKCD_API_URL}/${comicNumber}`,);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch XKCD comic.');
    }
};
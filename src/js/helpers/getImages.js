import { createClient } from 'pexels';

const client = createClient('563492ad6f9170000100000178405c376a004403b407dc7646fb95de');

const getImages = async (query, page = 1, per_page = 3) => client.photos.search({ query, per_page, page })

export default getImages;


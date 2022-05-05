import { createClient } from 'pexels';

const client = createClient('563492ad6f91700001000001ba77f3b2d3dd465e9629fe1deed5a3d0');

const getImages = async (query) => client.photos.search({ query, per_page: 1 })

export default getImages;


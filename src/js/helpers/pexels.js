import { createClient } from 'pexels';

const client = createClient('563492ad6f9170000100000178405c376a004403b407dc7646fb95de');

const getImages = async (query, page = 1, per_page = 20) => client.photos.search({ query, per_page, page })

const getImage = async (id) => client.photos.show({ id })

const getImagesById = async (ids) => Promise.all(ids.map((id) => getImage(id) ))

export {
  getImages,
  getImage,
};


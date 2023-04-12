import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Client for retrieving, creating and patching data from Sanity; Interact with project's Content Lake
export const client = createClient({
  projectId: 'sn2ngjrn',
  dataset: 'production',
  apiVersion: '2023-03-11',
  useCdn: false,
  withCredentials: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);

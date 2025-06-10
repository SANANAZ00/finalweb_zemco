// // src/lib/sanity.ts
// import createClient from '@sanity/client';
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'anzswmf4', // Replace with your Sanity project ID
  dataset: 'production', // or your dataset name
  useCdn: true,
});



import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-06-19',
  useCdn: false, // `false` if you want to ensure fresh data
  token: process.env.SANITY_API_READ_TOKEN,
}); 
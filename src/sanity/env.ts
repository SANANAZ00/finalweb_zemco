export const apiVersion = '2024-06-19';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === '') {
    throw new Error(errorMessage);
  }
  return v;
}

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing NEXT_PUBLIC_SANITY_PROJECT_ID'
);

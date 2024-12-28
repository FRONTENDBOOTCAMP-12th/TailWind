import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_API_URL);

export const fileUrl = import.meta.env.VITE_PRODUCT_FILE_URL;

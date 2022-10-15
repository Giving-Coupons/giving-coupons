import imageCompression from 'browser-image-compression';
import { Base64String } from '../types/base64';
import { MAX_IMAGE_SIZE_MB } from './constants';

const imageCompressionOptions = Object.freeze({
  maxSizeMB: MAX_IMAGE_SIZE_MB,
  useWebWorker: true,
});

// Adapted from https://github.com/0dy553y/odyssey/blob/master/frontend/src/utils/file.ts
export const compressImageThenConvertToBase64String = async (file: File): Promise<Base64String> => {
  const compressedFile = await imageCompression(file, imageCompressionOptions);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);

    reader.onload = async () => {
      if (reader.result === null) {
        throw new Error('Please re-upload your image file!');
      }

      resolve(reader.result.toString());
    };

    reader.onerror = (error) => reject(error);
  });
};

// import axios from 'axios';
// import fs from 'fs'; // For Node.js environments
// import { saveAs } from 'file-saver'; // For browser downloads

// // For Node.js environments (backend)
// interface DownloadOptions {
//   uri: string;
//   filename: string;
//   onComplete?: () => void;
//   onError?: (error: Error) => void;
// }

// // For Browser environments (frontend)
// interface BrowserDownloadOptions {
//   url: string;
//   filename: string;
// }

// // Node.js File Download (for server-side)
// export const downloadFile = async ({
//   uri,
//   filename,
//   onComplete,
//   onError
// }: DownloadOptions): Promise<void> => {
//   try {
//     const response = await axios.get(uri, { responseType: 'stream' });
//     const writer = fs.createWriteStream(filename);

//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on('finish', () => {
//         onComplete?.();
//         resolve();
//       });
//       writer.on('error', (err) => {
//         onError?.(err);
//         reject(err);
//       });
//     });
//   } catch (err) {
//     onError?.(err as Error);
//     throw err;
//   }
// };

// // Browser File Download (for client-side)
// export const downloadInBrowser = async ({
//   url,
//   filename
// }: BrowserDownloadOptions): Promise<void> => {
//   try {
//     const response = await axios.get(url, { responseType: 'blob' });
//     saveAs(response.data, filename);
//   } catch (err) {
//     console.error('Download failed:', err);
//     throw err;
//   }
// };

// // Optional: Environment-agnostic download function
// export const download = (typeof window === 'undefined')
//   ? downloadFile 
//   : downloadInBrowser;
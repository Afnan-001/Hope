// import { download } from "./utilities";
// import { TwitterApi } from 'twitter-api-v2';

// const tweetWithCallback = (callback?: (error?: Error) => void): void => {
//     const uri = "https://i.imgur.com/Zl2GLjnh.jpg";
//     const filename = "image.png";

//     download(uri, filename, async (downloadError?: Error) => {
//         if (downloadError) {
//             callback?.(downloadError);
//             return;
//         }

//         try {
//             const twitterClient = new TwitterApi({ /* credentials */ });
//             const mediaId = await twitterClient.v1.uploadMedia(filename);
//             await twitterClient.v2.tweet({
//                 text: "Hello world! This is an image in Ukraine!",
//                 media: { media_ids: [mediaId] }
//             });
//             callback?.();
//         } catch (e) {
//             callback?.(e as Error);
//         }
//     });
// };

// // Usage
// tweetWithCallback((error) => {
//     if (error) console.error("Error:", error);
//     else console.log("Success!");
// });
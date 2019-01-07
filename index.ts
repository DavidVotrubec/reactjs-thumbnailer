import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { BucketArgs } from "@pulumi/aws/s3";
import * as cloud from "@pulumi/cloud-aws";
import { BucketHandlerArgs } from "@pulumi/cloud";

// TODO:
// 1) Create bucket for videos and thumbnails
// 2) Create bucket for web app which will upload videos
// 3) Create lambda which will trigger on video upload
// 4] this lambda will trigger task to generate thumbnails
// 5] and uploads them to given folder in bucket
// 6] notify web app that it is uploaded


const video = require("./video-label-processor");

// A bucket to store videos and thumbnails.
const bucket = new cloud.Bucket("bucket");
const bucketName = bucket.bucket.id;

// A task which runs a containerized FFMPEG job to extract a thumbnail image.
const ffmpegThumbnailTask = new cloud.Task("ffmpegThumbTask", {
    build: "./docker-ffmpeg-thumb",
    memoryReservation: 512,
});

// Use module for processing video through Rekognition
// TODO: Maybe later
// const videoProcessor = new video.VideoLabelProcessor();

// When a new video is uploaded, start Job to get the video length
// TODO: Inspired by https://aws.amazon.com/blogs/compute/extracting-video-metadata-using-lambda-and-mediainfo/
bucket.onPut("onNewVideo", (bucketArgs: BucketHandlerArgs) => {
    console.log(`*** New video: file ${bucketArgs.key} was uploaded at ${bucketArgs.eventTime}.`);
    
    // TODO: Get video length and determine framePos for X images in the same interval
    // TODO: Maybe generate animated gif from those thumbnails (sounds like fun)
    // launch ffmpeg in a container, use environment variables to connect resources together
    ffmpegThumbnailTask.run({
        environment: {
            "S3_BUCKET":   bucketName.get(),
            "INPUT_VIDEO": file,
            "TIME_OFFSET": framePos,
            "OUTPUT_FILE": thumbnailFile,
        },
    }).then(() => {
        console.log(`*** Launched thumbnailer task.`);
    });

    return Promise.resolve();
}, { keySuffix: ".mp4" });  // run this Lambda only on .mp4 files
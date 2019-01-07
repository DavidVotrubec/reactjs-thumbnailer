import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as s3 from "@pulumi/aws/s3";
import * as cloud from "@pulumi/cloud-aws";
import { BucketHandlerArgs } from "@pulumi/cloud";

// Native AWS SDK package, no Pulumi. I need this because Pulumi does not know s3.getSignedUrl()
import * as aws_sdk from 'aws-sdk';

// TODO:
// 1) Create bucket for videos and thumbnails
// 2) Create bucket for web app which will upload videos
// 3) Create lambda which will trigger on video upload
// 4] this lambda will trigger task to generate thumbnails
// 5] and uploads them to given folder in bucket
// 6] notify web app that it is uploaded


// const video = require("./video-label-processor");

// A bucket to store videos and thumbnails.
const bucket = new cloud.Bucket("bucket");
const bucketName = bucket.bucket.id;

const videoMetaDataTask = new cloud.Task("videoMetaDataTask", {
    build: "./mediainfo",
    memoryReservation: 512,
});

// TODO: Maybe later - Use module for processing video through Rekognition
// const videoProcessor = new video.VideoLabelProcessor();

// When a new video is uploaded, start Job to get the video length
// TODO: Inspired by https://aws.amazon.com/blogs/compute/extracting-video-metadata-using-lambda-and-mediainfo/
bucket.onPut("onNewVideo", (bucketArgs: BucketHandlerArgs) => {
    console.log(`*** New video: file ${bucketArgs.key} was uploaded at ${bucketArgs.eventTime}.`);

    // Seems that the "getSignedUrl" is not supported by Pulumi/TerraForm
    // So I am using AWS SDK package
    const s3 = new aws_sdk.S3();

    const presignedUrl = s3.getSignedUrl('getObject', {
        Bucket: bucketName.get(),
        Key: bucketArgs.key,
        Expires: 1000,
    });

    console.log('presignedUrl is', presignedUrl);
    
    // TODO: Get video length and determine framePos for X images in the same interval
    // TODO: Maybe generate animated gif from those thumbnails (sounds like fun)
    // launch ffmpeg in a container, use environment variables to connect resources together
    videoMetaDataTask.run({
        environment: {
            "S3_BUCKET": bucketName.get(), // Where to upload the result
            "VIDEO_URL": presignedUrl
        },
    }).then((data) => {
        console.log(`*** Launched thumbnailer task.`, data);
    });

    return Promise.resolve();
}, { keySuffix: ".mp4" });  // run this Lambda only on .mp4 files
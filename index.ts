import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// TODO:
// 1) Create bucket for videos and thumbnails
// 2) Create bucket for web app which will upload videos
// 3) Create lambda which will trigger on video upload
// 4] this lambda will trigger task to generate thumbnails
// 5] and uploads them to given folder in bucket
// 6] notify web app that it is uploaded


const bucket = new aws.s3.Bucket("reactjs-thumbnailer-bucket", {
    serverSideEncryptionConfiguration: {
        rule: {
            applyServerSideEncryptionByDefault: {
                sseAlgorithm: "AES256",
            },
        },
    },
    forceDestroy: true,
});

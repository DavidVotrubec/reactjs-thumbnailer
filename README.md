
# Video Thumbnailer
## This is learning project to learn ReactJS and AWS

## Technologies used
1. [AWS Amplify](https://aws-amplify.github.io/docs/js/react)
1. [React components for Semantic UI](https://react.semantic-ui.com/)
1. Dockerized MediaInfo binary with curl support. Used to extract media info from videos uploaded to S3. I did not use https://hub.docker.com/r/jlesage/mediainfo because it seems not have support for curl access, I did not find it there.
1. TODO: Store mediainfo ni DynamoDB

## Prerequisities
Configururation:
1. `pulumi config set aws:region eu-west-1` // Because of Fargate
1. `pulumi config set cloud-aws:useFargate true`
1. `pulumi plugin install resource aws v0.16.5`

## Problems encountered
1. I can not use recommended approach for uploading via `amplify publish`. I've created the user, and assigned it grants, but it still fails to create S3 bucket, even when it has policy "s3:CreateBucket". Fun-fucking-tastic ...
1. I've updated `aws-info.json` file to use older profile named `serverless-agent`. Note that the profile used in first step was `amplify-thumbnailer`, and it had the same exact grants, but failed to upload to S3. Da fuck is that?
1. So when I tried `amplify publish` with that profile, it failed with error `error: uncaughtException: Cannot read property 'HostingBucketName' of undefined `
Ach jo.... tohle je na hovno.

S profilem `serverless-agent` to zase padalo na chybě, že `missing region in config`. Pomohlo přidat ho do ~/.aws/credentials. Ale je to teda oser, dohledávat možné příčiny...

```

CREATE_IN_PROGRESS DeploymentBucket AWS::S3::Bucket Fri Dec 28 2018 15:53:36 GMT+0100 (GMT+01:00)
CREATE_IN_PROGRESS AuthRole         AWS::IAM::Role  Fri Dec 28 2018 15:53:36 GMT+0100 (GMT+01:00)
CREATE_IN_PROGRESS UnauthRole       AWS::IAM::Role  Fri Dec 28 2018 15:53:36 GMT+0100 (GMT+01:00)
CREATE_IN_PROGRESS UnauthRole       AWS::IAM::Role  Fri Dec 28 2018 15:53:37 GMT+0100 (GMT+01:00) Resource creation Initiated
CREATE_IN_PROGRESS DeploymentBucket AWS::S3::Bucket Fri Dec 28 2018 15:53:37 GMT+0100 (GMT+01:00) Resource creation Initiated
CREATE_IN_PROGRESS AuthRole         AWS::IAM::Role  Fri Dec 28 2018 15:53:37 GMT+0100 (GMT+01:00) Resource creation Initiated
/ Initializing project in the cloud...

CREATE_COMPLETE UnauthRole                        AWS::IAM::Role             Fri Dec 28 2018 15:53:54 GMT+0100 (GMT+01:00)
CREATE_COMPLETE AuthRole                          AWS::IAM::Role             Fri Dec 28 2018 15:53:55 GMT+0100 (GMT+01:00)
CREATE_COMPLETE DeploymentBucket                  AWS::S3::Bucket            Fri Dec 28 2018 15:53:58 GMT+0100 (GMT+01:00)
CREATE_COMPLETE reactjsthumbnailer-20181228155335 AWS::CloudFormation::Stack Fri Dec 28 2018 15:54:01 GMT+0100 (GMT+01:00)
√ Successfully created initial AWS cloud resources for deployments.

Your project has been successfully initialized and connected to the cloud!

Some next steps:
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify <category> add" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:
Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything


Select the environment setup: DEV (S3 only with HTTP)
hosting bucket name reactjsthumbnailer-20181228155548-hostingbucket
index doc for the website index.html
error doc for the website index.html
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

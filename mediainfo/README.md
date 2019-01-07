The MediaInfo binaries were compiled in Ubuntu in Docker using these steps: https://gist.github.com/antoineclaval/789206f48f5c1d3cd5f1b8e6c9d85263
But with the latest version of MediaInfo
I have then used the compiled binaries as a basis for my Ubuntu based Docker image

TODO: Upload to DockerHub

When you want to override entrypoint, then do this
`docker run --entrypoint "/mediainfo" mediainfocurl --full --output=JSON http://diary.davidjs.com/wp-content/uploads/2016/05/Airplane.mp4`
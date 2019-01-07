FROM ubuntu
RUN apt-get update
RUN apt-get -y install libcurl4-openssl-dev

COPY mediainfo /mediainfo

# Extract mediainfo
# Because of how Docker "handles" command line arguments, I can not pass them here
# The last argument (url of video) needs to be read from the ENV variable
# EXAMPLE
#
# docker run -e VIDEO_URL=http://diary.davidjs.com/wp-content/uploads/2016/05/Airplane.mp4 mediainfocurl
ENTRYPOINT /mediainfo --full --output=JSON ${VIDEO_URL}
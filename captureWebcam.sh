#!/bin/bash

#ipcam o droid cam
SOURCE="http://192.168.1.4:4747/video"

#codec libfaac bitrate de 160000
AUDIO_CONFIG="-c:a libfaac -b:a 160000 -ac 2"

#size, codec de video x264 bitrate 800000 
VIDEO_CONFIG="-s 640x320 -c:v libx264 -b:v 800000"

#demux de 10 segundos, hasta 10 archivos ts
OUTPUT_HLS="-hls_time 10 -hls_list_size 10 -start_number 1"

ffmpeg -i "$SOURCE" -y $AUDIO_CONFIG $VIDEO_CONFIG $OUTPUT_HLS mystream.m3u8
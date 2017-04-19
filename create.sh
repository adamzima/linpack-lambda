#!/bin/bash

sizes=(128 192 256 320 384 448 512 576 640 704 768 832 896 960 1024 1088 1152 1216 1280 1344 1408 1472 1536)
for i in "${sizes[@]}"
do
   aws lambda create-function --function-name linpack_$i --runtime nodejs6.10 --role arn:aws:iam::134228212876:role/service-role/api-gateway-role --handler index.handler --timeout 300 --memory-size $i --zip-file fileb://linpack.zip
done

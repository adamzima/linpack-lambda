#!/bin/bash

zip linpack.zip *
echo "linpack.zip created"

sizes=(128 192 256 320 384 448 512 576 640 704 768 832 896 960 1024 1088 1152 1216 1280 1344 1408 1472 1536)
for i in "${sizes[@]}"
do
   aws lambda update-function-code --function-name linpack_$i --zip-file  fileb://linpack.zip
done

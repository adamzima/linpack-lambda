#!/bin/bash

zip linpack.zip *
echo "linpack.zip created"
aws lambda update-function-code --function-name linpack --zip-file  fileb://linpack.zip

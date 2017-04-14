'use strict';
const AWS = require('aws-sdk');
const exec = require('child_process').exec;
const fs = require('fs');

exports.handler = (event, context) => {
    exec("./runme_xeon64", (error, stdout, stderr) => {
      var s3 = new AWS.S3();

      s3.putObject({
        Bucket: 'agajek-lambda',
        Key: 'linpack.txt',
        Body: stdout,
        ACL: 'public-read'
      },function (resp) {
        console.log('Successfully uploaded package.');
        context.succeed(stdout);
      });
    });
};

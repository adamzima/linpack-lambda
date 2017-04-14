'use strict';
const AWS = require('aws-sdk');
const exec = require('child_process').exec;

exports.handler = (event, context) => {
  exec("./runme64", (error, stdout, stderr) => {
    let s3 = new AWS.S3({ signatureVersion: 'v4' });

    s3.putObject({
      Bucket: 'agajek-lambda',
      Key:  event.dir + "/linpack",
      Body: stdout,
      ACL: 'public-read'
    }, s3Callback);

  });

  function s3Callback(err, resp) {
    if(err) {
      console.log(err);
      context.fail(err.message);
    } else {
      console.log('Successfully uploaded package.');
      context.succeed(resp);
    }
  }
};

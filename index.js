'use strict';
const AWS = require('aws-sdk');
const exec = require('child_process').exec;

exports.handler = (event, context) => {
  const start = Date.now();

  exec("./runme64", (error, stdout, stderr) => {
    const s3 = new AWS.S3({ signatureVersion: 'v4' });

    const end = Date.now();
    const diff = end - start
    const output = stdout + start + " " + end + " " + diff.toString();

    s3.putObject({
      Bucket: 'agajek-lambda',
      Key: event.dir + "/linpack",
      Body: output,
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

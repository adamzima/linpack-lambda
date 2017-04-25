'use strict';
const AWS = require('aws-sdk');
const exec = require('child_process').exec;

exports.handler = (event, context) => {
  const start = Date.now();
  const s3 = new AWS.S3({ signatureVersion: 'v4' });

  exec("./runme64", (error, stdout, stderr) => {
    const end = Date.now();
    const diff = end - start;

    const rows = stdout.split("\n")
    const row = rows[rows.length - 8];
    const flops = parseFloat(row.split(/[\s,]+/)[4]);

    const output = flops + " " + start + " " + end + " " + diff;
    const filePath = event.experiment + "/" +
     context.memoryLimitInMB + "/" + event.name;

    s3.putObject({
      Bucket: 'agajek-lambda',
      Key: filePath,
      Body: output,
      ACL: 'public-read'
    }, callback(output));
  });

  function callback(output) {
    return (err, resp) => {
      if(err) {
        console.log(err);
        context.fail(err.message);
      } else {
        console.log('Successfully uploaded package.');
        context.succeed(output);
      }
    }
  }
};

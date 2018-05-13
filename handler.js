
'use strict'

const AWS = require('aws-sdk');

module.exports.requestUploadURL = (event, context, callback) => {
  const s3 = new AWS.S3();
  const params = JSON.parse(event.body);

  const s3Params = {
    Bucket: 'image-hoster',
    Key:  params.name,
    ContentType: params.type,
    ACL: 'public-read',
  };

  const uploadURL = s3.getSignedUrl('putObject', s3Params);

  callback(null, {
    statusCode: 200,
    headers: {
      // TODO: change this for production
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}
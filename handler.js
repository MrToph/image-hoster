"use strict";

const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const allowedOrigins = ['http://localhost:3000', 'https://kingofeos.com']

module.exports.requestUploadURL = (event, context, callback) => {
  const s3 = new AWS.S3();
  const params = JSON.parse(event.body);
  const origin = event.headers.origin
  if(!allowedOrigins.some(o => o === origin)) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: `Your domain "${origin}" is not allowed to access this resource.` })
    });
  }

  const fileName = `${uuidv4()}-${params.name}`;
  const s3Params = {
    Bucket: "image-hoster",
    Key: fileName
  };

  s3.headObject(s3Params, function(err, metadata) {
    if (err && err.code === "NotFound") {
      // here image has not been uploaded already, because we got an error.code 'NotFound'
      const s3UploadParams = Object.assign(
        {
          ContentType: params.type,
          ACL: "public-read"
        },
        s3Params
      );
      const uploadURL = s3.getSignedUrl("putObject", s3UploadParams);

      return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": `${origin}`
        },
        body: JSON.stringify({ uploadURL: uploadURL, fileName: fileName })
      });
    } else {
      return callback(null, {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": `${origin}`
        },
        body: JSON.stringify({ error: err || `Object already exists` })
      });
    }
  });
};

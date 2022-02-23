import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  });

  async uploadFile(file) {
    const { mimetype, originalname } = file;
    const format = originalname.split('.').reverse()[0];

    const url = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      `${uuidv4()}.${format}`,
      mimetype,
    );

    return url || '';
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_S3_REGION,
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response?.Location;
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}

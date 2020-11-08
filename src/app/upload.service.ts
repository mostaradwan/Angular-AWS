import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  FOLDER = 'pictures/';

  bucket = new S3(
    {
      accessKeyId: 'AKIAJK7ZEEHMSD3RMIKQ',
      secretAccessKey: '\'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',
      region: 'ap-south-1'
    }
  );

  constructor() { }

  uploadfile(file) : Observable<any>{
    return new Observable(
      observer =>{
        const params = {
          Bucket: 'userimages-project-aws',
          Key: this.FOLDER + file.name,
          Body: file
        };

        this.bucket.upload(params, function (err, data) {
          if (err) {
            observer.error(err);
          }
          else{
            observer.next(data);
          }
        });
      }
    )
  }
}








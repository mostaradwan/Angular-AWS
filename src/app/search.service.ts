import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { stringList } from 'aws-sdk/clients/datapipeline';
import { stringType } from 'aws-sdk/clients/iam';
import { AnyAaaaRecord } from 'dns';
import { String } from 'aws-sdk/clients/acm';
import { Observable, from, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  files: any[];
  filesObservable: Observable<any[]>;

  bucket;
  params;

  constructor() {
    this.files = new Array();
  }

  listAllFiles(): Observable<any[]> {

    return new Observable(
      observer => {
        let bucket = new S3(
          {
            accessKeyId: 'AKIAJK7ZEEHMSD3RMIKQ',
            secretAccessKey: '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',
            region: 'ap-south-1'
          }

        );

        let params = {
          Bucket: 'userimages-project-aws',

        };

        bucket.listObjects(params, function (err, data) {
          if (err) {
            observer.error('Error occured while fetching objects ');
          }
          else {
            this.files = data.Contents
              .filter(currentFile => { return currentFile.Key.toString().includes("pictures/") && currentFile.Size !=0})
              .map(currentFile => {
                let file = {};
                file['fileName'] = currentFile.Key.toString().replace('pictures/','');
                file['url'] = "https://userimages-project-aws.s3.ap-south-1.amazonaws.com/" + currentFile.Key;
                return file;
              });

            observer.next(this.files);
          }
        });
      }
    )
  }
}

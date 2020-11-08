import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { SearchService } from '../search.service';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.css']
})
export class ImguploadComponent implements OnInit {

  selectedFiles: FileList;
  showError : boolean;
  retrievedFiles: any[];
  files: any[];
  errorText : string;
  uploadDocuemtFailed : boolean;
  uploadDocumentMessage : string;
 
  constructor(private uploadService: UploadService,private searchService : SearchService) {
    this.files = new Array();
    /* this.fileNamesList.push("Sample 1");
    this.fileNamesList.push("Sample 2"); */

   }
  
  ngOnInit(): void {
  }
  
  upload() {
    this.uploadService.uploadfile(this.selectedFiles.item(0)).subscribe(
      response => {
        this.uploadDocuemtFailed = false;
        this.uploadDocumentMessage = 'Successfully Uploaded Image : '+response.Key;
      },
      errorResponse => {
        this.uploadDocuemtFailed = true;
        this.uploadDocumentMessage = 'Failed to upload Image : '+ this.selectedFiles.item(0).name;
      }
    );
  }

  selectFile(event) {
    this.showError = false;
    this.errorText = '';
    this.uploadDocuemtFailed = false;
    this.uploadDocumentMessage = '';
    this.selectedFiles = event.target.files;
    
    const file  = this.selectedFiles.item(0);
    if(file.type === 'image/png' || file.type === 'image/jpeg'){
      this.showError = false;
    }
    else{
      this.errorText = 'Please Upload document of PNG or JPEG format';
      this.showError = true;
    }
      
    if(file.size >= 500*1000){
      this.showError = true;
      this.errorText = 'Document Size should not exceed 500 KB';
    }

  }

  viewFiles(){
    this.searchService.listAllFiles().subscribe(
      data => {this.files = data, console.log(this.files)},
      error => console.log(error)
    );
    
  }

}

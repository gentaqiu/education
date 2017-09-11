import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(IFrameDialog);
  }  
}

@Component({
  selector: 'demo-iframe-dialog',
  styles: [
    `iframe {
      width: 800px;
    }`
  ],
  template: `
    <form class="example-form">
      <md-form-field class="example-full-width">
        <input #username mdInput placeholder="Username" value="">
      </md-form-field>
      <p>
      <md-form-field class="example-full-width">
        <input #password mdInput type="password" placeholder="Password" value="">
      </md-form-field>
      </p>
      <p>
      <md-form-field class="example-full-width">
        <input #repeat_password mdInput type="password" placeholder="Repeat Password" value="">
      </md-form-field>   
      </p>  
      <p>
        <button md-raised-button (click)="onConfirmClick(username.value,password.value,repeat_password.value)">Confirm</button>
        <button md-raised-button (click)="onCancelClick()">Cancel</button>
      </p>        
      <p class="alert_message">
        {{alert_message}}
      </p>

    </form>
  `
})
export class IFrameDialog {
  alert_message:string;
  constructor(
    public dialogRef: MdDialogRef<IFrameDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { 
      this.alert_message = "";
    }

  onConfirmClick(username:string,password:string,repeat_password:string): void {
    if(password != repeat_password) {
      console.log("no correct");
      this.alert_message = "Passwords Do Not Match!";
    }
    else {
      this.dialogRef.close();
    }
    
  }


  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  }
}
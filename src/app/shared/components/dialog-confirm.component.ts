import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogConfirm} from "../../models/dialog";

@Component({
  selector: 'sf-dialog-confirm',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>

    <div mat-dialog-content>
      {{data.content}}
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">{{data.cancelLabel}}</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>{{data.confirmLabel}}</button>
    </div>
  `,
  styles: []
})
export class DialogConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogConfirm) {
  }

  ngOnInit(): void {
  }

}

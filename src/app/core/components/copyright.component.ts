import {Component, OnInit} from '@angular/core';
import {MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'sf-copyright',
  template: `
    <div>
      <span>Written with 💕 by ailequal.</span>
    </div>

    <div class="text-right">
      <a
        href="https://github.com/ailequal/sf-quotes"
        target="_blank"
        mat-button
        (click)="handleClickSource($event)"
      >
        Source
      </a>

      <a
        href="https://www.ailequal.com"
        target="_blank"
        mat-raised-button
        color="primary"
        (click)="handleClickWebsite($event)"
      >
        Website
      </a>
    </div>
  `,
  styles: []
})
export class CopyrightComponent implements OnInit {

  constructor(private _snackBarRef: MatSnackBarRef<CopyrightComponent>,) {
  }

  ngOnInit(): void {
  }

  handleClickSource($event: MouseEvent) {
    this._snackBarRef.dismiss();
  }

  handleClickWebsite($event: MouseEvent) {
    this._snackBarRef.dismiss();
  }

}

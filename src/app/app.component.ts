import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-root',
  template: `
    <sf-toolbar></sf-toolbar>

    <sf-container>
      <router-outlet></router-outlet>
    </sf-container>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

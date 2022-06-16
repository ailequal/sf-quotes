import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-root',
  template: `
    <sf-toolbar></sf-toolbar>

    <div sfContainer>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

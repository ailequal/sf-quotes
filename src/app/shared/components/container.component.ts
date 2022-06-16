import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-container',
  template: `
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class ContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

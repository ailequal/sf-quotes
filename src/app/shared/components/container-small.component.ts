import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-container-small',
  template: `
    <div class="max-w-4xl w-full sm:w-4/6 mx-auto px-2 sm:px-6 lg:px-8">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class ContainerSmallComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[sfContainer]'
})
export class ContainerDirective {

  @HostBinding() class = 'max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8';

  constructor() { }

}

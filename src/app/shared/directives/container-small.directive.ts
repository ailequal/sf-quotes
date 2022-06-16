import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[sfContainerSmall]'
})
export class ContainerSmallDirective {

  @HostBinding() class = 'max-w-4xl w-full sm:w-4/6 mx-auto px-2 sm:px-6 lg:px-8';

  constructor() { }

}

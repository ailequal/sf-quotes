import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EqualFieldsValidatorDirective} from "./equal-fields.validator";

@NgModule({
  declarations: [
    EqualFieldsValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [EqualFieldsValidatorDirective]
})
export class ValidatorsModule {
}

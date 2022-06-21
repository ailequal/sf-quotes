import {MatSnackBarConfig} from "@angular/material/snack-bar";

// TODO: Seems like it's possible to define a global snackbar configuration defaults:
//  @link https://v13.material.angular.io/components/snack-bar/overview#setting-the-global-configuration-defaults
// TODO: When a snackbar is visualized, the body get the style "cursor: pointer" automatically applied. Why??!

export const snackBarConfiguration: MatSnackBarConfig<any> = {
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  duration: 3000
}

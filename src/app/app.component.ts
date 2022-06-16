import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-root',
  template: `
    <mat-drawer-container class="h-screen" autosize>

      <mat-drawer #drawer class="w-[280px] p-8" mode="over">
        <p>TODO: Write the real menu navigation.</p>
      </mat-drawer>

      <div>
        <sf-toolbar (onClickMenu)="drawer.toggle()"></sf-toolbar>

        <div class="my-8" sfContainer>
          <router-outlet></router-outlet>
        </div>
      </div>

    </mat-drawer-container>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

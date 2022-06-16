import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-debug',
  template: `
    <p>
      debug works!
    </p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar elit at suscipit iaculis. Sed semper
      tincidunt dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ullamcorper
      varius nisi, nec sagittis velit ultrices nec. In et congue est, eu euismod dui. Mauris mi lacus, congue sed augue
      id, pharetra imperdiet erat. Nulla facilisis et urna efficitur viverra.</p>

    <p>Aenean placerat consectetur urna id vulputate. Curabitur ipsum nunc, bibendum id fringilla et, laoreet in nunc.
      Phasellus erat mi, auctor ultrices iaculis at, iaculis porta quam. Phasellus pulvinar tristique nunc non
      hendrerit. Integer consectetur urna nisl, non viverra turpis malesuada sed. Sed at massa convallis, malesuada leo
      ac, porttitor nisl. Cras fermentum purus sed euismod consectetur. Maecenas quis justo at nunc lacinia laoreet quis
      ut lacus. Phasellus ut ligula lacinia, posuere ex at, pharetra leo. Proin condimentum ornare interdum. Phasellus
      auctor nisi in lectus mollis, id euismod mauris scelerisque. Praesent gravida placerat nisi, at vulputate quam
      volutpat quis. In nibh justo, aliquam quis tempus vitae, cursus vel ligula.</p>

    <p>Nam cursus, justo efficitur ullamcorper accumsan, dolor odio condimentum est, id malesuada lectus purus quis
      nulla. Praesent mollis, est sed pulvinar dignissim, sapien sapien volutpat nisi, ac cursus nunc leo vel dui. Nulla
      vel ante vitae nibh cursus interdum vel id risus. Proin mi sem, iaculis ut dignissim vitae, fringilla in tellus.
      Pellentesque finibus id lectus et pulvinar. Suspendisse feugiat dignissim eros. Sed gravida eget tortor in
      malesuada.</p>
  `,
  styles: []
})
export class DebugComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: require('./app.component.pug'),
  styles: [require('./app.component.scss')]
})
export class AppComponent implements OnInit {
  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
  }
}

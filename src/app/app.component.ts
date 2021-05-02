import { Component } from '@angular/core';

@Component({
  selector: 'product1-root',
  template:
  `
  <div>
  <h1>
  {{pageTitle}}</h1>
  <product1-products></product1-products>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Nike Product Management';
}

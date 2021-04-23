import { Component } from "@angular/core";

@Component({
  selector: 'pm-root', //Note: selector is needed only if this component is going to be nested inside another
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='nav nav-pills'>
      <li><a class='nav-link btn-primary' routerLink='/welcome'>Home</a></li> 
      <li><a class='nav-link btn-primary' routerLink='/products'>Product List</a></li>
    </ul>
  </nav>
  <div class='container-fluid'>
    <router-outlet></router-outlet>
  </div>`
}) //Note: if route doesn't have any values (parameters) don't need to use [routeLink]="['/welcome']"
  //Note: <router-outlet> is view placer - like dynamic component selector reference
export class AppComponent {
  pageTitle: string = 'Acme Product Manager'
}
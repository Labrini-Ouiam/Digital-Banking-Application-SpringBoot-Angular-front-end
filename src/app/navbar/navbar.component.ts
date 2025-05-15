import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {subscriptionLogsToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit() {
  }
}

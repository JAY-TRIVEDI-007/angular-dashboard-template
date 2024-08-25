import {Component, OnInit, signal} from '@angular/core';
import {ApiService} from '../auth/api.service';
import {BrowserService} from '../shared/services/browser.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  username = signal<string>('');

  constructor(private apiService: ApiService, private browser: BrowserService) {
  }

  ngOnInit() {
    this.username.set(this.browser.getUserName());
  }
}

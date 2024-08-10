import {Component, OnInit} from '@angular/core';
import {CommonService} from '../shared/services/common.service';
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

  constructor(private commonService: CommonService, private apiService: ApiService, private browser: BrowserService) {
  }

  ngOnInit() {
    this.commonService.headerTitle.set('Dashboard');
  }
}

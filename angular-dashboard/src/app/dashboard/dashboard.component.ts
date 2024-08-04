import {Component, inject, OnInit} from '@angular/core';
import {CommonService} from '../shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private commonService: CommonService = inject(CommonService);

  ngOnInit() {
    this.commonService.headerTitle.set('Dashboard');
  }
}

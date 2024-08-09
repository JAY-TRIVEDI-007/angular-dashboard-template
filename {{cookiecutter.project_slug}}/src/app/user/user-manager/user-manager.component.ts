import {Component, inject} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent {
  private commonService: CommonService = inject(CommonService);

  ngOnInit() {
    this.commonService.headerTitle.set('Manage Users');
  }
}

import {Component, inject} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private commonService: CommonService = inject(CommonService);

  ngOnInit() {
    this.commonService.headerTitle.set('Your Profile');
  }
}

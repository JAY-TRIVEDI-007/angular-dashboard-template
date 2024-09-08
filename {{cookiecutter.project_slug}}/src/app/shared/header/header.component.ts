import {Component, computed, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {CommonService} from '../services/common.service';
import {SideMenuItem} from '../interfaces/page.interface';
import {BrowserService} from '../services/browser.service';
import { CurrentUserInterface } from '../interfaces/auth.interface';
import { ApiService } from '../../auth/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgClass,
    NgStyle,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output()
  logoutClicked = new EventEmitter<boolean>();

  private commonService: CommonService = inject(CommonService);
  private browser: BrowserService = inject(BrowserService);
  private apiService: ApiService = inject(ApiService);

  isDrawerCollapsed = signal(false);
  isShowUserMenu = signal(false);
  headerTitle = computed(() => this.commonService.headerTitle());

  private sideNav: SideMenuItem[] = [
    {
      name: 'Home',
      link: '',
      svgPath: 'assets/icons/home.svg'
    },
    {
      name: 'Users',
      link: '/users',
      svgPath: 'assets/icons/users.svg'
    },
    {
      name: 'Profile',
      link: '/profile',
      svgPath: 'assets/icons/user-circle.svg'
    }
  ];

  sideMenuItems = signal<SideMenuItem[]>([]);

  ngOnInit() {
    this.apiService.getUserDetails()
    .subscribe((res: CurrentUserInterface) => {
      this.browser.setLocalStorageItem('user', JSON.stringify(res));
      this.sideMenuItems.set(this.getUserSpecificSideMenuItems());
    });
  }

  toggleDrawerCollapse(): void {
    this.isDrawerCollapsed.set(!this.isDrawerCollapsed());
  }

  toggleUserMenu(): void {
    this.isShowUserMenu.set(!this.isShowUserMenu());
  }

  logout(): void {
    this.toggleUserMenu();
    this.logoutClicked.emit(true);
  }

  private getUserSpecificSideMenuItems(): SideMenuItem[] {
    let menuItems: SideMenuItem[] = [];
    let userDetails = this.browser.getUserDetails();

    if (userDetails) {
      this.sideNav.forEach((item: SideMenuItem) => {
        let pathData = this.commonService.getRouteData(item.link);
        if (pathData && pathData['isOnlyAdmin'] == true) {
          if (userDetails.is_staff)
            menuItems.push(item);
        }
        else {
          menuItems.push(item);
        }
      });
    }

    return menuItems;
  }
}

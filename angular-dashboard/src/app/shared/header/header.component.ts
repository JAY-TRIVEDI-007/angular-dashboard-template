import {Component, computed, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {CommonService} from '../services/common.service';
import {SideMenuItem} from '../interfaces/page.interface';
import {BrowserService} from '../services/browser.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output()
  logoutClicked = new EventEmitter<boolean>();

  private commonService: CommonService = inject(CommonService);
  private browser: BrowserService = inject(BrowserService);
  isDrawerCollapsed = signal(false);
  isShowUserMenu = signal(false);
  headerTitle = computed(() => this.commonService.headerTitle());

  private sideNav: SideMenuItem[] = [
    {
      name: 'Home',
      link: '',
      svgPath: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
    },
    {
      name: 'Users',
      link: '/users',
      svgPath: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
    },
    {
      name: 'Profile',
      link: '/profile',
      svgPath: 'M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
    }
  ];

  sideMenuItems = signal<SideMenuItem[]>([]);

  ngOnInit() {
    this.sideMenuItems.set(this.getUserSpecificSideMenuItems());
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
          if (userDetails.is_superuser)
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

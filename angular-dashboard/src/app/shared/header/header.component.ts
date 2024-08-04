import {Component, computed, EventEmitter, inject, Output, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {CommonService} from '../services/common.service';

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
export class HeaderComponent {
  @Output()
  logoutClicked = new EventEmitter<boolean>();

  private commonService: CommonService = inject(CommonService);
  isDrawerCollapsed = signal(false);
  isShowUserMenu = signal(false);
  headerTitle = computed(() => this.commonService.headerTitle());

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
}

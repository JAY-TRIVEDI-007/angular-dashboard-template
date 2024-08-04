import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';
import {NgIf} from '@angular/common';
import {filter} from 'rxjs';
import {CommonService} from './shared/services/common.service';
import {routes} from './app.routes';
import {AuthService} from './auth/auth.service';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-dashboard';
  isShowHeaderFooter = false;

  constructor(private _router: Router, private commonService: CommonService, private authService: AuthService) {
    this.setAuthorizedViews();

    this._router.events.pipe(
       filter((e) => e instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let url = event.urlAfterRedirects.toString().replace('/', '');
        this.isShowHeaderFooter = this.commonService.authorizedViews.includes(url);
      }
    });
  }

  private setAuthorizedViews() {
    routes.forEach(route => {
      if (route.data !== undefined && route.path !== undefined)
      {
        if (route.data['isAuthorizedView'] != undefined) {
          this.commonService.authorizedViews.push(route?.path);
        }
      }
    });
  }

  logoutUser(): void {
    this.authService.logoutUser();
    this._router.navigate(['/login']);
  }
}

import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';
import {NgIf} from '@angular/common';
import {catchError, filter, throwError} from 'rxjs';
import {CommonService} from './shared/services/common.service';
import {routes} from './app.routes';
import {ApiService} from './auth/api.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserService} from './shared/services/browser.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '{{cookiecutter.project_slug}}';
  isShowHeaderFooter = false;

  constructor(private _router: Router, private commonService: CommonService, private authService: ApiService,
              private browser: BrowserService) {
    this.setAuthorizedViews();

    this._router.events.pipe(
      filter((e) => e instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let url = event.urlAfterRedirects.toString().replace('/', '');
        this.isShowHeaderFooter = this.commonService.hasHeaderViews.includes(url);
      }
    });
  }

  private setAuthorizedViews() {
    routes.forEach(route => {
      if (route.data !== undefined && route.path !== undefined) {
        if (route.data['hasHeaderView'] != undefined) {
          this.commonService.hasHeaderViews.push(route?.path);
        }
      }
    });
  }

  logoutUser(): void {
    this.authService.logoutUser()
      .pipe(
        catchError(err => {
          this.browser.clearLocalStorage();
          this._router.navigate(['/login']);
          return throwError(err.error);
        })
      )
      .subscribe(() => {
        this.browser.clearLocalStorage();
        this._router.navigate(['/login']);
      });
  }
}

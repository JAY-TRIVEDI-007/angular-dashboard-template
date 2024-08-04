import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  authorizedViews: string[] = [];
  headerTitle = signal<string>('App');

  constructor() { }
}

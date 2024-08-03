import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  authorizedViews: string[] = [];

  constructor() { }
}

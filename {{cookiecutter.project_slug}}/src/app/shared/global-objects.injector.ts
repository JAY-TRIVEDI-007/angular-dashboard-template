import {InjectionToken} from '@angular/core';

export const WINDOW: InjectionToken<Window> | null = new InjectionToken<Window | null>('Global window object', {
  factory: () => {
    return (typeof window !== "undefined") ? window : null;
  }
});

export const NAVIGATOR: InjectionToken<Navigator> | null = new InjectionToken<Navigator | null>('Global navigator object', {
  factory: () => {
    return (typeof window !== "undefined") ? window.navigator : null;
  }
});

export const LOCALSTORAGE: InjectionToken<Storage> | null = new InjectionToken<Storage | null>('Global localStorage object', {
  factory: () => {
    return (typeof window !== "undefined") ? window.localStorage : null;
  }
});

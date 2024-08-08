# Angular Dashboard project template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

{
    "headers": {
        "normalizedNames": {},
        "lazyUpdate": null
    },
    "status": 400,
    "statusText": "Bad Request",
    "url": "http://localhost:8000/api/auth/users/",
    "ok": false,
    "name": "HttpErrorResponse",
    "message": "Http failure response for http://localhost:8000/api/auth/users/: 400 Bad Request",
    "error": {
        "password": "This password is too common.",
        "success": false
    }
}

{
    "first_name": "Jay",
    "last_name": "Trivedi",
    "email": "admin@jaytrivedi.dev",
    "id": 1
}


{
    "headers": {
        "normalizedNames": {},
        "lazyUpdate": null
    },
    "status": 400,
    "statusText": "Bad Request",
    "url": "http://localhost:8000/api/auth/token/login/",
    "ok": false,
    "name": "HttpErrorResponse",
    "message": "Http failure response for http://localhost:8000/api/auth/token/login/: 400 Bad Request",
    "error": {
        "non_field_errors": "Unable to log in with provided credentials.",
        "success": false
    }
}

{
    "auth_token": "645bfc51439a9296edf42bd36a1b3197b6223019"
}

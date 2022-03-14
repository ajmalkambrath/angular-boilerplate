# Angular Boilerplate

## About Angular Boilerplate
A web suite developed in Angular 13 framework.

## Tech Stack
Angular 13
Bootstrap 5
Material Design
SCSS

## Development server

Run `npm install` once then `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

├───app
│   ├───common
|   |   ├───components
│   │   ├───directives
│   │   ├───guards
│   │   ├───interceptors
│   │   ├───layout
│   │   │   ├───footer
│   │   │   └───header
│   │   ├───models
│   │   ├───pipes
│   │   ├───services
│   │   │   └───http.service
│   │   ├───validators
│   │   ├───api-endpoints
│   │   └───common-app.module.ts
│   ├───modules
│       ├───auth
│       │   ├───components
│       │   ├───auth-routing.module
│       │   ├───auth-constants.ts
│       │   └───auth.module.ts
│       ├───dashboard
│       │   ├───components
│       │   └───services
│       │   │       ├───dashboard.service.spec
│       │   │       └───dashboard.service.ts
│       │   ├───dashboard-routing.module
│       │   ├───dashboard-constants.ts
│       │   └───dashboard.module.ts
│       ├───app-routing.module
│       ├───app.components.ts
│       ├───app.components.scss
│       ├───app.module.ts
│       └───dashboard.module.ts
├───assets
└───environments
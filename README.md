# Beer App

Beer app is an Angular application designed to fetch and display data about beers. It utilizes the Punk API to retrieve information about various beers and presents them in a user-friendly interface.

Production deployed app: [Beer App](https://beer-app-tskobics-projects.vercel.app/)

## Installing dependencies

Run `npm install` or `pnpm install`   to fetch and install all the required libraries and project dependencies.

## Development server

Run `npm run start`, `pnpm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build`, `pnpm run build` or `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Legend

:white_check_mark: Implemented feature

:warning: Features that are not implemented

## Project Requirements

### Objective
Develop a web application in Angular that fetches and displays data about beers from an external API.

### Project Features
1. **Beer Catalog Layout:** :white_check_mark:
   - Create a page to display a catalog of beers fetched from the Punk API.

2. **Fetch Beers:** :white_check_mark:
   - Fetch 25 beers from the Punk API and display them on the interface.

3. **Display Beer Details:** :white_check_mark:
   - Display essential information for each beer, including name, description, and alcohol by volume (ABV) percentage.
   - Enable users to click on a beer to view its details in a modal or popup.

4. **Favorite Beers:** :white_check_mark:
   - Allow users to add beers to their favorites list.
   - Store favorite beers in the browser's sessionStorage object and provide an option to remove them.

5. **Filters:** :white_check_mark:
   - Implement filters to refine the displayed beer list:
     - Filter by beer name.
     - Use a slider to select the alcohol by volume (ABV) content.
     - Checkbox to show only favorite beers.
     - Dropdown menu for sorting beers by name or ABV.

6. **Responsive Design:** :white_check_mark:
   - Ensure the web interface is responsive and compatible with various devices and screen sizes.

7. **Usage of the latest Angular version and its features:** :white_check_mark:
   - Implement the application using a newer version of Angular (Angular's new reactive primitive, Angular Signals, and its new APIs is heavily utilized)

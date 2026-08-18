
## Setup

Make sure to install dependencies:

```bash
# npm
npm install

```
## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

#Storybook 

npm run storybook
```

## Production

Build the application for production:

```bash
# npm
npm run build

#netlify link

https://graceful-sherbet-0ef119.netlify.app/shortlist

## Design decisions and issues faced along the way

### 1. API integration

I used Nuxt server API routes for the Google Books API instead of calling Google Books directly from the page components.  
I created separate endpoints for searching books and getting details for a particular book.  
This keeps the external API logic separate from the UI code.  
I also created a `Book` type and mapped the Google Books response into this structure before using it in the components.  
This made it easier to handle missing fields and keep the UI consistent.

### 2. Additional book information

I added a few more fields to the book data than what was strictly mentioned in the requirement.  
These include publication year, language, categories, page count, description and cover image.  
I decided to show publication year and language in the search results because they are useful when comparing books.  
Some books returned by Google do not have all of these fields, so I added fallbacks for missing information instead of assuming the data would always be available.

### 3. Shortlist persistence

Codex initially suggested using `localStorage` for saving the shortlisted books.  
I changed this to Nuxt's `useCookie()` because it works well with Nuxt and is also SSR-friendly.  
I kept the shortlist logic inside a `useShortlist()` composable so it can be used from the search results, detail page and shortlist page.  
For this application the amount of data stored is small, so using a cookie is sufficient.  
For a larger application, I would move this to a backend/database instead of continuing to store the shortlist in a cookie.

### 4. Presentational components and Storybook

The search form was initially part of `index.vue`.  
For the Storybook requirement, I moved it into a separate `SearchBar` component.  
I also changed `BookCard` so that it mainly handles displaying the book and emits events for actions instead of directly handling navigation and shortlist logic.  
This made both components easier to use independently in Storybook.  
I created stories for the main states of both `BookCard` and `SearchBar`.

### 5. Storybook installation issue

The first Storybook setup caused dependency conflicts between Nuxt 4 and the Nuxt Storybook integration that was generated.  
I ran into `ERESOLVE` errors and also framework loading errors because the generated packages were not compatible with the Nuxt version in this project.  
Instead of forcing the dependencies or changing the Nuxt version, I removed the Nuxt Storybook integration and used standalone Storybook with Vue 3 and Vite.  
I also had to add `@vitejs/plugin-vue` so that Storybook could process the `.vue` files correctly.  
After these changes, Storybook was running successfully and both required components could be viewed and tested.

### 6. Time management
If given more time I would have focused on UI  a bit more.


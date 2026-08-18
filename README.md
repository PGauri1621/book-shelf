
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
```

## Production

Build the application for production:

```bash
# npm
npm run build

Design decisions along the way:

1. Added additional shape of data for displaying book data (apart from the ones mentioned in requirement spec).

2. Replaced the localstorage suggestion of codex for storing the shortlisted books info and instead used useCookie() to store the shortlisted books list.

3. For the requirement mentioned in the spec, I felt cookies could be better option which survives the page refresh. Although they have limitation for storing the large dataset, for this small application this will work fine. 

4. Updated codex suggestion for implementing the storybook with bookcard component and searchbar compo (for this moved the form tag from index.vue to the searchbar compo).

5. 


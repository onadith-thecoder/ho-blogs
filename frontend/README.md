# HO Blogs — Frontend

React + Vite + Tailwind frontend for the HO Blogs student project.

## Tech Stack
- React 19, Vite, Tailwind CSS
- React Router DOM (client-side routing)
- Axios (API client)
- Vitest + Testing Library (automated tests)
- Laravel Sanctum (token-based auth, consumed from the backend)

## Setup

1. Clone the repo and go into this folder:
```bash
   git clone https://github.com/onadith-thecoder/ho-blogs.git
   cd ho-blogs/frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Set up your environment file:
```bash
   cp .env.example .env
```
   Make sure `VITE_API_URL` points at your running backend (default: `http://localhost:8000/api`).

4. Start the dev server:
```bash
   npm run dev
```
   Visit `http://localhost:5173`.

**Note:** the backend (`../backend`) must be running separately (`php artisan serve`) for the app to actually load or save any data.

## Running Tests

```bash
npm test
```

## Features
- User registration and login (Sanctum token-based auth), with session persisted across page refresh
- View latest published posts on the homepage
- View a single post with related posts
- Create, edit, and delete your own posts (author-only, enforced both in the UI and the API)
- Search posts by title or content

## Testing
16 automated tests covering PostCard, Home, Login, Register, and PostView, using mocked API responses (no live backend required to run tests).

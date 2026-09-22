# Blog Web App Test

A multi-user blog platform built with Laravel, where registered users can create, edit, and manage their own blog posts, while anyone can read published posts without an account.

Built as a structured learning project following a real software development lifecycle: requirements gathering, planning, design, development, testing, and documentation — with professional Git/GitHub practices throughout.

## Features

- User registration and authentication (Laravel Breeze)
- Public blog reading — no account required
- Authenticated users can create, edit, and delete their own posts
- Post fields: title, slug (auto-generated), excerpt, content, featured image, draft/published status
- Author-only authorization on edit/delete (enforced server-side, not just hidden in the UI)
- REST API with token-based authentication (Laravel Sanctum), fully testable in Postman
- Automated test suite (Pest) covering authentication, authorization, and CRUD behavior

## Tech Stack

- **Backend:** Laravel 13, PHP 8.3
- **Database:** MySQL
- **Auth:** Laravel Breeze (web), Laravel Sanctum (API)
- **Testing:** Pest
- **API Testing:** Postman
- **Local environment:** Laragon

## Installation

1. Clone the repository
   *bash
   git clone https://github.com/onadith-thecoder/blog-webapp-test.git
   cd blog-webapp-test
   *

2. Install dependencies
   *bash
   composer install
   npm install
   *

3. Set up environment
   *bash
   cp .env.example .env
   php artisan key:generate
   *
   Then update `.env` with your MySQL database credentials.

4. Run migrations
   *bash
   php artisan migrate
   *

5. Link storage (for image uploads)
   *bash
   php artisan storage:link
   *

6. Build frontend assets
   *bash
   npm run build
   *

7. Start the server
   *bash
   php artisan serve
   *
   Visit `http://127.0.0.1:8000`

## Running Tests

```bash
php artisan test
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/login` | Log in and receive an API token | No |
| POST | `/api/logout` | Revoke current token | Yes |
| GET | `/api/posts` | List published posts | No |
| GET | `/api/posts/{id}` | View a single post | No |
| POST | `/api/posts` | Create a post | Yes |
| PUT | `/api/posts/{id}` | Update own post | Yes |
| DELETE | `/api/posts/{id}` | Delete own post | Yes |

Authenticated requests require an `Authorization: Bearer {token}` header.

## Future Improvements

- Comments and likes on posts
- Post categories/tags
- User bio and avatar
- Frontend styling (currently unstyled by design, to focus on backend functionality)
- Deployment to a live hosting environment

## Author

Venuka ([@onadith-thecoder](https://github.com/onadith-thecoder))
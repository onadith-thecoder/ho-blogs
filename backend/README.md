# HO Blogs — Backend (Laravel API)

REST API for HO Blogs. Auth, posts, comments, and search — consumed by the React frontend in a separate part of this workflow.

## Tech stack
Laravel 13, MySQL, Sanctum (token-based auth)

## Setup
```bash
git clone https://github.com/onadith-thecoder/ho-blogs.git
cd ho-blogs/backend
composer install
copy .env.example .env
php artisan key:generate
```
Edit `.env`:
```
DB_DATABASE=ho_blogs
DB_USERNAME=root
DB_PASSWORD=
```
```bash
php artisan migrate
php artisan serve
```
API now runs at `http://localhost:8000/api`.

## Authentication
Token-based via Sanctum — **not** cookies. After login/register, send the returned token on every authenticated request:
```
Authorization: Bearer <token>
```

## Endpoints

| Method | Endpoint | Auth? | Body | Notes |
|---|---|---|---|---|
| POST | `/api/register` | No | `name, email, password, password_confirmation` | Returns `{ user, token }`, `201` |
| POST | `/api/login` | No | `email, password` | Returns `{ user, token }` |
| POST | `/api/logout` | Yes | — | Revokes current token |
| GET | `/api/posts` | No | — | Paginated (10/page), published only |
| GET | `/api/posts/latest` | No | — | Last 3 published posts — **use this for the homepage** |
| GET | `/api/posts/search?q=` | No | — | `q` min 2 chars; matches title/content |
| GET | `/api/posts/{id}` | No | — | Returns `{ post, related_posts }` — **not** a flat post object |
| POST | `/api/posts` | Yes | `title, excerpt, content, status (draft\|published)` | `201` |
| PUT | `/api/posts/{id}` | Yes | same as above | Author-only, `403` otherwise |
| DELETE | `/api/posts/{id}` | Yes | — | Author-only |
| GET | `/api/posts/{id}/comments` | No | — | List with commenter name |
| POST | `/api/posts/{id}/comments` | Yes | `body` | `201`, returns comment + `user: {id, name}` |
| DELETE | `/api/comments/{id}` | Yes | — | Author-only |

## Example: full auth → post → comment flow
```
POST /api/register  → { token }
POST /api/posts      (Authorization: Bearer <token>) → { id: 5, ... }
GET  /api/posts/5    → { post: {...}, related_posts: [...] }
POST /api/posts/5/comments  (Authorization: Bearer <token>) → { body: "..." }
```

## Running tests
```bash
php artisan test
```

## Team
- Onadith — Backend (Laravel API)
- Hashen — Frontend (React)
# ho-blogs
Blog posting web application targeted at Software Engineering students to present or discuss their final year projects.

Show Image Show Image Show Image Show Image Show Image Show Image

HO Blogs is a full-stack web application made of two independent parts that live in this one repository:

backend/ — a Laravel REST API (MySQL, Laravel Sanctum token authentication)
frontend/ — a React single-page application (Vite, Tailwind CSS) that consumes the API

The two parts communicate only through a JSON/HTTP API, so each can be run, tested and deployed on its own.

Table of contents
Features
Tech stack
How it works
Project structure
Getting started
Using the application
API reference
Authentication
Testing
UI and design
Security considerations
Git workflow
Troubleshooting
Known limitations
Possible future improvements
Team
License

Features
Core (CRUD)
Area	What you can do
Homepage	See the 3 most recent published posts as cards (thumbnail, title, author, date, excerpt)
Create	Write a post with title, excerpt, content, publish/draft status and an optional featured image
Read	Open any post on its own page with full content, featured image, related posts and comments
Update	Edit your own posts, including replacing the featured image
Delete	Delete your own posts (with a confirmation prompt)
Additional features (beyond CRUD)
Feature	Details
Authentication	Register, log in and log out. Token-based (Laravel Sanctum); the session survives a page refresh. Only the author of a post can edit or delete it — enforced in the UI and in the API (403 Forbidden otherwise).
Commenting	Anyone can read comments; logged-in users can post comments, which appear instantly at the top of the list. Comments show the commenter's name.
Search	Search published posts by title or content from the navigation bar (minimum 2 characters).
Recommendations	Each post page lists up to 3 "Related Posts": other published posts by the same author or whose title contains the same first word as the current post.
Image uploads	Attach a featured image (JPEG/PNG/etc., up to 5 MB) when creating or editing a post; it is shown on cards and on the post page.
Tech stack
Layer	Technology
Backend framework	Laravel 13 (PHP 8.3+)
Database	MySQL 8 (SQLite is used automatically for the automated tests)
Authentication	Laravel Sanctum (personal access tokens sent as Bearer tokens)
Backend testing	Pest 4 (with the Laravel plugin)
Frontend framework	React 19 with React Router 7
Build tool	Vite 8
Styling	Tailwind CSS 4 (CSS-first @theme tokens), Google Fonts (Space Grotesk, Inter)
HTTP client	Axios
Frontend testing	Vitest 5 + React Testing Library + jsdom
Local environment	Laragon (Windows), Postman for manual API testing
How it works
JSON / multipart over HTTPAuthorization: Bearer token
React SPAVite dev server :5173
Laravel REST APIphp artisan serve :8000
MySQLho_blogs
storage/app/publicuploaded images
The user registers or logs in; the API returns the user and a Sanctum token.
The React app keeps the token in localStorage and attaches it to every protected request as Authorization: Bearer <token>.
On page load, the app calls GET /api/user with the stored token to restore the logged-in user.
Uploaded images are stored on the backend's public disk and exposed through the public/storage symlink; the API returns a ready-to-use featured_image_url for each post.
Database schema
writes
writes
has
USERS
bigint
id
PK
string
name
string
email
UK
string
password
POSTS
bigint
id
PK
bigint
user_id
FK
string
title
string
slug
UK
string
excerpt
longtext
content
string
featured_image
nullable
enum
status
draft or published
COMMENTS
bigint
id
PK
bigint
post_id
FK
bigint
user_id
FK
text
body

Deleting a user deletes their posts and comments, and deleting a post deletes its comments (ON DELETE CASCADE). Laravel's own tables (personal_access_tokens, migrations, cache, jobs, sessions, password_reset_tokens) are also created by the migrations.

Project structure

Key files and folders (not exhaustive):

ho-blogs/
├── README.md
├── backend/                         Laravel REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php       register, login, logout
│   │   │   ├── PostController.php       CRUD, latest, search, related posts, image upload
│   │   │   └── CommentController.php    list, create, delete comments
│   │   └── Models/                      User, Post, Comment
│   ├── database/
│   │   ├── migrations/                  users, posts, comments, personal_access_tokens, ...
│   │   └── factories/                   model factories used by tests
│   ├── routes/api.php                   all API routes
│   └── tests/Feature/                   AuthTest, PostTest, CommentTest (Pest)
└── frontend/                        React single-page app
    ├── public/leaf-bg.jpg               ambient background image
    ├── .env.example                     VITE_API_URL
    └── src/
        ├── api/client.js                Axios instance (base URL from VITE_API_URL)
        ├── context/AuthContext.jsx      token + current user state
        ├── components/                  Navbar, PostCard
        ├── pages/                       Home, PostView, CreatePost, EditPost,
        │                                Login, Register, SearchResults (+ *.test.jsx)
        ├── App.jsx                      routes
        └── index.css                    Tailwind import + theme tokens + background

The frontend has its own, more focused guide in frontend/README.md.

Getting started
Prerequisites
PHP 8.3+ and Composer 2
MySQL 8 (Laragon bundles PHP, Composer and MySQL on Windows)
Node.js 22 LTS and npm (developed on Node 22)
Git

You need to run the backend and the frontend at the same time, in two separate terminals.

1. Clone the repository
bash
git clone https://github.com/onadith-thecoder/ho-blogs.git
cd ho-blogs
2. Backend (Laravel API)
bash
cd backend
composer install

# Create your environment file
copy .env.example .env        # Windows (CMD)
# cp .env.example .env        # macOS / Linux

php artisan key:generate

Create an empty MySQL database:

sql
CREATE DATABASE ho_blogs;

Open backend/.env and point it at that database (the example file defaults to SQLite, so these lines must be changed):

env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ho_blogs
DB_USERNAME=root
DB_PASSWORD=

Create the tables, link the public storage folder (needed for uploaded images) and start the server:

bash
php artisan migrate
php artisan storage:link
php artisan serve

The API is now available at http://localhost:8000/api. Leave this terminal running.

Prefer not to use MySQL? You can keep the default DB_CONNECTION=sqlite — Laravel will offer to create the SQLite database file when you run php artisan migrate.

3. Frontend (React app)

Open a second terminal:

bash
cd ho-blogs/frontend
npm install

copy .env.example .env        # Windows (CMD)
# cp .env.example .env        # macOS / Linux

npm run dev

frontend/.env must contain the API address:

env
VITE_API_URL=http://localhost:8000/api

Open http://localhost:5173 (Vite automatically uses the next free port, e.g. 5174, if 5173 is busy).

Vite only reads .env when it starts. If you create or edit frontend/.env, stop and restart npm run dev.

4. Try it out
Click Register and create an account.
Click New Post, fill in the form, optionally choose an image, and publish.
The post appears on the homepage. Open it to comment, edit or delete it.
Using the application
Page	Route	Who can use it
Home (latest 3 posts)	/	Everyone
Register	/register	Guests
Login	/login	Guests
Search results	/search?q=term	Everyone
Post detail (with related posts and comments)	/posts/:id	Everyone (commenting requires login)
New post	/create	Logged-in users
Edit post	/posts/:id/edit	The post's author

What each kind of visitor sees

	Guest	Logged-in user	Post author
Read posts, related posts, comments	✅	✅	✅
Search	✅	✅	✅
Write a comment	❌ (sees a "Log in" prompt)	✅	✅
Create a post	❌	✅	✅
Edit / delete a post	❌	❌	✅ (own posts only)
API reference

Base URL (local): http://localhost:8000/api

All request and response bodies are JSON, except post creation/updating, which uses multipart/form-data because of the optional image. Protected endpoints require the header:

Authorization: Bearer <token>
Endpoints
Method	Endpoint	Auth	Description
POST	/register	No	Create an account; returns { user, token } (201)
POST	/login	No	Log in; returns { user, token }
POST	/logout	Yes	Revoke the current token
GET	/user	Yes	Return the currently authenticated user
GET	/posts	No	Published posts, newest first, paginated (10 per page)
GET	/posts/latest	No	The 3 newest published posts (array)
GET	/posts/search?q=term	No	Published posts whose title or content contains term (array, q ≥ 2 chars)
GET	/posts/{id}	No	One post plus related posts: { post, related_posts }
POST	/posts	Yes	Create a post (multipart/form-data) — 201
PUT	/posts/{id}	Yes (author)	Update a post — see the note on _method below
DELETE	/posts/{id}	Yes (author)	Delete a post
GET	/posts/{id}/comments	No	Comments for a post, newest first, each with user: { id, name }
POST	/posts/{id}/comments	Yes	Add a comment (201)
DELETE	/comments/{id}	Yes (author)	Delete your own comment

Updating with an image: browsers cannot reliably send a file in a real PUT request. The frontend therefore sends POST /posts/{id} with the extra form field _method=PUT, which Laravel treats as a PUT. Plain JSON PUT requests (no image) also work.

Validation rules
Endpoint	Fields
POST /register	name required, max 255 · email required, valid, unique · password required, min 8, must match password_confirmation
POST /login	email required, valid · password required
POST /posts, PUT /posts/{id}	title required, max 255 · excerpt required, max 255 · content required · status required, draft or published · featured_image optional, must be an image, max 5 MB
POST /posts/{id}/comments	body required, max 1000 characters
GET /posts/search	q required, min 2 characters
Status codes and errors
Code	Meaning
200 / 201	Success / resource created
401	Missing or invalid token, or wrong login credentials ({ "message": "Invalid credentials" })
403	You are logged in but not the owner of the post or comment ({ "message": "Forbidden" })
404	Post or comment not found
422	Validation failed — { "message": "...", "errors": { "field": ["..."] } }
Example responses

POST /register → 201

json
{
  "user": { "id": 3, "name": "Jane Doe", "email": "jane@example.com", "created_at": "...", "updated_at": "..." },
  "token": "1|xxxxxxxxxxxxxxxxxxxxxxxx"
}

GET /posts/{id}

json
{
  "post": {
    "id": 3,
    "user_id": 2,
    "title": "My first post",
    "slug": "my-first-post",
    "excerpt": "A short summary",
    "content": "The full text of the post...",
    "featured_image": "posts/abc123.jpg",
    "status": "published",
    "created_at": "2026-09-27T12:39:49.000000Z",
    "updated_at": "2026-09-27T12:52:20.000000Z",
    "featured_image_url": "http://localhost:8000/storage/posts/abc123.jpg",
    "user": { "id": 2, "name": "Jane Doe" }
  },
  "related_posts": [
    { "id": 2, "title": "Another post", "user": { "id": 2, "name": "Jane Doe" }, "...": "..." }
  ]
}

featured_image_url is null when a post has no image. Read endpoints (/posts, /posts/latest, /posts/search, /posts/{id}) include the author as user: { id, name } — only those two fields, never the rest of the user record.

GET /posts returns Laravel's standard paginator object: current_page, data (the posts), per_page, total, next_page_url, and so on.

POST /posts/{id}/comments → 201

json
{
  "id": 7,
  "post_id": 3,
  "user_id": 2,
  "body": "Great post!",
  "created_at": "...",
  "updated_at": "...",
  "user": { "id": 2, "name": "Jane Doe" }
}
Quick examples (Git Bash / macOS / Linux)
bash
# Log in
curl -X POST http://localhost:8000/api/login \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"password123"}'

# Create a post with an image (replace TOKEN)
curl -X POST http://localhost:8000/api/posts \
  -H "Accept: application/json" -H "Authorization: Bearer TOKEN" \
  -F "title=Hello" -F "excerpt=Short summary" -F "content=Full text" \
  -F "status=published" -F "featured_image=@/path/to/photo.jpg"

# Search
curl "http://localhost:8000/api/posts/search?q=hello" -H "Accept: application/json"

Always send Accept: application/json so Laravel returns JSON errors instead of redirects. Postman works the same way: set the Authorization tab to Bearer Token and use Body → form-data for posts with images.

Authentication
Authentication uses Laravel Sanctum personal access tokens, not cookies. This suits an app whose frontend and backend run on different origins.
POST /register and POST /login return a token. POST /logout deletes the token that was used for the request.
The frontend stores the token in localStorage (key: token) and, on load, validates it with GET /api/user. If the token is rejected, it is removed and the user is treated as logged out.
Passwords are hashed (bcrypt) and never returned by the API.
Testing
Backend — Pest
bash
cd backend
php artisan test

The tests run against an in-memory SQLite database (configured in phpunit.xml) and use RefreshDatabase, so they never touch your MySQL data. At the time of writing the suite has 8 tests (16 assertions), covering:

registering a user and logging in with valid credentials
rejecting login with a wrong password
creating a post through the API with a Bearer token
posting a comment on a post as an authenticated user
searching returns only matching published posts
Frontend — Vitest
bash
cd frontend
npm test            # watch mode
npx vitest run      # single run (useful for CI / a final check)

16 tests across 5 files (PostCard, Home, Login, Register, PostView). API calls are mocked, so no running backend is needed for the frontend tests. You may see React act(...) warnings in the console for the Login/Register tests; they are informational and do not fail the run.

UI and design

The interface uses a dark "charcoal-teal" theme with glassmorphic surfaces and a blurred leafy background.

Token	Value	Used for
Teal	
#0F7476	Borders, links, secondary buttons
Mustard	
#DFAF34	Primary buttons, highlights, author pills, hover glow
Background	
#0A1F1E / 
#0D2624	Page and card backgrounds
Off-white	
#F4F1E9	Main text
Muted	
#A9B8B6	Secondary text
Typography: Space Grotesk for headings, Inter for body text.
Background: a full-screen leaf photograph (frontend/public/leaf-bg.jpg) blurred, dimmed and overlaid with a dark teal gradient so it acts as ambient texture; it drifts slowly and respects prefers-reduced-motion.
Components: a sticky glass navigation bar, a pill-shaped search field with a mustard focus ring, cards that lift and glow on hover, and consistently styled forms.
The layout is responsive (the post grid collapses from three columns to one on small screens).

Theme tokens live in the @theme block of frontend/src/index.css.

<!-- Screenshots ## Screenshots | Home | Post page | |---|---| | ![Home page](docs/screenshots/home.png) | ![Post page](docs/screenshots/post.png) | | Create post | Login | |---|---| | ![Create post](docs/screenshots/create-post.png) | ![Login](docs/screenshots/login.png) | -->
Security considerations
Authorization: editing/deleting posts and deleting comments is restricted to the owner and enforced server-side (403 Forbidden), not just hidden in the UI.
Validation: every write endpoint validates its input; uploaded files must be images of at most 5 MB.
Mass assignment: models declare an explicit $fillable list.
Data exposure: related user data is limited to id and name; password hashes are never serialised.
Secrets: .env files are git-ignored. Never commit real credentials.
CORS: the API currently uses Laravel's default CORS behaviour, which accepts requests from any origin on api/* routes. Restrict the allowed origins to your frontend's URL before deploying to production.
Git workflow
main — stable branch; protected, changes arrive through pull requests.
develop — integration branch where finished features are combined.
feature/*, fix/*, docs/*, test/* — short-lived branches for each piece of work.
Commit messages follow Conventional Commits: feat:, fix:, style:, docs:, test:, chore:.
Troubleshooting
Symptom	Likely cause and fix
Browser console shows net::ERR_CONNECTION_REFUSED on localhost:8000	The backend is not running. Start it with php artisan serve in backend/ and leave that terminal open.
Login/register fails immediately and requests go to localhost:5173/...	frontend/.env is missing or VITE_API_URL is not set. Copy .env.example to .env and restart npm run dev.
Uploaded images do not appear	Run php artisan storage:link once in backend/. Also check that the post actually has an image (featured_image_url in the API response is not null).
SQLSTATE ... Unknown database 'ho_blogs'	Create the database first (CREATE DATABASE ho_blogs;) and check the DB_* values in backend/.env.
Migration table not found from php artisan migrate:status	Not an error on a fresh database — run php artisan migrate.
401 Unauthenticated on protected actions	The token is missing or expired. Log in again.
Vite starts on port 5174 instead of 5173	Port 5173 is busy; use the URL Vite prints. The API accepts any origin, so this works.
Known limitations

These are deliberate scope decisions or trade-offs worth knowing about:

Search uses a simple SQL LIKE match on title and content — no relevance ranking, stemming or typo tolerance.
Related posts use a lightweight heuristic (same author, or same first word in the title), not a recommendation engine.
Duplicate titles: the URL slug is generated from the title and must be unique, so creating a second post with an identical title is rejected by the database.
Drafts are hidden from the homepage, lists and search, but a draft can still be opened directly by its ID; there is no "my drafts" page.
Homepage shows only the 3 latest posts; there is no "browse all posts" page in the UI (the paginated GET /posts endpoint exists for one).
Comments can be created and listed in the UI; deleting a comment is available in the API but has no button in the UI, and comments cannot be edited.
Images: one featured image per post, stored on the server's local disk; an existing image can be replaced but not removed.
No email verification or password reset.
Possible future improvements
Unique slug generation (e.g. appending a suffix) and slug-based URLs
A "browse all posts" page with pagination, plus a "my posts / drafts" dashboard
Delete/edit buttons for comments; threaded replies
Tags or categories and filtering
Rich-text or Markdown editor for post content
Cloud image storage and image removal on edit
Password reset and email verification
Restricted CORS, rate limiting and deployment configuration (e.g. Railway/Render for the API, Vercel/Netlify for the frontend)
Continuous integration running both test suites on every pull request
Team
Name	GitHub	Responsibilities
Onadith	@onadith-thecoder	Backend API, database design, authentication, comments, search and recommendations, image upload, backend tests, UI theme and integration, documentation
Hashen	@HashenRubix	React frontend foundation: routing, pages, authentication flow, API client, frontend tests
License

This project was created for educational purposes as part of a university assignment. Laravel and the other open-source packages used are licensed under their respective licenses (Laravel is MIT-licensed).
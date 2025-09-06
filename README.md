# TaaraCMSBackend

What it does

This repository is the backend for the TAARA CMS. It provides REST endpoints to manage site content, send transactional emails, accept PayPal donations, and upload files to AWS S3.

Core capabilities

- Content management endpoints for site pages (create / update / get).
- File upload to AWS S3 and basic image operations (Cloudinary used in some flows).
- Newsletter and contact flows that save subscribers and attempt to add them to Constant Contact.
- Transactional emails using Nodemailer (Gmail config) for various forms and RAISE flows.
- PayPal integration to create and capture payment orders.

Limitations

- No UI — this is a backend API only.
- Minimal input validation and limited error handling in some controllers.
- Environment variable names are inconsistent across files; `.env` must match expected names or code must be patched.
- Some features assume external setup (MongoDB Atlas, AWS S3, Constant Contact, PayPal credentials). Those services must be configured separately.

Quick start

1. Add a `.env` with the required vars (MONGO_URL, AWS and mailer creds, PAYPAL_* etc.).
2. Install dependencies: `npm install`.
3. Run in dev: `npm run dev`.

Where code lives (quick map)

- Entry: `index.js`
- Routes: `routes/` (per feature)
- Controllers: `controller/` (business logic)
- Models: `model/` (Mongoose schemas)
- Config: `config/` (DB, AWS, Cloudinary)

If you want this trimmed further or converted into a one-paragraph README, tell me how brief you want it.


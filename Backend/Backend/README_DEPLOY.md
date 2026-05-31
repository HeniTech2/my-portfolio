Deployment notes — Backend

Recommended providers: Render, Railway, or Heroku.

Render (quick):
- Create a new Web Service → Connect GitHub → select repository `my-portfolio`.
- Set the "Root Directory" to `Projects/My-Portflio/Backend`.
- Start command: `npm start` (build step not required).
- Add environment variables: `EMAIL_USER`, `EMAIL_PASS`, (optional) `PORT`.

Railway (quick):
- New Project → Deploy from GitHub → set subdirectory to `Projects/My-Portflio/Backend`.
- Add env vars in the Environment section.

Heroku (if used):
- Add `Procfile` (already included) with `web: node src/server.js`.
- Push to Heroku remote and set env vars with `heroku config:set`.

Email notes:
- Gmail may require an App Password (enable 2FA, then create app password) or use a transactional provider (SendGrid/Mailgun).

CORS / Security:
- The server currently uses `cors()` (allows all origins). After deployment, restrict origins to your Netlify domain.

After deploy:
- Copy the public backend URL (e.g. `https://your-backend.onrender.com`) and set the frontend env var `VITE_API_URL` in Netlify Site settings → Build & deploy → Environment.

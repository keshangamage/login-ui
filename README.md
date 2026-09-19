# Login UI Assessment

A responsive login experience built with React, Vite, TypeScript, and Material UI. It includes client-side form validation, Firebase Google authentication, and a protected handoff screen that displays the authenticated user's access token.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The page opens at `http://localhost:5173`.

## Connect Firebase

1. Create a project in the [Firebase console](https://console.firebase.google.com/).
2. Add a Web app to that project.
3. Open **Project settings > General > Your apps > SDK setup and configuration**.
4. Copy `.env.example` to `.env` and replace every placeholder with the corresponding Firebase value.
5. Open **Authentication > Sign-in method**, add the Google provider, select a support email, and enable it.
6. Restart the Vite development server after changing `.env`.

The Firebase Web configuration identifies the project but does not grant administrative access. The local `.env` file is excluded from Git.

## Quality checks

```bash
npm run lint
npm run build
```

## Deploy to Firebase Hosting

The included `firebase.json` serves the Vite build and rewrites client-side routes to `index.html`.

```bash
npm run build
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools deploy --only hosting
```

After deployment, confirm the hosted domain appears under **Authentication > Settings > Authorized domains** in Firebase.

## Project structure

```text
src/
  components/  Reusable visual elements
  lib/         Firebase initialization
  pages/       Login and access-token screens
```

## Security note

The access token is intentionally shown to satisfy the assessment. Treat it as sensitive data: do not log it, commit it, or include it in screenshots and public issue reports.

# RestartHER — Independent Frontend Prototype

This is a standalone HTML, CSS and JavaScript prototype. It is separate from the original SAP CAP + SAP UI5 project and does not modify or connect to that repository.

## Included screens and flow

1. **Welcome screen** — illustration with a subtle writing-hand animation and Get Started.
2. **Role selection** — Woman, Mentor, Business / Organization in one horizontal row. Only Woman is active for this phase; the other two show a coming-later message.
3. **Authentication** — Continue with Google (simulated) or Continue with Email.
4. **Email OTP** — simulated six-digit code. The code is displayed on screen for local testing; no email is sent.
5. **Basic profile information** — optional profile photo, first name, last name, date of birth, fixed Female gender, phone number, email, location and highest education completed.
6. **Review profile** — review details and return to edit.
7. **Dashboard landing** — placeholder for the next development phase.

## Run locally in VS Code

1. Clone or download this repository.
2. Open the `RestartHER-Frontend` folder in VS Code (File → Open Folder).
3. Open `index.html`.
4. Start Live Server using the **Go Live** button in the bottom status bar. You can also open the Command Palette (`Ctrl + Shift + P`) and search for `Live Server: Open with Live Server`.
5. If Live Server is unavailable, double-click `index.html` from File Explorer to open it directly in a browser.

## Demo limitations

- Google sign-in is simulated; no Google OAuth is connected.
- Email OTP is simulated; the six-digit code is shown on the page and no email is sent.
- The completed demo profile is stored in browser `sessionStorage` for the current tab/session only.
- There is no backend, database, real authentication, AI, or SAP integration.
- Google Fonts require an internet connection; system fallbacks are included.

## Folder structure

```text
RestartHER-Frontend/
├── index.html
├── style.css
├── script.js
├── settings.json
└── README.md
```

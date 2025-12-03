# Centralized-Management-Tools

Centralized app to manage inventory, orders, samples, and settings via a desktop UI (Kivy/KivyMD) and a web UI (FastAPI + Jinja2 + HTMX).

## Project Structure (new format)

```
.
├── app/                     # Kivy/KivyMD desktop app
│   ├── kv/                  # KV layouts (home, inventory, orders, ...)
│   ├── screens/             # Screen controllers
│   ├── components/          # UI components (e.g., nav bar)
│   └── theme/               # Colors and typography tokens
├── backend/                 # FastAPI server
│   ├── main.py              # App entry, templates/static mount, routes
│   └── routers/             # API routers (inventory, orders, samples, settings)
├── frontend/                # Server-rendered HTML + static assets
│   ├── templates/           # Jinja2 templates (base, home, inventory, ...)
│   └── static/              # CSS tokens, images, JS
├── CMT.py                   # Desktop app entry point
├── requirements.txt         # Python dependencies
└── README.md
```

## Run (Web)

```
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

Open `http://127.0.0.1:8000/` and navigate via the header. Content loads inline via HTMX.

## Run (Desktop)

```
python CMT.py
```

The desktop app uses KivyMD 2.x widgets and centralized theme tokens defined in `app/theme/colors.py`.

## Notes
- Header gradient uses `PRIMARY_COLOR_1` → `SECONDARY_COLOR_3` from `app/theme/colors.py`, reflected in `frontend/static/css/tokens.css`.
- API endpoints live under `/api/*` (e.g., `/api/inventory`). Page routes render HTML at `/inventory`, `/orders`, `/samples`, `/settings`.

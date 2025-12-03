# FastAPI app serving server-rendered pages with Jinja2 and HTMX
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from backend.routers import inventory, samples, orders, settings

app = FastAPI(title="Centralized Management Tools - Web")

# Mount static files (CSS, images, JS)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Templates directory
templates = Jinja2Templates(directory="frontend/templates")

# Include API routers
app.include_router(inventory.router, prefix="/api/inventory", tags=["inventory"])
app.include_router(samples.router, prefix="/api/samples", tags=["samples"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Home page mirroring the Kivy layout: gradient header + actions."""
    return templates.TemplateResponse(
        "home.html",
        {
            "request": request,
            "title": "Centralized Management Tools",
            "nav": [
                {"href": "/inventory", "label": "Inventory"},
                {"href": "/orders", "label": "Orders"},
                {"href": "/samples", "label": "Samples"},
                {"href": "/settings", "label": "Settings"},
            ],
        },
    )

@app.get("/inventory", response_class=HTMLResponse)
async def inventory_page(request: Request):
    return templates.TemplateResponse("inventory.html", {"request": request, "title": "Inventory"})

@app.get("/orders", response_class=HTMLResponse)
async def orders_page(request: Request):
    return templates.TemplateResponse("orders.html", {"request": request, "title": "Orders"})

@app.get("/samples", response_class=HTMLResponse)
async def samples_page(request: Request):
    return templates.TemplateResponse("samples.html", {"request": request, "title": "Samples"})

@app.get("/settings", response_class=HTMLResponse)
async def settings_page(request: Request):
    return templates.TemplateResponse("settings.html", {"request": request, "title": "Settings"})

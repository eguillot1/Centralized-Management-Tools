from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_settings():
    """Return stubbed application settings."""
    return {
        "theme": "light",
        "version": "0.1.0",
        "features": ["inventory", "orders", "samples"],
    }

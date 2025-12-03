from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_items():
    """Return a stubbed list of inventory items."""
    return {"items": [
        {"id": 1, "name": "Buffer A", "qty": 10},
        {"id": 2, "name": "Tube 1.5ml", "qty": 500},
    ]}

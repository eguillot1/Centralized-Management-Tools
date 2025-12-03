from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_orders():
    """Return a stubbed list of orders."""
    return {"orders": [
        {"id": "O-1001", "status": "pending"},
        {"id": "O-1002", "status": "shipped"},
    ]}

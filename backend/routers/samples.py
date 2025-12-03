from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_samples():
    """Return a stubbed list of samples."""
    return {"samples": [
        {"id": "S-001", "type": "DNA"},
        {"id": "S-002", "type": "RNA"},
    ]}

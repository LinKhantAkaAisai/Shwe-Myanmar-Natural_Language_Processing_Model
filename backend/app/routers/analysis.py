from fastapi import APIRouter, HTTPException

from app.schemas.analysis import (
    AnalyzeRequest,
    AnalysisResponse,
)

from app.services.analyzer import (
    analyze_burmese_text,
)


router = APIRouter(
    prefix="/analyze",
    tags=["Analysis"],
)


@router.post(
    "",
    response_model=AnalysisResponse
)
def analyze(request: AnalyzeRequest):

    text = request.text.strip()

    if not text:
        raise HTTPException(
            status_code=400,
            detail="Text cannot be empty."
        )

    result = analyze_burmese_text(text)

    return result
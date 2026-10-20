from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    text: str


class PosTag(BaseModel):
    word: str
    tag: str


class AnalysisStatistics(BaseModel):
    characters: int
    syllables: int
    words: int
    uniquePosTags: int


class AnalysisResponse(BaseModel):
    originalText: str
    syllables: list[str]
    words: list[str]
    posTags: list[PosTag]
    statistics: AnalysisStatistics
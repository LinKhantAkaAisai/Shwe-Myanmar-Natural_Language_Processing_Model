import regex

from app.services.segmentation_service import segment_text
from app.services.pos_service import predict_pos


def graphemes(text: str) -> list[str]:
    """
    Split Burmese text into Unicode grapheme clusters.
    """
    return regex.findall(r"\X", text)


def analyze_burmese_text(text: str):

    # -----------------------------------------
    # 1. Grapheme / segmentation units
    # -----------------------------------------
    syllables = graphemes(text)

    # -----------------------------------------
    # 2. Word segmentation
    # -----------------------------------------
    words = segment_text(text)

    # -----------------------------------------
    # 3. POS tagging
    # -----------------------------------------
    pos_tags = predict_pos(words)

    # -----------------------------------------
    # 4. Statistics
    # -----------------------------------------
    unique_pos_tags = len({
        item["tag"]
        for item in pos_tags
    })

    statistics = {
        "characters": len(text),
        "syllables": len(syllables),
        "words": len(words),
        "uniquePosTags": unique_pos_tags,
    }

    # -----------------------------------------
    # 5. Final API response
    # -----------------------------------------
    return {
        "originalText": text,
        "syllables": syllables,
        "words": words,
        "posTags": pos_tags,
        "statistics": statistics,
    }
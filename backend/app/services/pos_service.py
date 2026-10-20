from pathlib import Path

import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification


# =========================================================
# Model path
# =========================================================

BACKEND_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = BACKEND_DIR / "models" / "pos"


# =========================================================
# Load tokenizer and model once
# =========================================================

print("Loading Burmese POS tokenizer...")

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_PATH
)

print("Burmese POS tokenizer loaded successfully!")


print("Loading Burmese POS model...")

model = AutoModelForTokenClassification.from_pretrained(
    MODEL_PATH
)

model.eval()

print("Burmese POS model loaded successfully!")


# =========================================================
# POS prediction
# =========================================================

def predict_pos(words: list[str]) -> list[dict]:
    """
    Predict a POS tag for each already-segmented Burmese word.

    Example:
    ["ကျွန်တော်", "ကျောင်း", "သွား"]

    becomes:

    [
        {"word": "ကျွန်တော်", "tag": "pron"},
        {"word": "ကျောင်း", "tag": "n"},
        {"word": "သွား", "tag": "v"},
    ]
    """

    if not words:
        return []

    encoding = tokenizer(
        words,
        is_split_into_words=True,
        return_tensors="pt",
        truncation=True,
        max_length=256,
    )

    word_ids = encoding.word_ids(batch_index=0)

    with torch.no_grad():
        outputs = model(**encoding)

    predictions = torch.argmax(
        outputs.logits,
        dim=-1,
    )[0].tolist()

    results = []
    seen_word_ids = set()

    for token_index, word_id in enumerate(word_ids):

        # Ignore [CLS], [SEP], etc.
        if word_id is None:
            continue

        # A Burmese word can become multiple BERT subwords.
        # Use the prediction of its first subword.
        if word_id in seen_word_ids:
            continue

        seen_word_ids.add(word_id)

        label_id = predictions[token_index]
        label = model.config.id2label[label_id]

        results.append({
            "word": words[word_id],
            "tag": label,
        })

    return results
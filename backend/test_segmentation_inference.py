from pathlib import Path

from transformers import pipeline


# ---------------------------------------
# 1. Model path
# ---------------------------------------

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = (
    BASE_DIR
    / "models"
    / "segmentation"
)


# ---------------------------------------
# 2. Load segmentation pipeline
# ---------------------------------------

print("Loading segmentation model...")

segmenter = pipeline(
    "token-classification",
    model=str(MODEL_PATH),
    tokenizer=str(MODEL_PATH),
    aggregation_strategy="simple",
    device=-1,
)

print("Model loaded successfully!")


# ---------------------------------------
# 3. Test Burmese text
# ---------------------------------------

sample_text = "မြန်မာစာလုံးပေါင်းသတ်ပုံ"

print("\nInput:")
print(sample_text)


# ---------------------------------------
# 4. Run prediction
# ---------------------------------------

predictions = segmenter(sample_text)


print("\nRaw predictions:")

for prediction in predictions:
    print(prediction)
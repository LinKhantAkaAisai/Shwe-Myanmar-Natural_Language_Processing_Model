from pathlib import Path

from transformers import (
    AutoTokenizer,
    AutoModelForTokenClassification,
)

MODEL_PATH = Path("models/segmentation")

print("Model path:", MODEL_PATH.resolve())

print("\nLoading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

print("Loading model...")
model = AutoModelForTokenClassification.from_pretrained(MODEL_PATH)

print("\n✅ Model loaded successfully!")

print("\nModel config label mapping:")
print("id2label:", model.config.id2label)
print("label2id:", model.config.label2id)

print("\nNumber of labels:")
print(model.config.num_labels)

print("\nTokenizer:")
print(type(tokenizer).__name__)
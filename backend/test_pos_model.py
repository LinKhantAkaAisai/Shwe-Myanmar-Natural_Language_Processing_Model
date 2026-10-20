from pathlib import Path

from transformers import AutoTokenizer, AutoModelForTokenClassification


MODEL_PATH = Path("models/pos")

print("POS model path:")
print(MODEL_PATH.resolve())


# --------------------------------------------------
# Load tokenizer
# --------------------------------------------------

print("\nLoading POS tokenizer...")

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_PATH
)

print("✅ POS tokenizer loaded successfully!")


# --------------------------------------------------
# Load model
# --------------------------------------------------

print("\nLoading POS model...")

model = AutoModelForTokenClassification.from_pretrained(
    MODEL_PATH
)

model.eval()

print("✅ POS model loaded successfully!")


# --------------------------------------------------
# Information
# --------------------------------------------------

print("\nModel type:")
print(type(model).__name__)

print("\nTokenizer type:")
print(type(tokenizer).__name__)

print("\nNumber of POS labels:")
print(model.config.num_labels)

print("\nid2label:")
print(model.config.id2label)

print("\nlabel2id:")
print(model.config.label2id)

print("\n🎉 POS MODEL READY!")

# --------------------------------------------------
# POS inference test
# --------------------------------------------------

import torch


words = [
    "ကျွန်တော်",
    "မနက်ဖြန်",
    "ကျောင်း",
    "သွား",
    "မယ်",
    "။",
]

print("\n====================================")
print("POS INFERENCE TEST")
print("====================================")

print("\nInput words:")
print(words)


# Tokenize the already-segmented words
encoding = tokenizer(
    words,
    is_split_into_words=True,
    return_tensors="pt",
    truncation=True,
    max_length=256,
)

word_ids = encoding.word_ids(batch_index=0)


# Run model
with torch.no_grad():
    outputs = model(**encoding)

predictions = torch.argmax(
    outputs.logits,
    dim=-1,
)[0].tolist()


# --------------------------------------------------
# Convert BERT subword predictions back to words
# --------------------------------------------------

results = []
seen_word_ids = set()

for token_index, word_id in enumerate(word_ids):

    # [CLS], [SEP], etc.
    if word_id is None:
        continue

    # Use only first BERT subword for each original word
    if word_id in seen_word_ids:
        continue

    seen_word_ids.add(word_id)

    label_id = predictions[token_index]
    label = model.config.id2label[label_id]

    results.append({
        "word": words[word_id],
        "tag": label,
    })


# --------------------------------------------------
# Print results
# --------------------------------------------------

print("\nPOS predictions:")

for item in results:
    print(
        f"{item['word']} -> {item['tag']}"
    )


print("\nFinal result:")
print(results)
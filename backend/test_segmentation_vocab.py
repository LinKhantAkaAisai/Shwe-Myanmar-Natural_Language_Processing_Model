import json
from pathlib import Path


DATA_DIR = Path("data/segmentation")

TRAIN_PATH = DATA_DIR / "train.jsonl"
VAL_PATH = DATA_DIR / "validation.jsonl"
TEST_PATH = DATA_DIR / "test.jsonl"


def load_jsonl(path):
    data = []

    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()

            if line:
                data.append(json.loads(line))

    return data


def build_vocab(datasets):
    # Special tokens
    vocab = {
        "<PAD>": 0,
        "<UNK>": 1,
    }

    # Add every segmentation unit
    for dataset in datasets:
        for item in dataset:
            for unit in item["seg_units"]:
                if unit not in vocab:
                    vocab[unit] = len(vocab)

    return vocab


print("Loading datasets...")

train_data = load_jsonl(TRAIN_PATH)
val_data = load_jsonl(VAL_PATH)
test_data = load_jsonl(TEST_PATH)

print("\n✅ Datasets loaded successfully!")

print("\nDataset sizes:")
print("Train:", len(train_data))
print("Validation:", len(val_data))
print("Test:", len(test_data))


# Check first training sample
sample = train_data[0]

print("\nFirst sample:")
print("Text:", sample["text"])

print("\nNumber of seg_units:")
print(len(sample["seg_units"]))

print("Number of seg_labels:")
print(len(sample["seg_labels"]))

assert len(sample["seg_units"]) == len(sample["seg_labels"])

print("\n✅ seg_units and seg_labels are aligned!")


# Build vocabulary
print("\nBuilding vocabulary...")

vocab = build_vocab([
    train_data,
    val_data,
    test_data,
])

print("\n✅ Vocabulary created!")

print("Vocabulary size:", len(vocab))

print("\nFirst 20 vocabulary items:")

for unit, unit_id in list(vocab.items())[:20]:
    print(repr(unit), "->", unit_id)
import json
from pathlib import Path

import torch
import torch.nn as nn
from safetensors.torch import load_file


# --------------------------------------------------
# Paths
# --------------------------------------------------

DATA_DIR = Path("data/segmentation")
MODEL_DIR = Path("models/segmentation")

TRAIN_PATH = DATA_DIR / "train.jsonl"
VAL_PATH = DATA_DIR / "validation.jsonl"
TEST_PATH = DATA_DIR / "test.jsonl"

MODEL_PATH = MODEL_DIR / "model.safetensors"


# --------------------------------------------------
# Load JSONL
# --------------------------------------------------

def load_jsonl(path):
    data = []

    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()

            if line:
                data.append(json.loads(line))

    return data


# --------------------------------------------------
# Build vocabulary
# --------------------------------------------------

def build_vocab(datasets):
    vocab = {
        "<PAD>": 0,
        "<UNK>": 1,
    }

    for dataset in datasets:
        for item in dataset:
            for unit in item["seg_units"]:
                if unit not in vocab:
                    vocab[unit] = len(vocab)

    return vocab


# --------------------------------------------------
# Custom Transformer model
# --------------------------------------------------

class TransformerSegmenter(nn.Module):

    def __init__(
        self,
        vocab_size,
        num_classes=3,
        d_model=128,
        nhead=4,
        num_layers=2,
        max_len=256,
    ):
        super().__init__()

        self.embedding = nn.Embedding(
            vocab_size,
            d_model,
            padding_idx=0,
        )

        self.pos_embedding = nn.Embedding(
            max_len,
            d_model,
        )

        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=nhead,
            batch_first=True,
        )

        self.transformer = nn.TransformerEncoder(
            encoder_layer,
            num_layers=num_layers,
        )

        self.classifier = nn.Linear(
            d_model,
            num_classes,
        )

    def forward(self, input_ids):

        batch_size, seq_len = input_ids.shape

        positions = torch.arange(
            seq_len,
            device=input_ids.device,
        ).unsqueeze(0)

        x = (
            self.embedding(input_ids)
            + self.pos_embedding(positions)
        )

        padding_mask = input_ids.eq(0)

        x = self.transformer(
            x,
            src_key_padding_mask=padding_mask,
        )

        logits = self.classifier(x)

        return logits


# --------------------------------------------------
# Load datasets
# --------------------------------------------------

print("Loading datasets...")

train_data = load_jsonl(TRAIN_PATH)
val_data = load_jsonl(VAL_PATH)
test_data = load_jsonl(TEST_PATH)

print("✅ Datasets loaded!")


# --------------------------------------------------
# Build vocabulary
# --------------------------------------------------

print("\nBuilding vocabulary...")

vocab = build_vocab([
    train_data,
    val_data,
    test_data,
])

print("Vocabulary size:", len(vocab))

assert len(vocab) == 1401

print("✅ Vocabulary matches model config!")


# --------------------------------------------------
# Create model
# --------------------------------------------------

print("\nCreating TransformerSegmenter...")

model = TransformerSegmenter(
    vocab_size=1401,
    num_classes=3,
    d_model=128,
    nhead=4,
    num_layers=2,
    max_len=256,
)

print("✅ Model architecture created!")


# --------------------------------------------------
# Load trained weights
# --------------------------------------------------

print("\nLoading model weights...")

state_dict = load_file(str(MODEL_PATH))

print("Number of tensors in checkpoint:", len(state_dict))

model.load_state_dict(state_dict)

model.eval()

print("✅ Trained weights loaded successfully!")


# --------------------------------------------------
# Show model
# --------------------------------------------------

print("\nModel:")
print(model)

print("\n🎉 CUSTOM SEGMENTATION MODEL READY!")

# --------------------------------------------------
# Inference
# --------------------------------------------------

import regex


ID2LABEL = {
    0: "<PAD>",
    1: "B",
    2: "I",
}


def graphemes(text):
    return regex.findall(r"\X", text)


def segment_sentence(text):
    # Convert Burmese text into the same units used during training
    units = graphemes(text)

    print("\nInput text:")
    print(text)

    print("\nSegmentation units:")
    print(units)

    print("\nNumber of units:", len(units))

    # Model supports maximum 256 units
    if len(units) > 256:
        units = units[:256]
        print("⚠️ Input truncated to 256 units.")

    # Convert units to vocabulary IDs
    input_ids = [
        vocab.get(unit, vocab["<UNK>"])
        for unit in units
    ]

    input_tensor = torch.tensor(
        [input_ids],
        dtype=torch.long,
    )

    # Prediction
    with torch.no_grad():
        logits = model(input_tensor)

        predictions = torch.argmax(
            logits,
            dim=-1,
        )[0].tolist()

    labels = [
        ID2LABEL[prediction]
        for prediction in predictions
    ]

    print("\nPredicted labels:")

    for unit, label in zip(units, labels):
        print(repr(unit), "->", label)

    # Reconstruct words from B/I labels
    words = []
    current_word = ""

    for unit, label in zip(units, labels):

        if label == "B":
            if current_word:
                words.append(current_word)

            current_word = unit

        elif label == "I":
            current_word += unit

        else:
            # Should normally not occur for real input,
            # because 0 is the PAD label.
            if current_word:
                words.append(current_word)
                current_word = ""

    if current_word:
        words.append(current_word)

    return words


# --------------------------------------------------
# Test sentence
# --------------------------------------------------

test_text = "ကျွန်တော်မနက်ဖြန်ကျောင်းသွားမယ်။"

segmented_words = segment_sentence(test_text)

print("\n====================================")
print("SEGMENTATION RESULT")
print("====================================")

print(segmented_words)

print("\nReadable result:")
print(" | ".join(segmented_words))
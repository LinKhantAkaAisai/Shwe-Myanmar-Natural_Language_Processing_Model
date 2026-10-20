import json
from pathlib import Path

import regex
import torch
import torch.nn as nn
from safetensors.torch import load_file


# =========================================================
# Paths
# =========================================================

BACKEND_DIR = Path(__file__).resolve().parents[2]

DATA_DIR = BACKEND_DIR / "data" / "segmentation"
MODEL_DIR = BACKEND_DIR / "models" / "segmentation"

TRAIN_PATH = DATA_DIR / "train.jsonl"
VAL_PATH = DATA_DIR / "validation.jsonl"
TEST_PATH = DATA_DIR / "test.jsonl"

MODEL_PATH = MODEL_DIR / "model.safetensors"


# =========================================================
# Labels
# =========================================================

ID2LABEL = {
    0: "<PAD>",
    1: "B",
    2: "I",
}


# =========================================================
# Load dataset
# =========================================================

def load_jsonl(path: Path):
    data = []

    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()

            if line:
                data.append(json.loads(line))

    return data


# =========================================================
# Build vocabulary
# =========================================================

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


# =========================================================
# Transformer model
# =========================================================

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

        return self.classifier(x)


# =========================================================
# Load vocabulary
# =========================================================

print("Loading segmentation datasets...")

train_data = load_jsonl(TRAIN_PATH)
val_data = load_jsonl(VAL_PATH)
test_data = load_jsonl(TEST_PATH)

vocab = build_vocab([
    train_data,
    val_data,
    test_data,
])

print(f"Segmentation vocabulary size: {len(vocab)}")

if len(vocab) != 1401:
    raise RuntimeError(
        f"Unexpected vocabulary size: {len(vocab)}. Expected 1401."
    )


# =========================================================
# Load model
# =========================================================

print("Loading Burmese segmentation model...")

model = TransformerSegmenter(
    vocab_size=1401,
    num_classes=3,
    d_model=128,
    nhead=4,
    num_layers=2,
    max_len=256,
)

state_dict = load_file(str(MODEL_PATH))

model.load_state_dict(state_dict)

model.eval()

print("Burmese segmentation model loaded successfully!")


# =========================================================
# Text preprocessing
# =========================================================

def graphemes(text: str) -> list[str]:
    return regex.findall(r"\X", text)


# =========================================================
# Segmentation
# =========================================================

def segment_text(text: str) -> list[str]:

    text = text.strip()

    if not text:
        return []

    units = graphemes(text)

    # Model maximum sequence length
    if len(units) > 256:
        units = units[:256]

    input_ids = [
        vocab.get(unit, vocab["<UNK>"])
        for unit in units
    ]

    input_tensor = torch.tensor(
        [input_ids],
        dtype=torch.long,
    )

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

    words = []
    current_word = ""

    for unit, label in zip(units, labels):

        if label == "B":

            if current_word:
                words.append(current_word)

            current_word = unit

        elif label == "I":

            current_word += unit

    if current_word:
        words.append(current_word)

    return words
# Shwe Myanmar (ရွှေမြန်မာ)
> **Burmese Text Analysis and Annotation System**  
> *AI-assisted Word Segmentation and Part-of-Speech (POS) Tagging using Fine-Tuned Transformers & Multilingual BERT.*

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-ee4c2c?logo=pytorch)](https://pytorch.org/)
[![Hugging Face](https://img.shields.io/badge/Transformers-mBERT-yellow?logo=huggingface)](https://huggingface.co/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0-61dafb?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Overview

Burmese is a low-resource language where whitespace does not reliably indicate word boundaries. This presents significant challenges for downstream Natural Language Processing (NLP) tasks. 

**Shwe Myanmar** is an end-to-end NLP platform designed to perform automated **Word Segmentation** and **Part-of-Speech (POS) Tagging** on Burmese text. It combines fine-tuned deep learning models with an interactive web UI that supports real-time visualization and human-in-the-loop annotation adjustments.

---

## ✨ Key Features

- ✂️ **Syllable & Word Segmentation:** Predicts word boundaries using learned `B` (Begin) and `I` (Inside) sequence labels.
- 🏷️ **15-Class POS Tagging:** Categorizes Burmese words into 15 grammatical classes using fine-tuned Multilingual BERT (`bert-base-multilingual-cased`).
- ⚡ **High-Performance API:** Powered by FastAPI for asynchronous model inference.
- 🖥️️ **Modern Web Interface:** Interactive React frontend featuring color-coded linguistic outputs and live text analytics (character, syllable, word, and tag counts).
- 🧪 **Robustness Testing:** Evaluated across multi-sentence contexts to measure attention decay and sequence boundary stability.

---

## 📐 System Architecture
---


```text
               ┌─────────────────────────┐
               │    Raw Burmese Text     │
               └────────────┬────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
  ┌───────────────────┐           ┌───────────────────┐
  │ Segmentation Model│           │ POS Tagging Model │
  │(Transformer Enc.) │           │(Fine-Tuned mBERT) │
  └─────────┬─────────┘           └─────────┬─────────┘
            │                               │
            ▼                               ▼
  ┌───────────────────┐           ┌─────────────────────┐
  │  Word Boundaries  │           │  POS Tag Annotations│
  └─────────┬─────────┘           └─────────┬───────────┘
            │                               │
            └───────────────┬───────────────┘
                            ▼
               ┌─────────────────────────┐
               │  Combined UI Output /   │
               │    JSON API Response    │
               └─────────────────────────┘

```   
---

## 📊 Dataset & Preprocessing

The system is trained and evaluated on an updated version of the **myPOS Version 3.0** corpus:

* **Total Dataset Size:** 42,052 processed records
* **Train / Validation / Test Split:** 80 / 10 / 10 split (Random Seed 42)

| Dataset Split | Record Count |
| :--- | :--- |
| **Training** | 33,641 |
| **Validation** | 4,205 |
| **Test** | 4,206 |
| **Total** | **42,052** |

### POS Class Mapping (15 Classes)
`abb` (Abbreviation), `adj` (Adjective), `adv` (Adverb), `conj` (Conjunction), `fw` (Foreign Word), `int` (Interjection), `n` (Noun), `num` (Number), `part` (Particle), `ppm` (Postpositional Marker), `pron` (Pronoun), `punc` (Punctuation), `sb` (Symbol), `tn` (Title Name), `v` (Verb).

---

## 📈 Model Performance & Evaluation

### 1. Word Segmentation Model (Transformer-based Encoder)
- **Architecture:** 2 Transformer Layers, 4 Attention Heads, Embedding Dim 128
- **Test Accuracy:** `96.93%` | **Test F1-Score:** `0.9682` | **Test Loss:** `0.0778`

#### Multi-Sentence Robustness Experiment (Segmentation)
| Input Length | Correct Tokens | Wrong Tokens | Accuracy | Precision | Recall | F1 Score |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1 Sentence** | 41,757 | 1,323 | 96.93% | 96.74% | 96.91% | 96.82% |
| **2 Sentences** | 81,143 | 5,017 | 94.18% | 93.92% | 94.15% | 94.03% |
| **5 Sentences** | 196,876 | 18,524 | 91.40% | 91.08% | 91.38% | 91.23% |
| **10 Sentences** | 377,294 | 53,506 | 87.58% | 87.21% | 87.52% | 87.36% |

---

### 2. POS Tagging Model Comparison
We evaluated **Fine-tuned mBERT** against an **mBERT + BiLSTM + CRF** setup over the same 54,351 evaluated test word positions:

| Architecture | Accuracy | Macro Precision | Macro Recall | Macro F1 | Weighted F1 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Fine-Tuned mBERT (Selected)** | **0.9688** | **0.9580** | **0.9575** | **0.9576** | **0.9689** |
| mBERT + BiLSTM + CRF | 0.9674 | 0.9423 | 0.9491 | 0.9440 | 0.9676 |

*Note: Fine-tuned mBERT was selected for production deployment due to superior Macro F1 performance and simpler deployment complexity.*

---

## 🛠️ Tech Stack

- **Core & NLP Pipeline:** Python 3.10+, PyTorch, Hugging Face `transformers`, `seqeval`, `scikit-learn`, `pandas`
- **Backend API:** FastAPI, Uvicorn, Pydantic
- **Frontend App:** React, TypeScript, Vite, Tailwind CSS
- **Experimentation:** Google Colab (GPU accelerated)

---

## 📁 Repository Structure

```text
Shwe-Myanmar/
├── data/
│   ├── processed/
│   │   ├── id2pos.json
│   │   ├── pos2id.json
│   │   ├── train.jsonl
│   │   ├── validation.jsonl
│   │   └── test.jsonl
│   ├── raw/
│   │   └── mypos_v3/
│   └── samples/
├── backend/
│   ├── main.py              # FastAPI application server
│   ├── models/              # Saved model checkpoints & inference loaders
│   └── requirements.txt
├── frontend/
│   ├── src/                 # React + TypeScript components & UI views
│   ├── package.json
│   └── vite.config.ts
├── notebooks/               # Colab training & evaluation notebooks
├── README.md
└── LICENSE
```         
🚀 Installation & Local Setup
Prerequisites
Python 3.10 or higher

Node.js 18+ and npm / pnpm

1. Clone the Repository
   git clone [https://github.com/your-username/Shwe-Myanmar.git](https://github.com/your-username/Shwe-Myanmar.git)
cd Shwe-Myanmar

2.Setups
  git lfs install
  git lfs pull
  git lfs ls-files

  output:
    backend/models/pos/model.safetensors
    backend/models/segmentation/model.safetensors

  ##Backend
  python -m venv .venv
  .\.venv\Scripts\Activate.ps1
  python -m pip install --upgrade pip
  pip install -r requirements.txt
  uvicorn app.main:app --reload


  ##Frontend
  npm install
  npm run dev

  Sample Response 
  {
  "text": "ကျွန်တော်မနက်ဖြန်ကျောင်းသွားမယ်။",
  "statistics": {
    "characters": 32,
    "syllables": 19,
    "words": 6,
    "pos_tags": 5
  },
  "words": ["ကျွန်တော်", "မနက်ဖြန်", "ကျောင်း", "သွား", "မယ်", "။"],
  "pos_tags": [
    {"word": "ကျွန်တော်", "tag": "pron", "label": "Pronoun"},
    {"word": "မနက်ဖြန်", "tag": "n", "label": "Noun"},
    {"word": "ကျောင်း", "tag": "n", "label": "Noun"},
    {"word": "သွား", "tag": "v", "label": "Verb"},
    {"word": "မယ်", "tag": "part", "label": "Particle"},
    {"word": "။", "tag": "punc", "label": "Punctuation"}
  ]
}

  ## 👥 Contributors & Team Roles

Developed as part of the Natural Language Processing Project at **Myanmar Institute of Information Technology (MIIT)**.

| Student ID | Name | Main Responsibility |
| :--- | :--- | :--- |
| **2021-MIIT-CSE-032** | **May Myat Noe Phyu** | Dataset Collection, Normalization, B/I Segmentation Labels, POS Mappings |
| **2021-MIIT-CSE-027** | **Lin Khant Min Maung** | Burmese Tokenization, Token Alignment, Segmentation Model Fine-Tuning & Evaluation |
| **2021-MIIT-CSE-093** | **Yoon Moh Moh Aung** | POS Model Fine-Tuning, mBERT / BiLSTM-CRF Experiments, Per-Class Metrics |
| **2021-MIIT-CSE-092** | **Yoon Cherry** | FastAPI Backend Service Integration, React/TypeScript Web UI, Visualization |
  

# Shwe Myanmar Dataset Preprocessing Report

## Dataset

Dataset: myPOS Version 3.0

## Preprocessing

- Loaded Burmese text using UTF-8.
- Parsed word/POS annotations.
- Preserved compound-word information.
- Normalized text using Unicode NFC.
- Validated token/POS alignment.
- Standardized the POS label set.
- Created POS-to-ID and ID-to-POS mappings.
- Created B/I word-segmentation labels.
- Used Unicode grapheme clusters with regex \\X.
- Removed duplicate records.
- Removed duplicated sentence texts before splitting.
- Split the final dataset into train/validation/test.
- Used random seed 42.

## Final Dataset

Final clean records: 41922

Train records: 33537

Validation records: 4192

Test records: 4193

Number of POS classes: 15

## Segmentation

B = Beginning of a word

I = Inside a word

## Validation

Train/Validation overlap: 0

Train/Test overlap: 0

Validation/Test overlap: 0

## Output Files

- train.jsonl
- validation.jsonl
- test.jsonl
- pos2id.json
- id2pos.json
- sample_100.jsonl
- sample_500.jsonl
- segmentation_sample_100.jsonl
- pos_sample_100.jsonl
- pos_distribution.csv
- segmentation_distribution.csv

from app.services.pos_service import predict_pos


words = [
    "ကျွန်တော်",
    "မနက်ဖြန်",
    "ကျောင်း",
    "သွား",
    "မယ်",
    "။",
]


print("Input words:")
print(words)

results = predict_pos(words)

print("\nPOS Results:")

for item in results:
    print(
        f"{item['word']} -> {item['tag']}"
    )

print("\nRaw result:")
print(results)
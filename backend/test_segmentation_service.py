from app.services.segmentation_service import segment_text


text = "ကျွန်တော်မနက်ဖြန်ကျောင်းသွားမယ်။"

print("Input:")
print(text)

words = segment_text(text)

print("\nSegmented words:")
print(words)

print("\nReadable:")
print(" | ".join(words))
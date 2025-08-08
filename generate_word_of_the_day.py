import os
import json
import random
from datetime import datetime

# Path to English dictionary JSON
DICT_PATH = os.path.join("src", "dictionary", "en.json")

# Load words from the game's dictionary
with open(DICT_PATH, "r", encoding="utf-8") as f:
    words = json.load(f)

# Pick random word
word = random.choice(words)

# Date
today = datetime.now().strftime("%Y-%m-%d")

# Markdown output
content = f"# Word of the Day – {today}\n\n" \
          f"**Word:** {word}\n\n" \
          f"**Definition:** _(To be filled manually or automated later)_\n\n" \
          f"*Example usage:* _Write your own example here._\n"

# Create folder if needed
os.makedirs("word_of_the_day", exist_ok=True)

# Save file
file_path = os.path.join("word_of_the_day", f"{today}.md")
with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"[SUCCESS] Word of the Day saved: {file_path}")
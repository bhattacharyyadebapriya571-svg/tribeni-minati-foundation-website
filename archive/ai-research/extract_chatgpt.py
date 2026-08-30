import json
import re

file_path = r'C:\Users\somas\.gemini\antigravity\brain\73100333-34c5-4a3e-b8bf-248edc9923bb\.system_generated\steps\4706\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Search for React/Next JSON state
pattern = r'<script[^>]*id="__NEXT_DATA__"[^>]*>(.*?)</script>'
m = re.search(pattern, text, re.DOTALL)
if not m:
    # Try finding serverState or JSON blocks
    m = re.search(r'window\.__remixContext\s*=\s*(.*?);</script>', text, re.DOTALL)

# Let's search for all JSON-like strings containing conversation messages
chunks = []
for block in re.finditer(r'\{[^{}]*"text":\s*"([^"]+)"[^{}]*\}', text):
    content = block.group(1)
    if len(content) > 30 and not content.startswith('http'):
        chunks.append(content)

with open('chatgpt_extracted_text.txt', 'w', encoding='utf-8') as out:
    for i, c in enumerate(chunks):
        out.write(f"--- CHUNK {i+1} ---\n{c}\n\n")

print(f"Total extracted chunks: {len(chunks)}")

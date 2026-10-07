import re
import os
import json
import time
from deep_translator import GoogleTranslator

translator = GoogleTranslator(source='id', target='en')

def translate_text(text):
    if not text.strip(): return text
    try:
        # Avoid translating obvious math expressions if the whole string is just math
        if re.match(r'^[\W\d_a-zA-Z]+$', text) and len(text) < 15 and not any(c.isalpha() for c in text):
            return text
        
        translated = translator.translate(text)
        time.sleep(0.05)
        return translated
    except Exception as e:
        print(f"Error translating: {text[:20]}... Error: {e}")
        return text

def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find string literals: we will look for '...' and "..."
    # But ONLY for specific keys to avoid breaking code like import paths, CSS colors, React keys etc.
    # The keys in mathData.ts and quizStorage.ts:
    # title: '...', summary: '...', detailedOverview: '...', '...', name: '...', desc: '...', note: '...', question: '...', answer: '...', explanation: '...', text: '...'
    
    # We will use regex to find specific object properties
    keys_to_translate = ['title', 'summary', 'detailedOverview', 'name', 'desc', 'note', 'question', 'answer', 'explanation', 'tips', 'text']
    
    for key in keys_to_translate:
        # Match `key: '...'` or `key: "..."`
        # Using a simplistic approach: find the key, and the string next to it.
        # This regex handles single quotes. (mathData.ts uses single quotes mostly)
        pattern = r"(" + key + r"\s*:\s*)'([^'\\]*(?:\\.[^'\\]*)*)'"
        
        def repl(match):
            prefix = match.group(1)
            text_to_translate = match.group(2)
            # Only translate if it contains letters and looks like a real sentence/phrase
            if any(c.isalpha() for c in text_to_translate) and len(text_to_translate) > 2:
                # print(f"Translating {key}: {text_to_translate[:30]}...")
                translated = translate_text(text_to_translate)
                # Escape single quotes in translated text
                translated = translated.replace("'", "\\'")
                return f"{prefix}'{translated}'"
            return match.group(0)

        content = re.sub(pattern, repl, content)
        
        # Double quotes
        pattern_dq = r"(" + key + r"\s*:\s*)\"([^\"\\]*(?:\\.[^\"\\]*)*)\""
        
        def repl_dq(match):
            prefix = match.group(1)
            text_to_translate = match.group(2)
            if any(c.isalpha() for c in text_to_translate) and len(text_to_translate) > 2:
                translated = translate_text(text_to_translate)
                translated = translated.replace('"', '\\"')
                return f"{prefix}\"{translated}\""
            return match.group(0)

        content = re.sub(pattern_dq, repl_dq, content)

    # For points: ['...', '...'] arrays. We can look for strings inside brackets for points array.
    # Pattern: `points: [` followed by strings. This is a bit complex for simple regex.
    # Let's target the exact syntax in mathData.ts for array strings if possible.
    # Actually, we can just find any string that looks like Indonesian and translate it if it's long enough.
    # But that's risky. Let's just focus on the core properties.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Finished {filepath}")

# Paths
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base_dir, 'src', 'data')
utils_dir = os.path.join(base_dir, 'src', 'utils')

process_file(os.path.join(data_dir, 'mathData.ts'))
process_file(os.path.join(utils_dir, 'quizStorage.ts'))

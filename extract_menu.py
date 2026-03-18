import sys
import re
from pypdf import PdfReader

def extract_menu(pdf_path):
    try:
        reader = PdfReader(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        return

    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + "\n"

    # Define categories we want to look for
    categories = [
        "PASTA", "ZUPPE", "ANTIPASTI", "INSALATE", "RISOTTI", "CONTORNI",
        "PIZZE", "SECONDI DI CARNE", "SECONDI DI PESCE", "DOLCI DELLA CASA",
        "BIBITE ANALCOLICHE", "APERITIVI / SPRITZ", "BIRRE", "VINI BIANCHI",
        "VINI ROSSI", "VINI ROSÉ", "CAFFÈ E TÈ"
    ]

    lines = full_text.split('\n')
    
    current_category = "Uncategorized"
    menu = {}
    
    last_line_was_name = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check if line is a category header (exact match or starts with it)
        upper_line = line.upper()
        found_cat = False
        for cat in categories:
            if upper_line == cat:
                current_category = cat
                if current_category not in menu:
                    menu[current_category] = []
                found_cat = True
                break
        if found_cat:
            last_line_was_name = ""
            continue
            
        # Try to match items with prices
        # Price match at the end
        price_match = re.search(r'\.\s*\.\s*([\d,\.\s/]+)$', line)
        if price_match:
            price_str = price_match.group(1).strip()
            name_part = line[:price_match.start()].strip()
            
            # If name_part is just "V" or empty, use the previous line
            if (name_part == "V" or not name_part) and last_line_was_name:
                item_name = last_line_was_name
            else:
                item_name = name_part
                # Clean up name part (remove trailing V, *, or small headers)
                item_name = re.sub(r'\s+[V\*]\s*$', '', item_name).strip()
            
            if not item_name or item_name.startswith('.'):
                continue
                
            if current_category not in menu:
                menu[current_category] = []
            menu[current_category].append({"name": item_name, "price": price_str})
            last_line_was_name = "" # Reset after finding an item
        else:
            # This might be a name for the next line's price
            if not any(c in line for c in ".:"): # avoid lines that look like info
                last_line_was_name = line

    # Print results in a readable format
    for cat in categories + ["Uncategorized"]:
        if cat in menu and menu[cat]:
            print(f"\n--- {cat} ---")
            for item in menu[cat]:
                # Avoid printing section headers as items if they got caught
                if item['name'] in categories:
                    continue
                print(f"{item['name']} | {item['price']}")

if __name__ == "__main__":
    pdf_path = "_mirror/_ext/f7c627da-b6e1-448c-8c9e-4be138abf746.usrfiles.com/f7c627_b009ae523385494ab042ae7-c56de24eed.pdf"
    extract_menu(pdf_path)

import json
import re

try:
    with open('../list.xml', 'r', encoding='utf-8') as f:
        xml_content = f.read()
    
    # Extract each CameraIdentityCard
    pattern_card = re.compile(r'<CameraIdentityCard>(.*?)</CameraIdentityCard>', re.DOTALL)
    cards = pattern_card.findall(xml_content)
    
    cameras = []
    
    for card in cards:
        cam_data = {}
        # Simple generic property extractor for elements with content
        props = re.findall(r'<([a-zA-Z0-9_]+)[^>]*>(.*?)</\1>', card, re.DOTALL)
        for tag_name, tag_val in props:
            tag_name = tag_name.split(':')[-1] # clear namespace if any
            cam_data[tag_name] = tag_val.strip()
            
        # specifically handles empty ones that are self closing like <Resolution/>
        empty_props = re.findall(r'<([a-zA-Z0-9_]+)[^>]*/>', card)
        for tag_name in empty_props:
            tag_name = tag_name.split(':')[-1]
            if tag_name not in cam_data:
                cam_data[tag_name] = ""
                
        cameras.append(cam_data)

    js_content = "const cameras = " + json.dumps(cameras, indent=2) + ";"

    with open('cameras.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"Successfully converted {len(cameras)} cameras to cameras.js!")
except Exception as e:
    print(f"Error: {e}")

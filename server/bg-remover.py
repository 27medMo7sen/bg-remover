import sys
import io
import base64
from PIL import Image
from transformers import pipeline

image_path = sys.argv[1]
output_path = sys.argv[2]  

pipe = pipeline("image-segmentation", model="briaai/RMBG-1.4", trust_remote_code=True)

pillow_image = pipe(image_path)  
pillow_image.save(output_path, format="PNG")

with open(output_path, "rb") as f:
    encoded = base64.b64encode(f.read()).decode("utf-8")
print(encoded)
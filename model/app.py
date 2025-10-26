# from flask import request, Response, Flask, jsonify
# from waitress import serve
# from PIL import Image
# import json
# import numpy as np
# from keras.models import load_model
# from flask_cors import CORS

# class_names = ["Glass", "Metal", "Paper", "Plastic", "Battery", "Biological", "Trash"]

# app = Flask(__name__)
# CORS(app)

# @app.route("/")
# def root():
#     with open("index.html") as file:
#         return file.read()

# @app.route("/detect", methods=["POST"])
# def detect():
#     buf = request.files["image_file"]
#     image = Image.open(buf.stream)
#     boxes = detect_objects_on_image(image)
#     json_boxes = json.dumps(boxes)
#     print(json_boxes)
#     return json_boxes

# def detect_objects_on_image(image):
#     model = load_model("./keras_model.h5", compile=False)
#     model.summary()  # Print the model summary

#     input_shape = model.input_shape[1:3]
#     resized_image = image.resize(input_shape)
#     input_data = np.expand_dims(np.array(resized_image) / 255.0, axis=0)

#     predictions = model.predict(input_data)

#     boxes = []
#     for prediction in predictions:
#         x1, y1, x2, y2 = [round(coord) for coord in prediction[:4]]
#         class_id = np.argmax(prediction)
#         probability = round(float(prediction[class_id]), 2)
#         object_type = class_names[class_id]
#         boxes.append(object_type)

#     # print(boxes)
#     return boxes


# if __name__ == '__main__':
#     app.run(port=4000, debug=True)


from flask import Flask, request
from flask_cors import CORS
from PIL import Image
import requests
import json

app = Flask(__name__)
CORS(app)

API_URL = "https://detect.roboflow.com/e-waste-dataset-r0ojc/43"
API_KEY = "5MC8AUsJuFwYSNOTtDrE"

class_names = [
    "Air-Conditioner", "Bar-Phone", "Battery", "Blood-Pressure-Monitor", "Boiler",
    "CRT-Monitor", "CRT-TV", "Calculator", "Camera", "Ceiling-Fan", "Christmas-Lights",
    "Clothes-Iron", "Coffee-Machine", "Compact-Fluorescent-Lamps", "Computer-Keyboard",
    "Computer-Mouse", "Cooled-Dispenser", "Cooling-Display", "Dehumidifier", "Desktop-PC",
    "Digital-Oscilloscope", "Dishwasher", "Drone", "Electric-Bicycle", "Electric-Guitar",
    "Electrocardiograph-Machine", "Electronic-Keyboard", "Exhaust-Fan", "Flashlight",
    "Flat-Panel-Monitor", "Flat-Panel-TV", "Floor-Fan", "Freezer", "Glucose-Meter",
    "HDD", "Hair-Dryer", "Headphone", "LED-Bulb", "Laptop", "Microwave", "Music-Player",
    "Neon-Sign", "Network-Switch", "Non-Cooled-Dispenser", "Oven", "PCB",
    "Patient-Monitoring-System", "Photovoltaic-Panel", "PlayStation-5", "Power-Adapter",
    "Printer", "Projector", "Pulse-Oximeter", "Range-Hood", "Refrigerator",
    "Rotary-Mower", "Router", "SSD", "Server", "Smart-Watch", "Smartphone",
    "Smoke-Detector", "Soldering-Iron", "Speaker", "Stove",
    "Straight-Tube-Fluorescent-Lamp", "Street-Lamp", "TV-Remote-Control", "Table-Lamp",
    "Tablet", "Telephone-Set", "Toaster", "Tumble-Dryer", "USB-Flash-Drive",
    "Vacuum-Cleaner", "Washing-Machine", "Xbox-Series-X"
]

@app.route("/")
def root():
    with open("index.html") as file:
        return file.read()

@app.route("/detect", methods=["POST"])
def detect():
    buf = request.files["image_file"]
    image = Image.open(buf.stream)

    boxes = detect_objects_on_image(image)
    json_boxes = json.dumps(boxes)
    print(json_boxes)
    return json_boxes

def detect_objects_on_image(image):
    # Send the image to Roboflow
    buf = image.convert("RGB")
    buf.save("temp.jpg")  # Temporary save for upload

    with open("temp.jpg", "rb") as img:
        response = requests.post(
            API_URL,
            params={"api_key": API_KEY},
            files={"file": img}
        )

    if response.status_code != 200:
        print("Error:", response.text)
        return []

    result = response.json()
    predictions = result.get("predictions", [])

    boxes = []
    for pred in predictions:
        class_name = pred.get("class")
        if class_name in class_names:
            boxes.append(class_name)

    return boxes

if __name__ == '__main__':
    app.run(port=4000, debug=True)

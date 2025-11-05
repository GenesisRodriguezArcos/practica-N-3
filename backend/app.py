from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # permite que React acceda al backend

# Ruta que devuelve los datos del JSON
@app.route("/reportes", methods=["GET"])
def obtener_reportes():
    ruta = os.path.join(os.path.dirname(__file__), "data", "reportes.json")
    with open(ruta, "r", encoding="utf-8") as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

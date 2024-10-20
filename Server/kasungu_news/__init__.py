from flask import Flask, send_from_directory
from config import Config
from models import db
from routes import news_blueprint
import os

def create_app():
    app = Flask(__name__)
    
    # Load configurations
    app.config.from_object(Config)
    
    # Initialize database
    db.init_app(app)

    # Register Blueprints (routes)
    app.register_blueprint(news_blueprint)

    # Ensure the upload folder exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    
    # Route to serve uploaded files
    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    


    return app

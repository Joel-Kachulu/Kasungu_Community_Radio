import os

class Config:
    DEBUG = True
    SECRET_KEY = 'mfana0fakh1nga' 

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/kasungu_radio'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # File Upload settings
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

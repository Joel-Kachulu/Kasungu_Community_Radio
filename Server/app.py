from kasungu_news import create_app
from flask_migrate import Migrate
from models import db
from flask_cors import CORS


app = create_app()
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5174"]}})

migrate = Migrate(app, db)

if __name__ == "__main__":
    host="172.30.128.1"
    app.run(debug=True, host="0.0.0.0")

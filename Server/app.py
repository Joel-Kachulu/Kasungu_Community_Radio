from kasungu_news import create_app
from flask_migrate import Migrate
from models import db
from flask_cors import CORS


app = create_app()
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True)

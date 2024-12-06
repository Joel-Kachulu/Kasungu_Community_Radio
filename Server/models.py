from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_bcrypt import Bcrypt
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash   
import hashlib


db = SQLAlchemy()
bcrypt = Bcrypt()

# Model for news articles
class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    published_at = db.Column(db.DateTime, default=datetime.utcnow)
    category = db.Column(db.String(50), nullable=False) 
    author = db.Column(db.String(50), nullable=False)
    is_editor_pick = db.Column(db.Boolean, default=False)
    is_popular = db.Column(db.Boolean, default=False) 
    
    
    def __repr__(self):
        return f'<News {self.title}>'
    
    @classmethod
    def count_articles_in_category(cls, category_name, cover_image_url=None):
    
        article_count = cls.query.filter_by(category=category_name).count()

        # Calculate the total number of articles
        total_articles = db.session.query(func.count(cls.id)).scalar()

        # Calculate the total number of unique categories
        total_categories = db.session.query(func.count(func.distinct(cls.category))).scalar()

        return {
            "category": category_name,
            "article_count": article_count,
            "cover_image_url": cover_image_url,
            "total_articles": total_articles,
            "total_categories": total_categories
        }
    

 

# Model for users (Authentication)
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Field for storing the hashed password
    is_admin = db.Column(db.Boolean, default=False)  # Admin flag

    def set_password(self, password):
        """Hash the password using SHA-256."""
        self.password_hash = hashlib.sha256(password.encode()).hexdigest()

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return self.password_hash == hashlib.sha256(password.encode()).hexdigest()
    
    @classmethod
    def total_users(cls):
        """
        Get the total number of registered users in the database.
        """
        return db.session.query(func.count(cls.id)).scalar()

    def __repr__(self):
        return f'<User {self.username}>'

    
class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.Integer, db.ForeignKey('news.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #article = db.relationship('News', back_populates='comments')

    def __repr__(self):
        return f'<Comment {self.id}>'
     
class Tags(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<Tag {self.name}>'



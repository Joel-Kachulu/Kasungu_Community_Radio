import os
from flask import Blueprint, jsonify, request, current_app, send_from_directory
from werkzeug.utils import secure_filename
from models import News, Comment, User, db
from sqlalchemy import func


news_blueprint = Blueprint('news', __name__)

# Function to check if a file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

# Route to serve the uploaded images
@news_blueprint.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)


@news_blueprint.route('/api/upload-image', methods=['POST'])
def upload_image():
    image = request.files.get('image')
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        image_url = f'http://127.0.0.1:5000/uploads/{filename}'  # Return public URL
        return jsonify({'image_url': image_url}), 201

    return jsonify({'error': 'Invalid file format'}), 400


@news_blueprint.route('/api/news', methods=['POST'])
def create_article():                         
    title = request.form.get('title')
    content = request.form.get('content')  # Stores HTML content with embedded images
    category = request.form.get('category')
    image = request.files.get('image')  # Cover image
    author = request.form.get('author')
    is_editor_pick = request.form.get('is_editor_pick', 'false') == 'true'
    is_popular = request.form.get('is_popular', 'false') == 'true'

    if not title or not content or not category:
        return jsonify({'error': 'Title, content, and category are required fields'}), 400

    # Handle cover image upload if provided
    image_url = None
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        # Use a full public URL for the image
        image_url = f'http://127.0.0.1:5000/uploads/{filename}'

    # Create a new article
    new_article = News(
        title=title,
        content=content,
        image_url=image_url,  # Stores the cover image URL
        category=category,
        author=author,
        is_editor_pick=is_editor_pick,
        is_popular=is_popular
    )

    db.session.add(new_article)
    db.session.commit()

    return jsonify({'message': 'Article created successfully', 'article_id': new_article.id}), 201



# Update a news article
@news_blueprint.route('/api/news/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    article = News.query.get(article_id) #Id srored in article
    
    if not article:
        return jsonify({'error': 'Article not found'}), 404 

    title = request.form.get('title', article.title)   #gettings article data from user form and storing pushing to queried article data
    content = request.form.get('content', article.content)
    category = request.form.get('category', article.category)
    image = request.files.get('image')
    author = request.form.get('author', article.author)

    # Update the image if a new one is uploaded
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        article.image_url = f'http://127.0.0.1:5000/uploads/{filename}'

    article.title = title
    article.content = content
    article.category = category
    article.author = author

    db.session.commit()

    return jsonify({'message': 'Article updated successfully', 'article_id': article.id}), 200


# Delete a news article
@news_blueprint.route('/api/news/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    article = News.query.get(article_id)
    
    if not article:
        return jsonify({'error': 'Article not found'}), 404

    # Delete the image file from the file system
    if article.image_url and os.path.exists(article.image_url):
        os.remove(article.image_url)

    db.session.delete(article)
    db.session.commit()

    return jsonify({'message': 'Article deleted successfully'}), 200

# Get all articles from a specific category
@news_blueprint.route('/api/news/category/<string:category>', methods=['GET'])
def get_articles_by_category(category):  # Add 'category' as a function argument
    try:
        # Query the database for articles that match the category
        articles = News.query.filter_by(category=category).all()

        if not articles:
            return jsonify({'error': 'No articles found in this category'}), 404

        # Convert articles to a dictionary format with unique titles as keys
        articles_dict = {}
        for article in articles:
            articles_dict[article.title] = {
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'image_url': article.image_url,
                'published_at': article.published_at,
                'category': article.category,
                'author': article.author
            }

        return jsonify(articles_dict), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    

@news_blueprint.route('/api/news/random_by_category', methods=['GET'])
def get_random_article_by_category():
    try:
        # Get distinct categories
        categories = News.query.with_entities(News.category).distinct().all()
        random_articles = {}
        
        # Loop through each category tuple and fetch a random article
        for category_tuple in categories:
            category = category_tuple[0]  # Extract the category string from the tuple
            article = News.query.filter_by(category=category).order_by(func.rand()).first()  # Fetch a random article

            if article:
                random_articles[category] = {
                    'id': article.id,
                    'title': article.title,
                    'content': article.content,
                    'image_url': article.image_url,
                    'published_at': article.published_at,
                    'category': article.category,
                    'author': article.author
                }
        
        # If there are no random articles found, return an empty response
        if not random_articles:
            return jsonify({'error': 'No articles found'}), 404
        
        return jsonify(random_articles), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
  
#returns article sum and latest sum of that category
@news_blueprint.route('/api/news/categories/sum', methods=['GET'])
def get_all_categories():
    try:
        # Get distinct categories
        categories = News.query.with_entities(News.category).distinct().all()
        article_sum = 10 + 20  # Extract sum 
        if article_sum == 30:
          res = "Nyatwa"
            

          return jsonify({'sum':  res}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# Get latest news articles
@news_blueprint.route('/api/news/latest', methods=['GET'])
def get_latest_articles():
    try:
        latest_articles = News.query.order_by(News.published_at.desc()).limit(8).all()
        
        # Initialize an empty dictionary to store articles
        articles_dict = {}

        # Loop through each article and add it to the dictionary
        for article in latest_articles:
            articles_dict[article.id] = {
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'image_url': article.image_url,
                'published_at': article.published_at,
                'category': article.category,
                'author': article.author
            }

        # Return the articles wrapped in a response dictionary
        return jsonify({"articles": articles_dict}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# Get editors' picks
@news_blueprint.route('/api/news/editor_picks', methods=['GET'])
def get_editor_picks():
    try:
        editor_picks = News.query.filter_by(is_editor_pick=True).order_by(News.published_at.desc()).all()
        articles_dict = {}
        for article in editor_picks:
            articles_dict[article.title] = {
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'image_url': article.image_url,
                'published_at': article.published_at,
                'category': article.category,
                'author': article.author
            }
        return jsonify(articles_dict), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Get popular posts
@news_blueprint.route('/api/news/popular', methods=['GET'])
def get_popular_posts():
    try:
        popular_posts = News.query.filter_by(is_popular=True).order_by(News.published_at.desc()).all()
        articles_dict = {}
        for article in popular_posts:
            articles_dict[article.title] = {
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'image_url': article.image_url,
                'published_at': article.published_at,
                'category': article.category,
                'author': article.author
            }
        return jsonify({'popular': articles_dict}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Search articles by keyword
@news_blueprint.route('/api/news/search', methods=['GET'])
def search_articles():
    keyword = request.args.get('keyword', '')

    if not keyword:
        return jsonify({'error': 'Keyword is required'}), 400

    try:
        # Query articles that match the keyword in title or content
        results = News.query.filter(
            (News.title.like(f'%{keyword}%')) | (News.content.like(f'%{keyword}%'))
        ).order_by(News.published_at.desc()).all()

        if not results:
            return jsonify({'error': 'No articles found'}), 404

        # Return articles as a list, not using title as a key
        articles_list = []
        for article in results:
            articles_list.append({
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'image_url': article.image_url,
                'published_at': article.published_at,
                'category': article.category,
                'author': article.author
            })

        return jsonify(articles_list), 200

    except Exception as e:
        # Optionally log the error here for debugging
        return jsonify({'error': str(e)}), 500


# Add a comment to an article
@news_blueprint.route('/api/news/<int:article_id>/comments', methods=['POST'])
def add_comment(article_id):
    data = request.get_json()

    content = data.get('content')
    author = data.get('author')

    if not content or not author:
        return jsonify({'error': 'Content and author are required fields'}), 400

    article = News.query.get(article_id)
    if not article:
        return jsonify({'error': 'Article not found'}), 404

    new_comment = Comment(
        article_id=article_id,
        content=content,
        author=author
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify({'message': 'Comment added successfully'}), 201


@news_blueprint.route('/api/news/comments/recent', methods=['GET'])
def get_recent_comments():
     comments = (
        db.session.query(Comment, News.title)
        .join(News, Comment.article_id == News.id)
        .all()
    )

    # Format the comments to include article title
     comments_list = [
         {
             "author": comment.author,
             "content": comment.content,
             "article_id": comment.article_id,
             "article_title": title  # add title from News model here
         }
         for comment, title in comments
     ]
 
     return jsonify({"comments": comments_list}), 200


# Register a new user
@news_blueprint.route('/api/users/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


# Log in a user
@news_blueprint.route('/api/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 400

    return jsonify({'message': 'Logged in successfully', 'user_id': user.id}), 200


# Get an article by ID
@news_blueprint.route('/api/news/<int:article_id>', methods=['GET'])
def get_article_by_id(article_id):
    try:
        # Query the database for the article with the given ID
        article = News.query.get(article_id)

        if not article:
            return jsonify({'error': 'Article not found'}), 404

        # Convert the article object to a dictionary format
        article_data = {
            'id': article.id,
            'title': article.title,
            'content': article.content,
            'image_url': article.image_url,
            'published_at': article.published_at,
            'category': article.category,
            'author': article.author
        }

        return jsonify(article_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

    #add route that returns the total number of news articles published in each category and the sum of the latest in that category too
    #i will connect to the categories component, the category cards will have to render category name, how many articles in that category /n
    # and how many are latest and a simple description

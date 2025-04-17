import os
import requests
from requests_oauthlib import OAuth1
from dotenv import load_dotenv
import tempfile

load_dotenv()

def download_image(image_url: str) -> str:
    """Download image from URL and return temporary file path"""
    try:
        response = requests.get(image_url, stream=True)
        response.raise_for_status()
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
            for chunk in response.iter_content(1024):
                temp_file.write(chunk)
            return temp_file.name
    except Exception as e:
        raise Exception(f"Error downloading image: {str(e)}")

def upload_media_to_twitter(image_path: str) -> str:
    """Upload media to Twitter and return media_id"""
    try:
        upload_url = "https://upload.twitter.com/1.1/media/upload.json"
        
        auth = OAuth1(
            os.getenv('TWITTER_API_KEY'),
            os.getenv('TWITTER_API_SECRET'),
            os.getenv('TWITTER_ACCESS_TOKEN'),
            os.getenv('TWITTER_ACCESS_SECRET')
        )
        
        with open(image_path, 'rb') as file:
            response = requests.post(upload_url, auth=auth, files={'media': file})
            response.raise_for_status()
            
        return response.json().get('media_id_string')
    except Exception as e:
        raise Exception(f"Error uploading media to Twitter: {str(e)}")
    finally:
        try:
            os.unlink(image_path)
        except:
            pass

def post_tweet_with_media(text: str, media_id: str):
    """Post tweet with attached media"""
    try:
        url = "https://api.twitter.com/2/tweets"
        
        auth = OAuth1(
            os.getenv('TWITTER_API_KEY'),
            os.getenv('TWITTER_API_SECRET'),
            os.getenv('TWITTER_ACCESS_TOKEN'),
            os.getenv('TWITTER_ACCESS_SECRET')
        )
        
        payload = {
            "text": text,
            "media": {"media_ids": [media_id]}
        }
        
        response = requests.post(url, auth=auth, json=payload)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise Exception(f"Error posting tweet: {str(e)}")

def post_tweet_with_image_from_url(caption: str, image_url: str):
    """Complete workflow to post tweet with image from URL"""
    image_path = download_image(image_url)
    media_id = upload_media_to_twitter(image_path)
    return post_tweet_with_media(caption, media_id)
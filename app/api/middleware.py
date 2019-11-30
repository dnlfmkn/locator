from functools import wraps
from flask import session, json

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        authorization = session.get('user_token', None)
        if not authorization:
            return (json.dumps({'error': 'No authorization provided'}), 401, \
                 {'Content-type': 'application/json'})
        return f(*args, **kwargs)
    return wrap
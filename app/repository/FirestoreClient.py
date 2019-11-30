import firebase_admin
import google.cloud
from firebase_admin import credentials, firestore

class FirestoreClient:
  db = {}
  
  def __init__(self):
    try:
      cred = credentials.Certificate('../../locator-credentials.json')
      firebase_admin.initialize_app(cred, {
        'project_id': 'locator-257401'
      })
      self.db = firestore.client()
    except Exception as e:
      print('[Error] FirestoreClient#__init__ -> {}'.format(e))

  def add(self, path, data):
    try:
      doc_ref = self.db.collection(path).document()
      doc_ref.set(data)
      return doc_ref
    except Exception as e:
      print('[Error] FirestoreClient#add -> {}'.format(e))
  
<<<<<<< HEAD
=======
  #tested
>>>>>>> b8b6450f9adb1c2b0db3815f77625131d631f680
  def read(self, cpath, document=None):         #cpath is collection 
    try:
      doc_ref = self.db.collection(cpath) 
      if document is not None:
        doc_ref = doc_ref.document(document)
        return doc_ref.get().to_dict()
      return doc_ref.get()
    except Exception as e:
      print('[Error] FirestoreClient#read -> {}'.format(e))
  
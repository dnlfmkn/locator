functions = require('firebase-functions');
admin = require('firebase-admin');

admin.initializeApp()
const APP_NAME = 'locator'

exports.addNewUser = functions.auth.user().onCreate((user) => {
  const data = {
    un: user.displayName,
    email: user.email,
    joined: user.metadata.creationTime,
  }
  admin.firestore().collection('users').doc(user.uid).set(data)
})


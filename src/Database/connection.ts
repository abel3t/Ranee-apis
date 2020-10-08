'use strict';

import mongoose from 'mongoose';
import firebase, { ServiceAccount } from 'firebase-admin';

import logger from 'Core/Logger';

function connectMongoDB() {
  const MONGO_URL: string = process.env.MONGO_URL || '';
  mongoose.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(
      () => logger.info('Database is Connected!'),
      () => logger.info('Can\'t connect to the Database')
    );
}


function connectFirebase() {
  const serviceAccount: ServiceAccount = {
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  };

  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DB
    });
  }
  return firebase;
}

export {
  connectMongoDB,
  connectFirebase
};
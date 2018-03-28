import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);
  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {firebase, googleAuthProvider, database as default};
  // //child_changed
  // database.ref('expenses').on('child_changed', (snapshot) => {
  //   console.log(snapshot.key, snapshot.val());
  // });

  // //child_removed
  // database.ref('expenses').on('child_removed', (snapshot) => {
  //   console.log(snapshot.key, snapshot.val());
  // });

  // //child_added
  // database.ref('expenses').on('child_added', (snapshot) => {
  //   console.log(snapshot.key, snapshot.val());
  // });  

  // database.ref('expenses').on('value', (snapshot) => {
  //                 const expenses = [];
  //                 snapshot.forEach(childSnapshot => {
  //                   expenses.push({
  //                     id: childSnapshot.key,
  //                     ...childSnapshot.val()
  //                   });
  //                 });
  //                 console.log(expenses);
  //               });

  // expenses.forEach((expense) => {
  //   database.ref('expenses').push(expense);
  // });

  // const subscribed = database.ref().on('value', (snapshot) => {
  //   const val = snapshot.val();
  //   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  // });

  // database.ref().update({
  //   'job/title': 'CTO',
  //   'job/company': 'Google'
  // });

  // database.ref().once('value')
  //               .then((snapshot) => {
  //                 const val = snapshot.val();
  //                 console.log(val);
  //               })
  //               .catch((e) => {
  //                 console.log('fetch data failed', e);
  //               });

  // database.ref().set({
  //   name: 'Giorgi Mdivani',
  //   age: 28,
  //   stressLevel: 6,
  //   job: {
  //     title: 'software developer',
  //     company: 'google'
  //   },
  //   isSingle: false,
  //   location: {
  //       city: 'Tbilisi',
  //       country: 'Georgia'
  //   }
  // }).then(() => {
  //   console.log('data is saved!');
  // }).catch((e) => {
  //   console.log('this failed', e);
  // }); 

  // database.ref('isSingle').remove();

  // database.ref().update({
  //   stressLevel: 9,
  //   'job/company': 'amazon',
  //   'location/city': 'Kutaisi'
  // });
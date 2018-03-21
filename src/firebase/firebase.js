import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCXiKc-5RN3Lydvqn4Ro1JoWQ3lTLe4Kic",
    authDomain: "expensify-b0908.firebaseapp.com",
    databaseURL: "https://expensify-b0908.firebaseio.com",
    projectId: "expensify-b0908",
    storageBucket: "expensify-b0908.appspot.com",
    messagingSenderId: "293759163561"
  };

  firebase.initializeApp(config);
  const database = firebase.database();

  const subscribed = database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  });

  database.ref().update({
    'job/title': 'CTO',
    'job/company': 'Google'
  });
  
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
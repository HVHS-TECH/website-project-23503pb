console.log('%c fb_setup.js \n--------------------',
    'color: blue; background-color: white;');
  
  var database;
  
  /**************************************************************/
  // fb_initialise()
  // Initialize firebase, connect to the Firebase project.
  //
  // Find the config data in the Firebase consol. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
  //
  // Input:  n/a
  // Return: n/a
  /**************************************************************/
  function fb_initialise() {  
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBF80J86T8x6jYWck6vANBdReWXBduXr7k",
    authDomain: "paul-martin---13dtec.firebaseapp.com",
    databaseURL: "https://paul-martin---13dtec-default-rtdb.firebaseio.com",
    projectId: "paul-martin---13dtec",
    storageBucket: "paul-martin---13dtec.firebasestorage.app",
    messagingSenderId: "48554388587",
    appId: "1:48554388587:web:03ebd065a5d7a744e0d52e"
};
   
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    // This log prints the firebase object to the console to show that it is working.
    // As soon as you have the script working, delete this log.
    console.log(firebase);  
  }
  
  fb_initialise();
  
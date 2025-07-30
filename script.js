console.log('%c script.js \n--------------------',
    'color: blue; background-color: white;');



function showSideBar() {
    console.log("Pressed")

    document.getElementById("sidebar").classList.toggle("active");
}

function hideSideBar() {
    console.log("Pressed")
    
    document.getElementById("sidebar").classList.remove("active");
}


function signUp_page() {
    window.location = 'registration_page.html';
}

function home_page() {
    window.location = 'index.html';
}


/**************************************************************/
// ValidationForm()
// Validates user input fields before proceeding with registration
/**************************************************************/
function ValidationForm(){

    let Valid = true;

    document.getElementById('NameError').innerText = '';
    document.getElementById("AgeError").innerText = '';
    document.getElementById("mentorError").innerText = '';

    /* --- Name --- */
    var name = document.getElementById('name').value;
    if (name.trim() === '') {
        document.getElementById('NameError').innerText = 'Required';
        Valid = false;
    }
    
   /* --- Age --- */
    var age = document.getElementById('age').value;
    if (age < 1 || age > 200) {
        document.getElementById('AgeError').innerText = 'Required';
        Valid = false;
    }

    /* --- Mentor --- */
    var mentor = document.getElementById('mentor-class').value;
    if (mentor.trim() === '') {
        document.getElementById('mentorError').innerText = 'Required';
        Valid = false;
    }

    if (Valid) {
        fb_register();
    }
    return false;
}


/* =============================================== FIREBASE ============================================================== */

function fb_authenticate(){
    console.log("running fb_authenticate()")
    console.log("logging in")

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("logged in")
            console.log(user)

            var uid = user.uid;

            firebase.database().ref('/auth/users/' + uid).once('value')
                .then((snapshot) => {
                    if (snapshot.val()) {
                        console.log("User exists in database");

                    } else {
                        console.log("User doesn't exist in database")
                        signUp_page();
                    }
                });
        } else {
            console.log("Not logged in")
            signUp_page();
        }
    });
}


function fb_register(){
    console.log("fb_register working")

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const mentorClass = document.getElementById("mentor-class").value;

    console.log("Registration form values:")
    console.log("Registered name:", name)
    console.log("Registered age:", age)
    console.log("Registered mentor class", mentorClass)

    fb_login(name, age, mentorClass);
}



function fb_login(name, age, mentorClass){
    console.log("fb_login working")
    console.log("logging in")

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("logged in")
            console.log(user)

            fb_saveRegistrationInfo(user, name, age, mentorClass);

        } else {
            console.log("Not logged in")
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result)
            {
                var token = result.credential.accessToken;
                var user = result.user;
                
                fb_saveRegistrationInfo(user, name, age, mentorClass);
            });
        }
    });
}


function fb_saveRegistrationInfo(user, name, age, mentorClass){
    console.log("fb_saveRegistration working")

    var uid = user.uid;
    var data = {
        Info: {
            "Name" : name,
            "Age" : age,
            "Mentor" : mentorClass,
            "Google Name" : user.displayName,
            "Email" : user.email,
            "PhotoURL": user.photoURL
        },
    };

    console.log(user.uid)
    console.log(data)

    
    firebase.database().ref('/auth/users/'+ uid).set(data).then(function(){
        fb_GamePage_pages();
    });

    sessionStorage.setItem("Name", name);
    sessionStorage.setItem("Age", age);
    sessionStorage.setItem("Google Name", user.displayName);
    sessionStorage.setItem("Email", user.email);
    sessionStorage.setItem("PhotoURl", user.photoURL)
}





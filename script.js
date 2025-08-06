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

function home_page() {
    window.location = 'index.html';
}

function fb_authenticator() {
    document.getElementById('registrationPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('registrationPopup').style.display = 'none';
}


/* ==================================================
==================================================== */

function fb_write() {
    console.log("fb_write function is working...")

    const name = document.getElementById("name").value
    const number = document.getElementById("phone-number").value
    const email = document.getElementById("email").value
    const mentor = document.getElementById("class-mentor").value

    console.log("Registration form values:");
    console.log(name);
    console.log(number);
    console.log(email);
    console.log(mentor);

    fb_login(name, number, email, mentor)
}


function fb_login(name, number, email, mentor) {
    console.log("fb_login function is working...")

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("logged in")
            console.log(user)

            fb_saveRegistrationInfo(user, name, number, email, mentor);

        } else {
            console.log("Not logged in")
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result)
            {
                var token = result.credential.accessToken;
                var user = result.user;

                fb_saveRegistrationInfo(user, name, number, email, mentor);
            });
        }
    });
}

function fb_saveRegistrationInfo(user, name, number, email, mentor) {
    console.log("fb_saveRegistrationInfo function is working...")

    var uid = user.uid;
    var data = {
        Info: {
            "Name" : name,
            "Phone Number" : number,
            "Email" : email,
            "Mentor Class" : mentor,
        }
    };

    console.log(user.uid);
    console.log(data);

    firebase.database().ref('users/' + uid).set(data)
    .then(
        function(){
            home_page();
        });
}






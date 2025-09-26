console.log('%c script.js \n--------------------',
    'color: blue; background-color: white;');

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("plus")) {
        let input = e.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
    }
    if (e.target.classList.contains("minus")) {
        let input = e.target.nextElementSibling;
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged((user) => {

        if (!document.getElementById("userIcon")) return;

        if (user) {
            if (user.photoURL) {
                document.getElementById("userIcon").innerHTML = `
                    <img src="${user.photoURL}" alt="Profile Picture" style="width: 32px; height: 32px; border-radius: 50%;">
                `;
            } else {
                iconContainer.innerHTML = `<i class="material-icons">person</i>`;
            }
        }
    });
});


function showSideBar() {
    document.getElementById("sidebar").classList.toggle("active");
}

function hideSideBar() {
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

function showCartDetails() {
    console.log("clicked")
    document.getElementById('shopping-cart').style.display = 'flex';
}

function close_cart() {
    document.getElementById('shopping-cart').style.display = 'none';
}

/* ==== Menu Image Reference Pop-up ====*/
function croissant_ref_popup() {
    document.getElementById('croissant-popup').style.display = 'flex';
}
function icedLatte_ref_popup() {
    document.getElementById('icedLatte-popup').style.display = 'flex';
}
function avocado_ref_popup() {
    document.getElementById('avocado-popup').style.display = 'flex';
}
function macchiato_ref_popup() {
    document.getElementById('macchiato-popup').style.display = 'flex';
}
function mocha_ref_popup() {
    document.getElementById('mocha-popup').style.display = 'flex';
}
function latte_ref_popup() {
    document.getElementById('latte-popup').style.display = 'flex';
}
function capuccino_ref_popup() {
    document.getElementById('capuccino-popup').style.display = 'flex';
}
function espresso_ref_popup() {
    document.getElementById('espresso-popup').style.display = 'flex';
}
/* ======== Gallery ======== */
function img1_ref_popup() {
    document.getElementById('gallery-1').style.display = 'flex';
}
function img2_ref_popup() {
    document.getElementById('gallery-2').style.display = 'flex';
}
function img3_ref_popup() {
    document.getElementById('gallery-3').style.display = 'flex';
}
function img4_ref_popup() {
    document.getElementById('gallery-4').style.display = 'flex';
}
function img5_ref_popup() {
    document.getElementById('gallery-5').style.display = 'flex';
}
function img6_ref_popup() {
    document.getElementById('gallery-6').style.display = 'flex';
}
function img7_ref_popup() {
    document.getElementById('gallery-7').style.display = 'flex';
}

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('ref-popup')) {
        e.target.style.display = 'none';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll('.ref-popup').forEach(popup => {
            popup.style.display = 'none';
        });
    }
});
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
            "PhotoURL" : user.photoURL,
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





function fb_application_val() {
    console.log("fb_application_val() working...")
        
    const name = document.getElementById("application-name").value;
    const email = document.getElementById("application-email").value;
    const interest = document.getElementById("application-interest").value;
    const availability = document.getElementById("application-availability").value;

    console.log(name, email, interest, availability);

    fb_application(name, email, interest, availability);
}

function fb_application(name, email, interest, availability) {
    console.log("fb_application() working...")

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("logged in", user);
            fb_saveApplicationInfo(user, name, email, interest, availability);
        } else {
            console.log("Not logged in");
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
                var user = result.user;
                fb_saveApplicationInfo(user, name, email, interest, availability);
            });
        }
    });
}

function fb_saveApplicationInfo(user, name, email, interest, availability) {
    console.log("fb_saveApplicationInfo() working...");

    var uid = user.uid;
    var data = {
        Application: {
            "Name": name,
            "Email": email,
            "Interest": interest,
            "Availability": availability,
            "PhotoURL": user.photoURL
        }
    };

    console.log(uid, data);

    firebase.database().ref('applications/' + uid).set(data)
    .then(function() {
        alert("Application submitted successfully!");
        document.getElementById("baristaForm").reset();
    })
        .catch(function(error) {
        alert("Error: " + error.message);
    });
}
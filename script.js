console.log('%c script.js \n--------------------',
    'color: blue; background-color: white;');


// -------------------------------
//  Quantity Increment / Decrement Buttons
// -------------------------------
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("plus")) {
        // Increase input value by 1 when clicking "+"
        let input = e.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
    }
    if (e.target.classList.contains("minus")) {
        // Decrease input value by 1 when clicking "-" (but not below 1)
        let input = e.target.nextElementSibling;
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------
    //  Firebase Authentication UI Handling
    // -------------------------------
    firebase.auth().onAuthStateChanged((user) => {
        const sidebar_userIcon = document.getElementById("sidebar-userIcon");
        const userIcon = document.getElementById("userIcon");

        if (user) {
            // If logged in → show profile photo & email
            if (sidebar_userIcon) {
                sidebar_userIcon.innerHTML = `
                    <img src="${user.photoURL}" alt="User"
                        style="width:24px; height:24px; border-radius:50%; vertical-align:middle; margin-right:6px;">
                    ${user.email}
                `;
                sidebar_userIcon.onclick = null; // Disable sign-in button
            }

            if (userIcon) {
                userIcon.innerHTML = `
                    <img src="${user.photoURL}" alt="Profile Picture"
                        style="width: 32px; height: 32px; border-radius: 50%;">
                `;
            }
        } else {
            // If logged out → show default icon with sign-in option
            if (sidebar_userIcon) {
                sidebar_userIcon.innerHTML = `<i class="material-icons">person</i>Sign-in`;
                sidebar_userIcon.onclick = fb_authenticator;
            }
            if (userIcon) {
                userIcon.innerHTML = `<i class="material-icons">person</i>`;
            }
        }
    });

    // -------------------------------
    //  Shopping Cart Counter
    // -------------------------------
    let cartCount = 0;
    const cartCountDesktop = document.getElementById("cart-count");
    const cartCountMobile = document.getElementById("cart-count-mobile");

    const addToCartButtons = document.querySelectorAll(".btn-add-cart");

    // Update cart counter display
    function updateCartCount() {
        cartCountDesktop.textContent = cartCount;
        cartCountMobile.textContent = cartCount;

        if (cartCount > 0) {
            cartCountDesktop.style.display = "inline";
            cartCountMobile.style.display = "inline";
        }
    }

    // Add click event to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            updateCartCount();
        });
    });
});


// -------------------------------
//  Sidebar & Popup Handling
// -------------------------------
function showSideBar() {
    // Toggle sidebar visibility
    document.getElementById("sidebar").classList.toggle("active");
}

function hideSideBar() {
    // Hide sidebar
    document.getElementById("sidebar").classList.remove("active");
}

function home_page() {
    // Redirect to homepage
    window.location = 'index.html';
}

function fb_authenticator() {
    // Open registration popup
    console.log("fb_authenticator() working...")
    document.getElementById('registrationPopup').style.display = 'flex';
}

function closePopup() {
    // Close registration popup
    console.log("Closing Popup")
    document.getElementById('registrationPopup').style.display = 'none';
}

function showCartDetails() {
    // Show shopping cart popup
    console.log("showCartDetails() working...")
    document.getElementById('shopping-cart').style.display = 'flex';
}

function close_cart() {
    // Close shopping cart popup
    document.getElementById('shopping-cart').style.display = 'none';
}


// -------------------------------
//  Menu Item Reference Popups
// -------------------------------
function croissant_ref_popup() { document.getElementById('croissant-popup').style.display = 'flex'; }
function icedLatte_ref_popup() { document.getElementById('icedLatte-popup').style.display = 'flex'; }
function avocado_ref_popup() { document.getElementById('avocado-popup').style.display = 'flex'; }
function macchiato_ref_popup() { document.getElementById('macchiato-popup').style.display = 'flex'; }
function mocha_ref_popup() { document.getElementById('mocha-popup').style.display = 'flex'; }
function latte_ref_popup() { document.getElementById('latte-popup').style.display = 'flex'; }
function capuccino_ref_popup() { document.getElementById('capuccino-popup').style.display = 'flex'; }
function espresso_ref_popup() { document.getElementById('espresso-popup').style.display = 'flex'; }


// -------------------------------
//  Gallery Image Popups
// -------------------------------
function img1_ref_popup() { document.getElementById('gallery-1').style.display = 'flex'; }
function img2_ref_popup() { document.getElementById('gallery-2').style.display = 'flex'; }
function img3_ref_popup() { document.getElementById('gallery-3').style.display = 'flex'; }
function img4_ref_popup() { document.getElementById('gallery-4').style.display = 'flex'; }
function img5_ref_popup() { document.getElementById('gallery-5').style.display = 'flex'; }
function img6_ref_popup() { document.getElementById('gallery-6').style.display = 'flex'; }
function img7_ref_popup() { document.getElementById('gallery-7').style.display = 'flex'; }

// Close popups by clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('ref-popup')) {
        e.target.style.display = 'none';
    }
});

// Close popups with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll('.ref-popup').forEach(popup => {
            popup.style.display = 'none';
        });
    }
});


// -------------------------------
//  Firebase Registration Handling
// -------------------------------
function fb_write() {
    // Collect registration form input values
    console.log("fb_write function is working...")

    const name = document.getElementById("name").value
    const number = document.getElementById("phone-number").value
    const email = document.getElementById("email").value
    const mentor = document.getElementById("class-mentor").value

    console.log("Registration form values:");
    console.log(name, number, email, mentor);

    // Pass values to login function
    fb_login(name, number, email, mentor)
}

function fb_login(name, number, email, mentor) {
    // Handles login before saving registration info
    console.log("fb_login function is working...")

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("logged in")
            fb_saveRegistrationInfo(user, name, number, email, mentor);
        } else {
            console.log("Not logged in")
            // Sign in with Google if not logged in
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var user = result.user;
                fb_saveRegistrationInfo(user, name, number, email, mentor);
            });
        }
    });
}

function fb_saveRegistrationInfo(user, name, number, email, mentor) {
    // Saves registration info into Firebase Realtime Database
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

    firebase.database().ref('users/' + uid).set(data)
    .then(function(){
        // Update sidebar with logged-in user info
        const sidebar_userIcon = document.getElementById("sidebar-userIcon");
        sidebar_userIcon.innerHTML = `
            <img src="${user.photoURL}" 
                alt="User" 
                style="width:24px; height:24px; border-radius:50%; vertical-align:middle; margin-right:6px;">
            ${user.email}
        `;
        sidebar_userIcon.onclick = null;

        home_page(); // Redirect to homepage
    });
}


// -------------------------------
//  Firebase Job Application Handling
// -------------------------------
function fb_application_val() {
    // Collects application form values
    console.log("fb_application_val() working...")
        
    const name = document.getElementById("application-name").value;
    const email = document.getElementById("application-email").value;
    const interest = document.getElementById("application-interest").value;
    const availability = document.getElementById("application-availability").value;

    console.log(name, email, interest, availability);

    fb_application(name, email, interest, availability);
}

function fb_application(name, email, interest, availability) {
    // Validates login before submitting application
    console.log("fb_application() working...")

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            fb_saveApplicationInfo(user, name, email, interest, availability);
        } else {
            alert("Please log in before submitting an application.");
        }
    });
}

function fb_saveApplicationInfo(user, name, email, interest, availability) {
    // Saves application form data into Firebase Realtime Database
    console.log("fb_saveApplicationInfo() working...");

    var uid = user.uid;
    var data = {
        "User Details": {
            "Name": name,
            "Email": email,
            "Interest": interest,
            "Availability": availability
        }
    };

    firebase.database().ref('applications/users/' + uid).set(data)
    .then(() => {
        // Reset application form on success
        document.getElementById("application-form").reset();
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
}


// -------------------------------
//  Checkout Pop-up modal 
// -------------------------------
function func_checkout() {
    console.log("func_checkout() working...");

    // Generate random order code (e.g. 3-digit number)
    let orderCode = "ORDER No. - " + Math.floor(100 + Math.random() * 900);

    // Insert the order code into popup
    document.getElementById("orderCode").innerText = orderCode;

    // Show modal
    document.getElementById("checkoutModal").style.display = "block";
}

function close_checkout() {
    console.log("closing checkout pop-up...")

    // closes modal
    document.getElementById("checkoutModal").style.display = "none";
}
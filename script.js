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


function sign_up() {
  window.location = 'signUp_page.html';
}
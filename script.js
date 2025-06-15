console.log('%c script.js \n--------------------',
    'color: blue; background-color: white;');

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
}
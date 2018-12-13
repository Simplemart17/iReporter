const modal = document.getElementById('modalPost');
const modalBtn = document.getElementById('modalBtn');


modalBtn.addEventListener('click', openModal);

window.addEventListener('click', outsideClick);


function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modalPost').style.display='none';
}

function outsideClick(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}





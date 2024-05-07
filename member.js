function skillsMember() {
  const member = document.querySelector('.member');
  const memberButton = document.querySelector('.member-button');

  memberButton.addEventListener('click', function () {
    member.classList.toggle('member--active');
  });
}
// TODO: Make search-submit screen dissapear and slide down result screen
function searchSubmitAnimation() {
  $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
  $('#search-container > h1').toggleClass('backOutUp');

  setTimeout(() => {
    $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
    $('#search-container > h1').toggleClass('backOutUp');
    $('.result-container').slideDown(1500);
  }, 1000);
}

export { searchSubmitAnimation };

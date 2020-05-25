function searchSubmitAnimation() {
  $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
  $('#search-container > h1').toggleClass('backOutUp');
  $('#search-container').fadeOut();

  setTimeout(() => {
    $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
    $('#search-container > h1').toggleClass('backOutUp');
    $('.result-container').slideDown(900);
    $('#result-container').show();
  }, 1000);
}

export { searchSubmitAnimation };

function resultAnimation() {
  $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
  $('#search-container > h1').toggleClass('backOutUp');
  $('#search-container').fadeOut();

  setTimeout(() => {
    $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
    $('#search-container > h1').toggleClass('backOutUp');
  }, 1000);
}

function searchAnimation() {
  $('#result-container').fadeOut(400);
  $('#search-container').fadeIn(1500);
}

function loadingAnimation() {
  $('#loading-container').css('display', 'flex').fadeIn(1200);
  $('#loading-container').fadeOut(1200);
}

export { resultAnimation, searchAnimation, loadingAnimation };

// $('.result-container').slideDown(900);
// $('#result-container').show();

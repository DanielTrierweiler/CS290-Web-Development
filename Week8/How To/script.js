//Source code found at the following link: http://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link

$(document).on('click', 'li > a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top-150
    }, 800);
});

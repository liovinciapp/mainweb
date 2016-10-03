$(document).ready(function () {



$(window).scroll(function() {
        if($(this).scrollTop() > 500 ){
            $('#container-footer').hide();
         
        }
        else{
            $('#container-footer').show()
            
        }

    });



  /* ===========================
     Scroll to Top Button
  ==============================*/
  $(window).scroll(function() {
        if($(this).scrollTop() > 100){
            $('#to-top').stop().animate({
                bottom: '30px'
                }, 750);
       
        }
        else{
            $('#to-top').stop().animate({
               bottom: '-100px'
            }, 750);
            
        }
    });

    $('#to-top').click(function() {
        $('html, body').stop().animate({
           scrollTop: 0
        }, 750, function() {
           $('#to-top').stop().animate({
               bottom: '-100px'
           }, 750);
        });
    });


    $('.down-arrow').click(function() {
        var p2 = $( "#page2" );
    var pageheight = p2.position().top;
    $('html, body').animate({ scrollTop: pageheight }, 750);
    });



///IMAGE POPUP
$('.phase-pic-left').click(function(){
    var _this = $(this);
    //MIGHT NOT NEED TITLE
  var phaseTitle = _this.parent().parent().siblings('.phase-title-left').children().eq(0).text();
       $('#myModalLabel').text(phaseTitle);

  $('#imagepreview').attr('src', _this.attr('src')); // here asign the image to the modal when the user click the enlarge link

   $('#imagemodal').modal('show');
});

$('.phase-pic-right').click(function(){
    var _this = $(this);
    //MIGHT NOT NEED TITLE
    var phaseTitle = _this.parent().parent().siblings('.phase-title-right').children().eq(0).text();
       $('#myModalLabel').text(phaseTitle);

    $('#imagepreview').attr('src', _this.attr('src')); // here asign the image to the modal when the user click the enlarge link

   $('#imagemodal').modal('show');
});


  



  $('#sign-up').on('click', function(e) {
    e.preventDefault();

    var userEmail = $("#email").val();
     
     if(validateEmail(userEmail)) {
      var emailObj = {email: userEmail};
      makeAjaxRequest(emailObj);
     } else {
      alert("The email you have entered is invalid, please enter a valid email address");
     }
    
    function makeAjaxRequest(emailToAdd) {
      $.ajax({
        type: "POST",
        url: "/registerUserSite",
        data: emailToAdd,
        success: function (data) {
            if(data.failOrSuccess == 1) {
              $('.center-subsc').replaceWith('<p> Thank you for signing up. <br> You will be notified of our beta launch. </p>');
            } else {
              $('.center-subsc').replaceWith('<p> There has been an error while trying to add your email. </p>');
    
            }
        }
      });
    }
        
        

  })


  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



  /* ==================================
     Contact Overlay
     (works with multiple buttons)
  =====================================*/
 $('.contact-trigger').click(function(){
 
   $('#contactmodal').modal('show');
});


  
var isMobile = {
  
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.iOS());
    }
};


function setupDevice() {
  if(isMobile.Android()) {

     $('.iphone-app').hide();
     $('.img-down-arrow').hide();
  }

  if(isMobile.iOS()) {
     $('.android-app').hide();
     $('.img-down-arrow').hide();

  }
}
setupDevice();















});
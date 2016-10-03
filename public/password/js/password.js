$(document).ready(function () {
 $('#forgotPasswordSubmit').on('click', function(e) {
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
        url: "/requestNewPassword",
        data: emailToAdd,
        success: function (data) {
            if(data.failOrSuccess == 1) {

              $('.forgot-password').replaceWith('<p> You will receive an email with instructions for resetting your password. </p>');
            } else {
              $('.forgot-password').replaceWith('<p> There has been an error while trying to email you a reset password link. </p>');
    
            }
        }
      });
    }
        
        

  });


  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};



//PASSWORD RESET HERE
 $('#resetPasswordSubmit').on('click', function(e) {
    e.preventDefault();

    var userP = $("#password").val();
    var userCP = $("#confirmP").val();
    if(userP === userCP) {
	      var passwordObj = {password: userP};
	      if(userP.length < 5) {
	      	alert("New password not long enough, must be at least 5 characters.");
	      } else {

	      makeAjaxRequest(passwordObj);
	      }
	    
	    //NO URL specified in AJAX so it makes a call to the same link it has so token is in params
	    function makeAjaxRequest(passwordReset) {
	      $.ajax({
	        type: "POST",
	        data: passwordReset,
	        success: function (data) {
	            if(data.failOrSuccess == 1) {
	              $('.forgot-password').replaceWith('<p> Your password has successfully changed. </p>');
	            } else {
	              $('.forgot-password').replaceWith('<p> There has been an error while trying to reset your password. </p>');
	    
	            }
	        }
	      });
	    }
	       
    } else {
    	alert("Your passwords do not match!");
    }

  
        

  });

});
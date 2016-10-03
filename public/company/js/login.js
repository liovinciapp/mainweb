 $(document).ready(function(){
  var sess = window.localStorage;
      var submitButton = $('#loginSubmit');
    submitButton.click(function (ev) {
        ev.preventDefault();

      var emailVal = $('#email').val();
      var passwordVal = $('#password').val();
      var dataVal = {email: emailVal, password: passwordVal };
      
      if(emailVal.length > 0 && passwordVal.length > 0 && validateEmail(emailVal)) {
         $.ajax({
            type: "POST",
            url: "/clogin",
            data: dataVal,
            success: function (data) {
                if(data.failOrSuccess === 1) {
                  sess.setItem("company", data.user.company);
                  sess.setItem("count", data.user.projects.length);
                  window.location.href = "/cdashboard?company=" + data.user.company;
                } else {
                  alert("Incorrect credentials.");
                }
            }

        });
       } else {
         alert("Make sure you include a valid email and fill out your email and password.");
       }
       
    });

    
$("#password").keyup(function(event){
    if(event.keyCode == 13){
        $("#loginSubmit").click();
    }
});

  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(re.test(email)) {
        return true;
      } else {
        return false;
      }
    }

 });
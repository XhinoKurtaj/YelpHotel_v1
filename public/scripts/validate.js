$(function (){
  $("#form").submit(function(e){
    var name = $("#username").val();
    var email = $("#email").val();
    var confirmEmail = $("#cemail").val();
    var password = $("#password").val();
    var confirmPassword = $("#cpassword").val();

    validateNameField(name, e);
    validateEmail(email, e);
    validatePasswordField(password, e);

    if(email != confirmEmail){
      $("confirm-feedback").text("your email doesn't match");
    }
    if(password != confirmPassword){
      $("confirmP-feedback").text("your password doesn't match");
    }

  });
});

function validateNameField(name, e){
  if(name.length  < 3){
    $("#name-feedback").text("Please enter at least three characters");
    e.preventDefault();
  }else{
    $("#name-feedback").text();
  }
}
function validateEmail(email, e){
  if(!isValidEmail(email)){
    $("email-feedback").text("Email format should be JohnDoe@example.com");
    e.preventDefault();
  }else{
    $("#email-feedback").text();
  }
}

function isValidEmail(email){
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( email );
}
function validatePasswordField(password, e){
  if(!isValidPassword(password)){
    $("#password-feedback").text("Password should have atleast 8 characters, one upercase contains atleas one number")
  }else{
    $("#password-feedback").text();
  }
}

function isValidPassword(password){
  var valid = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return valid.test(password);
}

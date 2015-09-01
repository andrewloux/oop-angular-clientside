function RegisterController(MetadataService, $window) {
    var vm = this;

    MetadataService.setMetadata({
        title: 'Register',
        description: 'Register for an account here'
    });

    // return null if valid, else return an appropriate error
    // message
    vm.validate = function(){
        var pw = $("#password").val(),
            pw_c = $("#password-confirm").val(),
            email = $("#email").val(),
            name = $("#name").val();

        if (pw != pw_c){
            return "Passwords must match";
        }
        else if ( email.split("utoronto.ca").length == 1 ){
            return "Must be a valid email utoronto address";
        }
        else{
            return null;
        }
    };

    vm.saveLoginState = function(){
        console.log("saving logged in state");
        localStorage.setItem('authenticated', true);
        localStorage.setItem('username',  $("#name").val() );        
    };

    vm.registerRequest = function(){
        $.post(
            'http://neurosci.onlinelearning.utoronto.ca/auth/register', 
            {
                'username': $("#name").val(),
                'email': $('#email').val(),
                'password': $('#password').val()
            }
        ).done(function(err){
            if (err.status == 1){
                alert(err.message);
            }
            else if (err.status === 0){
                // angular redirect.
                this.saveLoginState();
                $window.location.href = "/";
            }
        }.bind(this))
        .fail(function(){
            console.log("unaccounted for error");
        }); 
    };

    vm.registerUser = function(e){
    	e.preventDefault();
        if (this.validate() === null){
            this.registerRequest();
        }
        else{
            alert(this.validate());
        }
    };


}

angular
    .module('app')
    .controller('RegisterController', RegisterController);
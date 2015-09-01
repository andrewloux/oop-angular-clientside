function LoginController(MetadataService, $window) {
    var vm = this;

    MetadataService.setMetadata({
        title: 'Login',
        description: 'Login for an account here'
    });

    vm.saveLoginState = function(){
        console.log("saving logged in state");
        localStorage.setItem('authenticated', true);
        localStorage.setItem('username',  $("#name").val() );        
    };

    vm.loginRequest = function(){
        $.post(
            'http://neurosci.onlinelearning.utoronto.ca/auth/authenticate', 
            {
                'username': $("#name").val(),
                'password': $('#password').val()
            }
        ).done(function(err){
            // angular redirect.
            this.saveLoginState();
            $window.location.href = "/";

        }.bind(this))
        .fail(function(err){
            console.log(err);
            alert("Incorrect username or password");
        }) 
    };

	vm.loginUser = function(e){
		e.preventDefault();
        console.log("login user");
        this.loginRequest();
	};    
}

angular
    .module('app')
    .controller('LoginController', LoginController);
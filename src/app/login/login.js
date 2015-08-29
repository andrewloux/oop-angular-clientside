function LoginController(MetadataService) {
    var vm = this;

    MetadataService.setMetadata({
        title: 'Login',
        description: 'Login for an account here'
    });
}

angular
    .module('app')
    .controller('LoginController', LoginController);
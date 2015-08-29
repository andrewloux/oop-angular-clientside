function RegisterController(MetadataService) {
    var vm = this;

    MetadataService.setMetadata({
        title: 'Register',
        description: 'Register for an account here'
    });
}

angular
    .module('app')
    .controller('RegisterController', RegisterController);
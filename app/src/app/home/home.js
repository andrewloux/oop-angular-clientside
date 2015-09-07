

function HomeController(BlogService, MetadataService) {
    var vm = this;

    BlogService.homepageText().then(function(posts) {
        // should only have a single element.
        vm.homepageText = posts[0];
    });

    // logged in or nah
    //vm.authenticated = (localStorage.getItem('authenticated')) ? true : false;
    vm.authenticated = true;

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('HomeController', HomeController);

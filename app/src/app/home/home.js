

function HomeController(BlogService, MetadataService) {
    var vm = this;

    vm.featuredPosts = [];

    BlogService.featuredPosts().then(function(posts) {
        vm.featuredPosts = posts;
    });

    // logged in or nah
    vm.authenticated = (localStorage.getItem('authenticated')) ? true : false;

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('HomeController', HomeController);

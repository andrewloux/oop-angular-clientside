(function(){
"use strict";


function HomeController(BlogService, MetadataService) {
    var vm = this;

    vm.featuredPosts = [];

    BlogService.featuredPosts().then(function(posts) {
        vm.featuredPosts = posts;
    });

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}
HomeController.$inject = ["BlogService", "MetadataService"];

angular
    .module('app')
    .controller('HomeController', HomeController);

})();
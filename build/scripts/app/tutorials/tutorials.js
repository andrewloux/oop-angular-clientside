(function(){
"use strict";
function TutorialsController($anchorScroll, $stateParams, $state, BlogService, MetadataService) {
    var vm = this;
    var apiCallFunction;

    vm.posts = [];
    vm.loaded = false;
    vm.subtitle = '';

    MetadataService.setMetadata({
        title: 'Tutorials',
        description: 'All HMB Tutorials'
    });

    apiCallFunction = BlogService.allTutorials();


    apiCallFunction.then(function(posts) {
        vm.posts = posts;
        vm.loaded = true;
    });

    vm.scrollToTop = function() {
        $anchorScroll();
    };


}
TutorialsController.$inject = ["$anchorScroll", "$stateParams", "$state", "BlogService", "MetadataService"];

angular
    .module('app')
    .controller('TutorialsController', TutorialsController);

})();
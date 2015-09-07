function AboutController(BlogService, MetadataService) {
    var vm = this;

    BlogService.aboutText().then(function(posts) {
        // should only have a single element.
        vm.aboutText = posts[0];
    });

    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('AboutController', AboutController);
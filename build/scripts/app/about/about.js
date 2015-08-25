(function(){
"use strict";
function AboutController(MetadataService) {
    var vm = this;

    MetadataService.setMetadata({
        title: 'About This Blog',
        description: 'Some des.'
    });
}
AboutController.$inject = ["MetadataService"];

angular
    .module('app')
    .controller('AboutController', AboutController);
})();
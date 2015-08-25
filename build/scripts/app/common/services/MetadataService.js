(function(){
"use strict";
function MetadataService() {

    var title,
        description,
        defaultTitle = 'Ontario Online Portal',
        defaultDescription = 'A series of tutorials for the University of Toronto Human Biology Department';

    this.setMetadata = function(metadata) {
        title = metadata.title ? metadata.title : defaultTitle;
        description = metadata.description ? metadata.description : defaultDescription;
    };

    this.getMetadata = function() {
        return {
            title: title,
            description: description
        };
    };
}


angular
    .module('app')
    .service('MetadataService', MetadataService);
})();
/**
 * The BlogService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function BlogService($http, $sce, config) {

    function allPosts() {
        return getData('posts?filter[category_name]=post');
    }

    function allTutorials() {
        return getData('posts?filter[category_name]=tutorials&filter[order]=ASC&filter[orderby]=id');
    }

    function homepageText() {
        return getData('posts?filter[category_name]=homepage');
    }

    function aboutText() {
        return getData('posts?filter[category_name]=about-us');
    }

    function allPostsByTag(tag) {
        return getData('posts?filter[category_name]=post&filter[tag]=' + tag);
    }

    function allPostsBySearchTerm(searchTerm) {
        return getData('posts?filter[category_name]=post&filter[s]=' + searchTerm);
    }

    function featuredPosts() {
        return getData('posts?filter[category_name]=featured');
    }

    function post(id) {
        return getData('posts/' + id);
    }

    function getData(url) {
        return $http
            .get(config.API_URL + url, { cache: true })
            .then(function(response) {
                if (response.data instanceof Array) {
                    var items = response.data.map(function(item) {
                        return decorateResult(item);
                    });
                    return items;
                } else {
                    return decorateResult(response.data);
                }
            });
    }

    /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
    function decorateResult(result) {
        result.excerpt = $sce.trustAsHtml(result.excerpt);
        result.date = Date.parse(result.date);
        // Trim the <p> blocks around iframes
        if (result.content && (result.content.split("iframe").length > 1)){
            result.content = result.content.split("<p>").join("").split("</p>").join("");
        }
        // Re-order the results by the tutorial_order attribute
        result.content = $sce.trustAsHtml(result.content);
        return result;
    }

    return {
        allPosts: allPosts,
        allTutorials: allTutorials,
        homepageText: homepageText,
        aboutText: aboutText,
        allPostsByTag: allPostsByTag,
        allPostsBySearchTerm: allPostsBySearchTerm,
        featuredPosts: featuredPosts,
        post: post
    };
}

angular
    .module('app')
    .factory('BlogService', BlogService);

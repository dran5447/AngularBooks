angular.module('booksApp', [])
  .controller('MainController', function($scope, $http) {
    const sectionHeaderOptions = {
        DEFAULT: "Top Picks for You",
        SEARCH: "Results"
    }
    var appController = this;
    
    var favorites = [];
    $scope.bookList = [];    
    $scope.defaultBooksList = [];
    $scope.sectionHeader = sectionHeaderOptions.DEFAULT;
 
    $scope.search = function() {
        var key = constants.API_ENDPOINT;
        var query = $scope.searchText;

        if(query && query!==""){
            $scope.sectionHeader = sectionHeaderOptions.SEARCH;
            var requestUrl = "https://www.googleapis.com/books/v1/volumes?q="+query+"&key="+key;

            $http({
                method: 'GET',
                url: requestUrl
            }).then(function successCallback(response) {
                $scope.bookList = response.data.items;
            }, function errorCallback(response) {
                //TODO show error
            });    
        }
    };

    $scope.dynamicSearch = function(){
        // When doing a search while user is typing, use a short delay and check that 
        // the user has paused, so as to avoid constant flashing result updates
        var previousQuery = $scope.searchText;
        setTimeout(function(){
            if($scope.searchText === previousQuery){
                $scope.search();
            }
        }, 600);
    }

    $scope.filter = function(){
        //TODO enable some filtering options

        // ordered format -   //https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=yourAPIKey
        //by id - https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey
    }

    $scope.clear = function(){
        if($scope.sectionHeader!=sectionHeaderOptions.DEFAULT){
            $scope.searchText  = "";
            $scope.sectionHeader = sectionHeaderOptions.DEFAULT;
            $scope.bookList = $scope.defaultBooksList;
        }
    }

    loadBooks = function(){
        var key = constants.API_ENDPOINT;
        var type = "nonfiction";
        var requestUrl = "https://www.googleapis.com/books/v1/volumes?q="+type+"&key="+key;

        $http({
            method: 'GET',
            url: requestUrl
        }).then(function successCallback(response) {
            $scope.bookList = response.data.items;
            $scope.defaultBooksList = response.data.items; //cache this for later
        }, function errorCallback(response) {
            //TODO show error
        });
    };

    loadBooks();
});
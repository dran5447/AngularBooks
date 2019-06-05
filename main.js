angular.module('booksApp', [])
  .controller('MainController', function($scope, $http) {
    var favorites = [];
    $scope.bookList = [];    
 
    search = function() {
        //TODO
        // ordered format -   //https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=yourAPIKey
        //by id - https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey
    };

    loadBooks = function(){
        var key = constants.API_ENDPOINT;
        var type = "nonfiction";
        var requestUrl = "https://www.googleapis.com/books/v1/volumes?q="+type+"&key="+key;

        $http({
            method: 'GET',
            url: requestUrl
        }).then(function successCallback(response) {
            $scope.bookList = response.data.items;
        }, function errorCallback(response) {
            //TODO show error
        });
    };

    loadBooks();
});
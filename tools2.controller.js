(function() {
    'use strict';
angular
    .module('app')
    .controller('ToolsController2', Tools2)
    .filter('timeLeft', function () {
      return function (x) {
          var time1 = new Date(x);
          var time1ms= time1.getTime(time1); //i get the time in ms 
          
          var time2 = new Date();
          var time2ms= time2.getTime(time2);
          
          var difference= time1ms-time2ms;
    
          var hours = Math.floor(difference / 36e5),
            minutes = Math.floor(difference % 36e5 / 60000)/60,
            seconds = Math.floor(difference % 60000 / 1000)/3600;

          var hoursLeft = hours+minutes+seconds;
          var hoursLapse = parseFloat(hoursLeft.toFixed(2));
          
          return hoursLapse;
    };
    })
    .filter('bestOffer', function () {
      return function (x) {
               if(x == "true"){
                return x = "bo";
            } else {
                return x = "";
            }
    };
    })
    .filter('freeShipping', function () {
      return function (x) {
            if(x == "Free"){
                return x = "*";
            } else {
                return x = "";
            }
    };
    });
    
    function Tools2 ($location, $scope, $interval, $http, Authentication) {
        var vm = this;
        vm.name = Authentication.getUser();
        vm.location = Authentication.getLocation();
        vm.sortType     = 'title'; // set the default sort type
        vm.sortReverse  = false;  // set the default sort order
        vm.wait = "Loading, Please Wait...";
        vm.logout = function () {
            Authentication.logout();
        };
        
        $scope.search = "Search Phrase Here";
        $scope.num = 10;
        
        vm.fetch = function fetch(){
          vm.mylistings =""; 
          var url = "app-scripts/ebayGet.php?keywords="+$scope.search+"&paginationInput.entriesPerPage="+$scope.num;
          vm.date = new Date(); 

          $http.get(url)
          .then(function(response){ 
              vm.mylistings = response.data.findItemsByKeywordsResponse[0].searchResult[0].item || [0];
              angular.forEach(vm.mylistings, function (listing) {
                    listing.sellingStatus[0].currentPrice[0].__value__ = parseFloat(listing.sellingStatus[0].currentPrice[0].__value__);
                   });
              vm.wait ="";   
            });
        };
        
        vm.interveral = $interval(function(){
            vm.wait = "AutoRefresh, Please Wait...";
            vm.fetch();
        }, 60000, 0, 1);
        
        $scope.$watchGroup(['search', 'num'], function(){
            vm.wait = "Loading, Please Wait...";
            vm.fetch();
        });
       
}
})();

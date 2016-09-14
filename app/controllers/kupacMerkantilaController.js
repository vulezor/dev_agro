(function(){
	var kupacMerkantilaController = function($scope, $http, kupacRepromaterijalFactory){
		$scope.clients = ""

		$scope.goods_type = []
		$scope.goods = []

		kupacRepromaterijalFactory.getKupce().success(function(msg){
            if(msg.logedIn !== 0 && msg.hasOwnProperty('logedIn')===false) {
                $scope.clients = msg
            } else {
                window.location.href = mainService.domainURL();//logout
            }
        }).error(function(error){
            console.log(error);
        });
	};

	
	kupacMerkantilaController.$inject = ['$scope', '$http', 'kupacRepromaterijalFactory'];
	angular.module('_raiffisenApp').controller('kupacMerkantilaController', kupacMerkantilaController);
}());
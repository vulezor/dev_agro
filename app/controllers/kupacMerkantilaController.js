(function(){
	var kupacMerkantilaController = function($scope, $http, kupacRepromaterijalFactory, $filter){
		$scope.clients = "";
		$scope.goods_types = [];
		$scope.goods = [];
		$scope.form_data = {};
		$scope.sellType = '',
		$scope.myModal = false
		$scope.client_start_data= [];
		$scope.lager_data = {};

		$http.get('prodavac_merkantila_api/get_clients').then(function(response){
		
            if(response.data.logedIn !== 0 && response.data.hasOwnProperty('logedIn')!==false) {

                $scope.clients = response.data.data
            } else {
                //window.location.href = mainService.domainURL();//logout
            }
        },function(error){
            console.log(error);
        });


        $scope.getGoodTypeId = function(index){
        	$scope.form_data.client_id = $scope.clients[index].client_id;
        	$http.get('prodavac_merkantila_api/get_goods_type/'+$scope.clients[index].client_id).then(function(response){
        		console.log(response);
        		$scope.goods_types = response.data.data;
       		 },
       		 function(response){

       		 });
    	};

    	$scope.getGoodId = function(){
    		$http.get('prodavac_merkantila_api/get_goods', {params:$scope.form_data}).then(function(response){
        		console.log(response);
        		$scope.goods = response.data.data;
       		 },
       		 function(response){

       		 });
    	}

    	$scope.get_sum_srps = function(){
    		$http.get('prodavac_merkantila_api/get_sum_srps', {params:$scope.form_data}).then(function(response){
        	    console.log(response);
        		$scope.client_start_data = response.data.data;
       		 },
       		 function(response){

       		 });
    	}

    	$scope.danas = function(){
    		return $filter('date')(new Date(), 'dd.mm.yyyy');
    	}

    	$scope.hideShowModal= function(selltype){
    		 $scope.myModal=!$scope.myModal;
    		 $scope.sellType = selltype ? selltype : '';
    		 $scope.lager_data = {};
    	}

    	$scope.snimiTest = function(){
    		alert('worka');
    	}
	};

	
	kupacMerkantilaController.$inject = ['$scope', '$http', 'kupacRepromaterijalFactory', '$filter'];
	angular.module('_raiffisenApp').controller('kupacMerkantilaController', kupacMerkantilaController);
}());
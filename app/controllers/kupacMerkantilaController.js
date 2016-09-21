(function(){
	var kupacMerkantilaController = function($scope, $http, kupacRepromaterijalFactory, $filter, $rootScope){
		var vm = this;
        $scope.clients = "";
		$scope.goods_types = [];
		$scope.goods = [];
		$scope.form_data = {};
		$scope.sellType = '',
		$scope.myModal = false
		$scope.client_start_data= [];
		$scope.lager_data = {};
        $scope.kolicina =[];
        $scope._sumkolicina = 0;
        $scope.decrise_value = false;
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
    	};

    	$scope.get_sum_srps = function(){
    		$http.get('prodavac_merkantila_api/get_sum_srps', {params:$scope.form_data}).then(function(response){
        	   
        		$scope.client_start_data = response.data.data;
                $scope.kolicina = response.data.kolicina;
                $scope._sumkolicina = angular.copy($scope.client_start_data[0].srps);
                console.log($scope.kolicina)
                $.each($scope.kolicina,function(i, item){
                    if(i===0){
                       $scope.kolicina[0].obracun =  $scope.client_start_data[0].srps
                    }
                    var sold = $scope.kolicina[i].sold ? $scope.kolicina[i].sold : 0;
                    var out = $scope.kolicina[i].out ? $scope.kolicina[i].out_good : 0;
                    var out_quantity = $scope.kolicina[i].out_quantity ? $scope.kolicina[i].out_quantity : 0;
                    var stock_quantity = $scope.kolicina[i].stock_quantity ? $scope.kolicina[i].stock_quantity : 0;
                    console.log(sold, out, out_quantity, stock_quantity);
                    var kolicina = $scope._sumkolicina - (sold + out + out_quantity + stock_quantity);
                 
                    if($scope.kolicina.length!==i+1) {
                        var ref = i+1
                        $scope.kolicina[ref].obracun =  parseFloat(kolicina).toFixed(3);
                    }
                   
                    $scope._sumkolicina = parseFloat(kolicina).toFixed(3);
                })
       		 },
       		 function(response){

       		 });
    	};

    	$scope.danas = function(){
    		return $filter('date')(new Date(), 'dd.mm.yyyy');
    	};

    	$scope.hideShowModal= function(selltype){
    		 $scope.myModal=!$scope.myModal;
    		 $scope.sellType = selltype ? selltype : '';
    		 
    	};

    	$scope.hideModal = function(form){
               
                $scope.lager_data = {};
                $scope.myModal= false;
                $scope.resetForm(form);
                 
    	};
    		 

    	$scope.potvrda_obracuna = function(form){
    		$scope.submitted = true;
            
    		if(form.$valid){
                $scope.lager_data.sellType = $scope.sellType;
                $scope.lager_data.client_id = $scope.form_data.client_id;
                $scope.lager_data.srps_kolicina =  $scope._sumkolicina ;
                $scope.lager_data.good_type_id = $scope.form_data.good_type_id;
                $scope.lager_data.good_id = $scope.form_data.good_id;
                $http.post('prodavac_merkantila_api/set_obracun',$scope.lager_data).then(function(response){
                    console.log(response.data.data);
                    $scope.hideShowModal();
                    var sold = response.data.data.sold ? parseFloat(response.data.data.sold) : 0;
                    var out = response.data.data.out ? parseFloat(response.data.data.out_good) : 0;
                    var out_quantity = response.data.data.out_quantity ? parseFloat(response.data.data.out_quantity) : 0;
                    var stock_quantity = response.data.data.stock_quantity ? parseFloat(response.data.data.stock_quantity) : 0;
                    console.log(sold, out, out_quantity, stock_quantity, parseFloat($scope._sumkolicina));

                    var kolicina = parseFloat($scope._sumkolicina) - (sold + out + out_quantity + stock_quantity);
                    console.log(kolicina);
                    response.data.data.obracun = $scope._sumkolicina ;
                    $scope.kolicina.push(response.data.data);
                    $scope._sumkolicina = parseFloat(kolicina).toFixed(3);
                }, function(response){

                })
            };
    	};

        $scope.resetForm = function (form){
            $scope.submitted = false;
            form.$setPristine();
            form.$setUntouched();
        };
        $scope.fixed = function(n){
           if(n){
                return parseFloat(n).toFixed(2)
           } 
        };
       
	};

	
	kupacMerkantilaController.$inject = ['$scope', '$http', 'kupacRepromaterijalFactory', '$filter', '$rootScope'];
	angular.module('_raiffisenApp').controller('kupacMerkantilaController', kupacMerkantilaController);
}());
(function(){
	//alert('component')
	var myModal = function(){
		return {
			restrict: 'E',
			transclude: true,
			scope: true,
			replace: true,
			scope: {
				title: '@',
				modalSize:'@',
				onCancel:'&',
				cancelTitle:'@'
			},
			controller:function($scope){
				this.ct = function(){
					return $scope.cancelTitle;
				}
			},
			template: '<div class="myModal" >'+
						'<div class="modal-dialog {{modalSize}}" role="document">'+
			          		'<div class="modal-content">'+
			          			'<div class="modal-header">'+
			        				'<button type="button" class="close" data-ng-click="onCancel()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			        				'<h4 class="modal-title">{{title | capitalize}}</h4>'+
			        				//'<pre>{{$parent.lager_data | json}}</pre>'+
			      				'</div>'+
			      				'<div class="modal-body">'+
				    				'<ng-transclude>'+
				    				'</ng-transclude>'+
				  				'</div>',
			link:function(scope, element, attributes){
				scope.$on('cancel-click', function(){
						scope.onCancel();
				});
			}		  			
	  }
	}
	myModal.$inject=[];
	angular.module('_raiffisenApp').directive('myModal', myModal);

	var myModalFooter = function(){
		return {
		    restrict: 'E',
		    require:['^myModal','myModalFooter'],
		    controller:function($scope){
		 		$scope.cancelCancel = function(){
		 			$scope.$emit('cancel-click');
		 		}
		 	},
		 	scope:true,
		    transclude: true,
	        replace: true,
		    template: '<div class="modal-footer">'+
		    						'<button type="button" class="btn btn-default" data-ng-click="cancelCancel()">{{cancelTitle}}</button>'+
		    						'<ng-transclude>'+
				    				'</ng-transclude>'+
					  			'</div>'+
				   			'</div>'+
				  		'</div>'+
		    		  '</div>',
		    link: function(scope, element, attributes, controllers){
				scope.cancelTitle = controllers[0].ct();
				console.log(scope.cancelTitle);
			}				
	  }
	  
	}
	myModalFooter.$inject = [];
	angular.module('_raiffisenApp').directive('myModalFooter', myModalFooter);
}());


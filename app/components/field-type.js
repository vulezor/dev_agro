(function(){
	var fieldType = function(infoboxService){

		return{
			restrict: 'E',
			transclude: true,
			replace: true,
			scope: {
				fType:'@',
				datepicker:'@'
			},
			template: '<section>'+
							'<label class="{{fType}}" >'+
							    '<ng-transclude>'+
							    '</ng-transclude>'+
							'</label>'+
						'</section>',
			link:function(scope, element, attributes){
				infoboxService.set_infoBox();

				if(scope.datepicker){

					$(element).find('input[type="text"]').datepicker();
				} 
			}
		}
	};
	fieldType.$inject = ['infoboxService'];
	angular.module('_raiffisenApp').directive('fieldType', fieldType);
}());


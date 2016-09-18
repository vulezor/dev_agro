(function(){
	var isDatepicker = function(){
		return {
			
			link:function(scope, element, attribute){
				console.log(attribute)
				$(element).datepicker({
					yearRange: attribute.yearRange ? attribute.yearRange : null,
				});
			}
		}
	};
	isDatepicker.$inject = [];
	angular.module('_raiffisenApp').directive('isDatepicker', isDatepicker);
}())
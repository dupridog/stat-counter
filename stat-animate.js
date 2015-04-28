
//unit: 'any string. commonly %,$,+
//total: target number (to)
//number = numberToStart (from)
//delay = interval Timing //optional
//can be called like so: <span stat-animate total="10" number="5" delay="200" unit="%"></span>
app.directive('statAnimate', ['$timeout', '$interval','$window', function($timeout, $interval, $window){
	return {
		scope: {
			numberTarget: '=total',
			number: '=number',
			delay: '=delay'
		},
		link: function(scope, element, attrs){
			var distance = angular.element('.stats').offset().top;
			var $window = angular.element(window);
			scope.hasScrolled = false;
			if (attrs.unit)
				scope.numberStr = scope.number + attrs.unit;
			else
				scope.numberStr = scope.number;
			$window.scroll(function(){
				if ($window.scrollTop() >= (distance - 225)){
					if (!scope.hasScrolled){
						scope.hasScrolled = true;
						var interval = $interval(function() {
					    if (scope.number >= scope.numberTarget - 1) {
					    	scope.cancelInterval(interval);
					    }
					    scope.number++;
					    if (attrs.unit)
					    	scope.numberStr = scope.number + attrs.unit;
					   	else
					   		scope.numberStr = scope.number;
					    // animate fade in / out? 
					    //angular.element(element).fadeOut('slow');
					}, scope.delay || 30);
					}
					
				}
			})

			scope.cancelInterval = function(interval){
				$interval.cancel(interval);
			}		    
		},
		template: '{{numberStr}}'
	}
	
}]); 
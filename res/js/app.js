(function () {

	'use strict';

	angular
		.module('myApp', [
			'ui.router',
			'ui.bootstrap',
			'ngAnimate',
			'anim-in-out'
		])
		.config(config)
		.run(run);

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider'];
	run.$inject = ['$rootScope'];

	//Auto scroll page to top when change state
	function run($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function () {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		});

		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

			// Do Something
			console.log(event, toState, toParams, fromState, fromParams, error);

		});

	}

	function config($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
		$urlRouterProvider.otherwise('');

		// $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|coui|data):/);

		$stateProvider
			.state('home', {
				url: '',
				// abstract: true,
				templateUrl: 'res/views/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			});
	}

})();
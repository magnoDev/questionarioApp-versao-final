angular.module('questionarioApp', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/core/app.html'
        })

        .state('app.perfil', {
            url: '/perfil',
            views: {
                'menuContent': {
                    templateUrl: 'app/perfil/perfil.html',
                    controller : 'PerfilController',
                    controllerAs: "vm"
                }
            }
        })

        .state('app.questionarios', {
            url: '/questionarios',
            views: {
                'menuContent': {
                    templateUrl: 'app/questionario/questionario-listagem.html',
                    controller : "QuestionarioListagemController",
                    controllerAs : "vm"
                }
            }
        })

        .state('app.login', {
          url: '/login',
          views: {
              'menuContent': {
                  templateUrl: 'app/login/login.html',
                  controller : "LoginController",
                  controllerAs : "vm"
              }
          }
      })

        .state('app.questionario', {
            url: '/questionario/:codigo',
            views: {
                'menuContent': {
                    templateUrl: 'app/questao/questao.html',
                    controller: "QuestaoController",
                    controllerAs: "vm"
                }
            }
        })
;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});

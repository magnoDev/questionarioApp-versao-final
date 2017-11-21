(function(){
	
	function QuestionarioService($http, $filter){
		var service = {	
			questionario : {},
			questionarios : [],
			questoes : [],
			recuperar : recuperar,
			recuperarDetalhe : recuperarDetalhe,
			recuperarQuestoes : recuperarQuestoes
		};

		return service;

		//Funções
		function recuperar(){
			return $http.get("api/questionarios.json").then(function(resposta){
				service.questionarios = resposta.data;
			});
		};

		function recuperarDetalhe(codigo){
			return $http.get("api/questionarios.json").then(function(resposta){
				service.questionario = $filter('filter')(resposta.data, { codigo : codigo})[0];
			});	
		};

		function recuperarQuestoes(filtros){
			return $http.get("api/questoes.json").then(function(resposta){
				service.questoes = $filter('filter')(resposta.data, filtros);
			});
		};
	}

	angular.module("questionarioApp").factory('QuestionarioService', QuestionarioService);

})();
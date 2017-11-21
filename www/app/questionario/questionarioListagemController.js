(function(){

	function QuestionarioListagemController(QuestionarioService){
		var vm = this;

		vm.questionarios = [];

		//Funcoes executadas ao iniciar
		recuperarQuestionarios();

		//funcoes
		function recuperarQuestionarios(){
			QuestionarioService.recuperar().then(function(){
				vm.questionarios = QuestionarioService.questionarios;
			});
		}
	}

	angular.module("questionarioApp").controller("QuestionarioListagemController", QuestionarioListagemController);
})();
(function(){

	function PerfilController(PerfilService){
		var vm = this;

		vm.usuario = {};

		//Ao iniciar
		recuperarUsuario();

		//Funções
		function recuperarUsuario(){
			vm.usuario = PerfilService.recuperarUsuario();
							
		}
	}

	angular.module("questionarioApp").controller("PerfilController", PerfilController);
	
})();
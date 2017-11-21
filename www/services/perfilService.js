(function(){

	function PerfilService(){

		var service = {
			usuario : {
				codigo : 1,
				nome : "Testancio Testácio José",
				classificacao : "Iniciante",
				imagem : "img/testancio.gif",
				pontuacao: 0
			},
			recuperarUsuario : recuperarUsuario,
			adicionarPontos : adicionarPontos
		};

		return service;


		// Funções 
		function recuperarUsuario(){
			return service.usuario;
		}

		function adicionarPontos(pontos){
			service.usuario.pontuacao += pontos;

			if(service.usuario.pontuacao > 100 && service.usuario.pontuacao <= 200){
				service.usuario.classificacao = "Estudante";
			}

			if(service.usuario.pontuacao > 200 && service.usuario.pontuacao <= 300){
				service.usuario.classificacao = "Esforcado";
			}
			
			if(service.usuario.pontuacao > 300 && service.usuario.pontuacao < 1000){
				service.usuario.classificacao = "Professor";
			}

			if(service.usuario.pontuacao >= 1000){
				service.usuario.classificacao = "Mestre dos Magos";
			}
		}
	}


	angular.module('questionarioApp').factory('PerfilService', PerfilService);
})();
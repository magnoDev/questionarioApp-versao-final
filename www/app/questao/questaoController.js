(function(){
	
	function QuestaoController($scope, $interval, $stateParams, $ionicScrollDelegate, $state, QuestionarioService, MensagemService, PerfilService){
		var vm = this;

		var codigoQuestionario = $stateParams.codigo;
		var timer;

		vm.questionario = {};
		vm.questoes = [];
		vm.questaoCorrente = {};
		vm.quantidadeQuestoes = 0;

		vm.pontuacaoCorrente = 0;
		vm.indice = 0;
		vm.multiplicador = 0;

		//Executadas ao iniciar
        recuperarQuestionario();
		recuperarQuestoes();
		iniciarTimer();
	    

		//Funções adicionadas ao escopo
		vm.responder = responder;
		vm.finalizar = finalizar;
		vm.acionarPular = acionarPular;
		vm.acionarDica = acionarDica;
		vm.acionarDobrar = acionarDobrar;
		vm.acionarEliminar = acionarEliminar;
		vm.acionarRecursoFinal = acionarRecursoFinal;
		vm.acionarMultiplicador = acionarMultiplicador;
		vm.acionarUmMinuto = acionarUmMinuto;
		vm.irParaAnterior = irParaAnterior;
		vm.irParaProxima = irParaProxima;

		//funções
		function recuperarQuestionario(){
			QuestionarioService.recuperarDetalhe(codigoQuestionario).then(function(){
				vm.questionario = QuestionarioService.questionario;
			});
		}

		function recuperarQuestoes(){
			var filtros = {};
			filtros.codigoQuestionario = codigoQuestionario;

			QuestionarioService.recuperarQuestoes(filtros).then(function(){
				vm.questoes = QuestionarioService.questoes;
				vm.questaoCorrente = vm.questoes[0];
				vm.quantidadeQuestoes = vm.questoes.length;
			});
		}

		function responder(){
			if(vm.questaoCorrente.resposta == vm.questaoCorrente.opcaoSelecionada){
				vm.pontuacaoCorrente += vm.questaoCorrente.pontuacao;

				vm.questaoCorrente.acertou = true;

				if(vm.questionario.multiplicadorAcionado){
					vm.multiplicador++;
				}

				MensagemService.sucesso("Parabéns!", "Você acertou!");
			}else{
				vm.pontuacaoCorrente -= (vm.questaoCorrente.pontuacao * 2);

				MensagemService.erro("Ih rapaz...", "Você errou!");
				vm.multiplicador = 0;
			}

			vm.questaoCorrente.respondida = true;

			if((vm.indice + 1) == vm.quantidadeQuestoes){
				vm.questionario.finalizado = true;
				cancelarTimer();
				somarTempoRestante();

				if(vm.questionario.multiplicadorAcionado){
					vm.multiplicador = 0;
				}
			}else{
				irParaProxima();
			}
		}

		function finalizar(){
			MensagemService.avisoCustom("Atenção:", "Você tem certeza que quer finalizar o questionário?", function(confirm){
				if(confirm){
					$state.go("app.questionarios", {}, {reload : true});
					PerfilService.adicionarPontos(vm.pontuacaoCorrente);
				}
			});
		}

		function acionarPular(){
			if(vm.questionario.eliminarAcionado || vm.questionario.dicaAcionada || vm.questionario.dobrarAcionado){
				MensagemService.avisoCustom("Atenção:", "Tem certeza de que deseja pular mesmo com eliminar ou dica ou dobrar acionados?", function(confirm){
					if(confirm){
						pular();		
					}
				});	
			}else{
				pular();
			}

			function pular(){
				vm.questionario.pularAcionado = true;
				vm.questaoCorrente.pulada = true;

				irParaProxima();

				MensagemService.sucesso("Sucesso!", "Você pulou a questão!");
			}
		}

		function acionarDica(){
			vm.questionario.dicaAcionada = true;
			vm.questaoCorrente.mostrarDica = true;
		}

		function acionarDobrar(){
			vm.questionario.dobrarAcionado = true;
			vm.questaoCorrente.pontuacao *= 2;

			if(vm.questionario.congelarAcionado){
				acionarUmMinuto();
			}

			MensagemService.sucesso("WoOOoWw!", "Você dobrou a pontuação! Se errar, erra em dobro!");
		}

		function acionarEliminar(){
			var opcoes = vm.questaoCorrente.opcoes;

			while(opcoes.length > 3){
				var indice = parseInt(Math.random() * (opcoes.length), 10);
				if(vm.questaoCorrente.resposta != opcoes[indice].letra){
					opcoes.splice(indice, 1);
				}
			}

			vm.questionario.eliminarAcionado = true;
		}

		function acionarRecursoFinal(){
			vm.questaoCorrente.pontuacao *= 3;
			vm.questionario.recursoFinalAcionado = true;

			MensagemService.sucesso("Recuuuursssoooo Finallllllll!", "Você acionou o recurso final. Boa sorte!"); 
		}

		function acionarMultiplicador(){
			vm.questionario.multiplicadorAcionado = true;

			MensagemService.sucesso("Multiplicador acionado!", "Acerte 3 questões em seguida para começar a multiplicar os pontos!");
		}

		function iniciarTimer(){
			timer = $interval(function(){
		    	if(vm.questionario.tempo != 0){
		    		vm.questionario.tempo--;
		    	}else{
		    		vm.questionario.finalizado = true;

		    		MensagemService.erro("Ooopsss!", "Seu tempo acabou!");
		    		cancelarTimer();
		    	}
		    }, 1000);
		}

		function acionarUmMinuto(){
			vm.questionario.tempo += 60;
			vm.questionario.umMinutoAcionado = true;
		}

		function cancelarTimer(){
			$interval.cancel(timer);
		}

		function somarTempoRestante(){
			vm.pontuacaoCorrente += vm.questionario.tempo;
		}

		function irParaProxima(){
			vm.indice++;

			if(vm.indice < vm.quantidadeQuestoes){
				vm.questaoCorrente = vm.questoes[vm.indice];

				if(vm.multiplicador >= 3 && !vm.questaoCorrente.multiplicador){
					vm.questaoCorrente.pontuacao *= (vm.multiplicador - 1);
					vm.questaoCorrente.multiplicador = (vm.multiplicador - 1);
				}
			}

			if((vm.indice+1) == vm.quantidadeQuestoes && vm.pontuacaoCorrente < 0){
				vm.pontuacaoCorrente = 0;
				vm.mostrarRecursoFinal = true;
			}

			$ionicScrollDelegate.scrollTop();

		}

		function irParaAnterior(){
			vm.indice--;

			if(vm.indice >= 0){
				vm.questaoCorrente = vm.questoes[vm.indice];
			}

			$ionicScrollDelegate.scrollTop();
		}

		//Destruir o timer
		$scope.$on('$destroy', function() {
			cancelarTimer();
		});

	}

	angular.module("questionarioApp").controller("QuestaoController", QuestaoController);
})();
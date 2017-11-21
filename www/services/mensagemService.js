function MensagemService ($injector){
    var MensagemService = {};

    MensagemService.sucesso = function(titulo, mensagem){
        swal({
            title : titulo,
            text: mensagem,
            type: 'success',
            html: true
        });
    };

    MensagemService.aviso = function(callBack){
        swal({
            title: "Atenção:",
            text: "Tem certeza que deseja prosseguir com esta ação?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, tenho certeza.",
            cancelButtonText: "Não",
            closeOnConfirm: true
        }, callBack);
    };

    MensagemService.avisoCustom = function(titulo, mensagem, callBack){
        swal({
            title: titulo,
            text: mensagem,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            closeOnConfirm: true,
            html: true
        }, callBack);
    };

    MensagemService.informacao = function(mensagem){
        swal({
            title: "Atenção:",
            text: mensagem,
            type: "info",
            html: true
        });
    };
    
    MensagemService.informacaoCustom = function(titulo, mensagem, extensionOptions, callback){
        var options = {};
        
        extensionOptions = extensionOptions || {};
        
        var baseOptions = {
            title: titulo || '',
            text: mensagem || '',
            type: 'info',
            html: true
        };
        
        angular.extend(options, baseOptions, extensionOptions);
        
        
        swal(options, callback);
    };

    MensagemService.erro = function(titulo, mensagem){
        swal({
            title: titulo,
            text: mensagem,
            type: "error"
        });
    };

    return MensagemService;
}

// Registrando o serviço
angular.module('questionarioApp').factory('MensagemService', MensagemService);
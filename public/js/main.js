var tempoInicial = $("#tempo").text()
var campo = $(".campoDigitacao")

$(function(){
    atualizaTamanhoFrase()
    initContadores()
    initCronometro()
    initMarcadores()
    $("#reiniciarJogo").click(reiniciaJogo)
})

function atualizaTamanhoFrase(){
    var frase = $(".frase").text()
    var numPalavras = frase.split(/\S+/).length - 1
    var tamanhoFrase = $("#tamanhoFrase")
    tamanhoFrase.text(numPalavras)
}

function initContadores(){
    
    campo.on("input", function(){
        var content = campo.val()
        var qtdePalavras = content.split(/\S+/).length - 1
        $("#palavrasCount").text(qtdePalavras)
        $("#caracteresCount").text(content.length)
    })
}

function initCronometro(){
    var tempoRestante = $("#tempo").text()
    campo.one("focus", function(){
        var intervalId = setInterval(function(){
            tempoRestante--
            $("#tempo").text(tempoRestante)
    
            if (tempoRestante == 0)
            {
                campo.attr("disabled", true)
                clearInterval(intervalId)
                $("#reiniciarJogo").attr("disabled", false)
                campo.toggleClass("campoDisabled")
            }
        }, 1000)
    })
}

function initMarcadores(){
    var frase = $(".frase").text()
    campo.on("input", function(){
        var digitado = campo.val()
        var comparavel = frase.substr(0, digitado.length)
        console.log("Digitado:" + digitado)
        console.log("Compa:" + comparavel)

        if (digitado == comparavel)
        {
            campo.addClass("campoCorreto")
            campo.removeClass("campoErrado")
        }
        else
        {
            campo.addClass("campoErrado")
            campo.removeClass("campoCorreto")
        }
    })
}

function insertPlacar(){
    var tabela = $("placar").find("table");
    console.log(tabela)
}

function reiniciaJogo(){
    campo.attr("disabled", false)
    campo.val("")
    $("#tempo").text(tempoInicial)
    $("#caracteresCount").text("0")
    $("#palavrasCount").text("0")
    $("#reiniciarJogo").attr("disabled", true)
    campo.toggleClass("campoDisabled")
    campo.removeClass("campoCorreto")
    campo.removeClass("campoErrado")
    initCronometro()
}
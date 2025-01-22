// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext("2d");

contexto.fillStyle = "#70c5ce";

const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
        desenha(){      
            contexto.drawImage(
                sprites,
                inicio.spriteX, inicio.spriteY,
                inicio.largura, inicio.altura,
                inicio.x, inicio.y,
                inicio.largura, inicio.altura,
                );
        }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
        desenha(){
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        },
        atualiza(){    
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        }
    
}

const cidade = {
    spriteX: 390,
    spriteY: 0,
    largura: 274,
    altura: 202,
    x: 0,
    y: 280,
        desenha(){
            contexto.fillRect(0, 0, canvas.width, canvas.height);

            contexto.drawImage(
                sprites,
                cidade.spriteX, cidade.spriteY,
                cidade.largura, cidade.altura,
                cidade.x, cidade.y,
                cidade.largura, cidade.altura,
            );
            contexto.drawImage(
                sprites,
                cidade.spriteX, cidade.spriteY,
                cidade.largura, cidade.altura,
                cidade.x+cidade.largura, cidade.y,
                cidade.largura, cidade.altura,
            );

        }
};



const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: 368,
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x+chao.largura, chao.y,
                chao.largura, chao.altura,
            );

        }
};



//Clica pra iniciar
const TelaInicio = {
    desenha (){
        cidade.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    desenha(){
        cidade.desenha();
        chao.desenha();
        flappyBird.desenha();
        flappyBird.atualiza();
    },
    click(){}
}

var telaAtiva = TelaInicio;

function mudaTelaAtiva(){
    telaAtiva.click();
}
window.addEventListener("click", mudaTelaAtiva);

function loop(){
    telaAtiva.desenha();
    requestAnimationFrame(loop);
};

loop();
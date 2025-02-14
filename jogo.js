// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = "./sprites.png";
const som_punch = new Audio();
som_punch.src = "./som/punch.wav";
const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext("2d");
let animation_frame = 0;
const jogo = {};
function inicializa(){
    jogo.flappyBird = criaFlappyBird();
    jogo.cidade = criaCidade();
    jogo.chao = criaChao();
    jogo.canos = criaCanos();
    jogo.placar = criaPlacar();
};


//Objetos do cenário

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
        },
};
function criaPlacar(){
    const placar = {
        pontos: 0,
        desenha(){
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'left';
            contexto.fillStyle = 'white';
            contexto.fillText("Pontuação: " + placar.pontos, 25, 35);
        },
        atualiza(){
            const intervaloFRAMES = 20;
            const passouOIntervalo = animation_frame % intervaloFRAMES === 0;

            if(passouOIntervalo){
                placar.pontos = placar.pontos + 1;
            };
        },
    };
    return placar;
};
function criaFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 35,
        altura: 25,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        frameAtual: 0,
        rotacao: 0,
        movimentos: [
            {spriteX: 0, spriteY: 0}, // asa para cima
            {spriteX: 0, spriteY: 26}, // asa no meio
            {spriteX: 0, spriteY: 52}, // asa para baixo
            {spriteX: 0, spriteY: 26}, // asa no meio
            ],
            pula(){
                flappyBird.velocidade = - flappyBird.pulo;
            },
            desenha(){
                contexto.drawImage( 
                    sprites,
                    flappyBird.spriteX, flappyBird.spriteY,
                    flappyBird.largura, flappyBird.altura,
                    flappyBird.x, flappyBird.y,
                    flappyBird.largura, flappyBird.altura,
                );
            },
            atualizaFRAME(){
                if((animation_frame % 10) === 0){
                    flappyBird.frameAtual = flappyBird.frameAtual + 1;
                    flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
                    flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
                    flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
                };
            },
            atualiza(){
                if (fazColisao()){
                    som_punch.play();
                    telaAtiva = TelaGameOver;
                    return;
                };
                flappyBird.velocidade += flappyBird.gravidade;
                flappyBird.y = flappyBird.y + flappyBird.velocidade;
                flappyBird.atualizaFRAME();
            },
    };
    return flappyBird;
};

function criaCidade(){
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
                    cidade.x + cidade.largura, cidade.y,
                    cidade.largura, cidade.altura,
                );
                contexto.drawImage(
                    sprites,
                    cidade.spriteX, cidade.spriteY,
                    cidade.largura, cidade.altura,
                    cidade.x + (cidade.largura * 2), cidade.y,
                    cidade.largura, cidade.altura,
                );
            },
            atualiza(){
                cidade.x = cidade.x - 0.5;TelaGameOver
                cidade.x = cidade.x % (cidade.largura);
            }
    };
    return cidade;
};

function criaChao(){
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
                    chao.x + chao.largura, chao.y,
                    chao.largura, chao.altura,
                );
            },
            atualiza(){
                chao.x = chao.x - 2;
                chao.x = chao.x % (chao.largura / 2);
            }
    };
    return chao;
};

function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        ceu: {
            spriteX: 52,
            spriteY: 169,
            x: 120,
            y: -150,
        },
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        pares: [],
        espacoentreCanos: 120,
        desenha(){
            for(i = 0 ; i < canos.pares.length; i++){
                canos.ceu.x = canos.pares[i].x;
                canos.ceu.y = canos.pares[i].y
                //Canos no céu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canos.ceu.x, canos.ceu.y,
                    canos.largura, canos.altura,
                );
                // Canos no chão
                const canoChaoX = canos.ceu.x;
                const canoChaoY = canos.altura + canos.espacoentreCanos + canos.ceu.y;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                );
            };
        },
        atualiza(){
            const passou100FRAMES = (animation_frame % 100 === 0);
            if(passou100FRAMES){
                const novoPAR = {
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                }
                canos.pares.push(novoPAR);
            };
            for(i = 0 ; i < canos.pares.length; i++){
                const par = canos.pares[i];
                par.x = par.x - 2;

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                };

                if (fazColisaoOBSTACULO(par)){
                    som_punch.play();
                    telaAtiva = TelaGameOver;
                    return;
                };
            };
        },
    };
    return canos;
};

const gameOVER = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y: 70,
    desenha(){
        contexto.drawImage(
            sprites,
            gameOVER.spriteX, gameOVER.spriteY,
            gameOVER.largura, gameOVER.altura,
            gameOVER.x, gameOVER.y,
            gameOVER.largura, gameOVER.altura,
        );
    }
};


//Funções de mexer

const TelaInicio = {
    desenha (){
        jogo.cidade.desenha();
        jogo.chao.desenha();
        jogo.flappyBird.desenha();
        inicio.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
    },
};

var telaAtiva = TelaInicio;

const TelaJogo = {
    desenha(){
        jogo.cidade.desenha();
        jogo.cidade.atualiza();
        jogo.canos.desenha();
        jogo.canos.atualiza();
        jogo.chao.desenha();
        jogo.chao.atualiza();
        jogo.flappyBird.desenha();
        jogo.flappyBird.atualiza();
        jogo.placar.desenha();
        jogo.placar.atualiza();
    },
    click(){
        jogo.flappyBird.pula();
    },
};

function mudaTelaAtiva(){
    telaAtiva.click();
};

window.addEventListener("click", mudaTelaAtiva);

function fazColisaoOBSTACULO(par){
    if(jogo.flappyBird.x >= par.x){
        const alturaCabeça = jogo.flappyBird.y;
        const alturaPe = jogo.flappyBird.y + jogo.flappyBird.altura;
        const canoInicioCEUY = par.y + jogo.canos.altura;
        const canoInicioCHAOY = par.y + jogo.canos.altura + jogo.canos.espacoentreCanos;
        if(alturaCabeça <= canoInicioCEUY){
            return true;
        };
        if(alturaPe >= canoInicioCHAOY){
            return true;
        };  
    };
    return false;
};

function fazColisao(){
    if(jogo.flappyBird.y + jogo.flappyBird.altura >= jogo.chao.y){
        return true; 
    } else {return false
    }; 
};

const TelaGameOver = {
    desenha(){
        gameOVER.desenha();
    },
    click(){
        inicializa();
        telaAtiva = TelaInicio;
    },
};

function loop(){
    telaAtiva.desenha();
    contexto.fillStyle = "#70c5ce";
    requestAnimationFrame(loop);
    animation_frame = animation_frame + 1;
};

inicializa();
loop();
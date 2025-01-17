// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext("2d");

contexto.fillStyle = "#70c5ce";
contexto.fillRect(0, 0, canvas.width, canvas.height);

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
        desenha(){
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );

        }
};


const cidade = {
    spriteX: 390,
    spriteY: 0,
    largura: 274,
    altura: 202,
    x: 0,
    y: 280,
        desenha(){
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



function loop(){
    cidade.desenha();
    chao.desenha();
    flappyBird.desenha();

    requestAnimationFrame(loop);
};

loop();
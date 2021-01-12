const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.points');
const medal1 = document.querySelector('.medal1');
const medal2 = document.querySelector('.medal2');
const medal3 = document.querySelector('.medal3');
let isJumping = false;
let position = 0;
let scorePoints = 0;

function handleKeyUp(event) 
{
    if(!isJumping)
    {
        if(event.keyCode === 32)
        {
            jump();
        }
    }
    
}

function jump()
{
    isJumping = true;

    let upInterval = setInterval(() => 
    {
        if(position >= 150)
        {
            clearInterval(upInterval);

            let downInterval = setInterval(() => 
            {
                if(position <= 0 )
                {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else
                {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 25)
        }
        else
        {
            position += 20;
            dino.style.bottom = position + 'px';
        }
        
    }, 15)
}

function createCactus()
{
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => 
    {
        
        if(cactusPosition < -60)
        {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60)
        {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        }
        else
        {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

function scoreUp()
{

    let scoreInterval = setInterval(() => 
    {
        scorePoints += 1;
        score.textContent = scorePoints;  
        
        if (scorePoints === 30)
        {    
            medal1.style.visibility = 'visible';
        }
        if (scorePoints === 60)
        {    
            medal2.style.visibility = 'visible';
        }
        if (scorePoints === 90)
        {    
            medal3.style.visibility = 'visible';
        }

    }, 1000);

}

scoreUp();
createCactus();
document.addEventListener('keyup', handleKeyUp);
const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const main = document.querySelector('main')
const clicker = document.createElement('audio')

main.appendChild(clicker)
clicker.src = '../music/clickerSFXT.mp3'
clicker.controls = false
clicker.volume = 0.5

const character = [
    'SnakeFeliz',
    'snakeFelizNatal',
    'snakeGanhaPresente',
    'snakeGZ-like',
    'snakeSad',
    'snakeSoco',
    'snakeVsSuperman',
    'snakePreto',
    'snakeTankando',
    'snakeBoneco'
]

const createElement = (tag, className) =>{
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card')
    if(disabledCards.length === 20){
        clearInterval(this.loop)
        alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi ${timer.innerHTML}`)
        window.location = '../index.html'
    }
}

const checkCards = () =>{
    const firtCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')
    if( firtCharacter === secondCharacter){

        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        const sfx = document.createElement('audio')
        sfx.src = '../music/ShockMGS.mp3'
        sfx.controls = false
        sfx.play()
        sfx.volume = 0.5
        main.appendChild(sfx)
        
        firstCard = ''
        secondCard = ''

        checkEndGame()

    }else{

        setTimeout(() =>{
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''
        }, 700)
        
    }
}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return
    }

    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card')
        clicker.play()
        firstCard = target.parentNode
    }else if(secondCard === ''){
        target.parentNode.classList.add('reveal-card')
        clicker.play()
        secondCard = target.parentNode

        checkCards()
    }


    
}

const createCard = (character) =>{

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    card.className = 'card'
    front.className = 'face front'
    back.className = 'face back'

    front.style.backgroundImage = `url('../card-images/${character}.jpg')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card
}

const loadGame = ()=>{
    const duplicateCharacters = [
        ...character, ...character
    ]

    const shuffledArray = duplicateCharacters.sort(() => Math.random()-0.5)
    

    shuffledArray.forEach((character)=>{
        const card = createCard(character)
        grid.appendChild(card)
    })
}


const starTime = () =>{

    this.loop = setInterval(() =>{

        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1

    }, 1000)

}

const wannaMusic = () =>{
    const music = document.createElement('audio');
    music.src = "../music/Duran Duran - INVISIBLE (320).mp3"

    window.alert("Clique em ok para ouvir uma bela música MGS")
    window.addEventListener('click', function(){
        music.play();
    })
    

    music.controls = false
    music.loop = true
    music.volume = 0.1
    main.appendChild(music)
}

window.onload = () =>{

    spanPlayer.innerHTML = localStorage.getItem('player')
    wannaMusic()
    starTime()
    loadGame()
}


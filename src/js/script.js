import {baseMusicas} from "./baseMusicas.js";


const listaDasMusicas=document.getElementById('lista-das-musicas') 
const player = document.getElementById('audioPlayer');
const btn_pausar= document.getElementById('btn__pausar')
const btn__player=document.getElementById('btn__player')

const tituloMusicaAtual= document.getElementById('tituloMusicaAtual')
const tituloAlbumAtual= document.getElementById('tituloAlbumAtual')

const next =document.getElementById('next')
const previous = document.getElementById('previous')

const imagemAlbum=document.getElementById('fotoMusicaAtual')


let numeroMusicaSelecionada=0


/* Primeira musica a tocar automaticamente se apertar o play */
player.src = baseMusicas[numeroMusicaSelecionada].path
atualizarInfoMusica(numeroMusicaSelecionada)

btn__player.dataset.id='pausado'
/*------------------------------------*/ 

const numSongs =document.getElementById('numSongs')
numSongs.innerText=baseMusicas.length


const likeIcon =document.getElementById('likeIcon')
const likeIconList=document.getElementById('likeIconList')
likeIconList.addEventListener('mouseover',()=>{
    likeIcon.src= 'src/img/icone3-hover.png'
})
likeIconList.addEventListener('mouseout',()=>{
    likeIcon.src ='src/img/icone3.png'
})


/**------------------------------------- */
function criandoLinha(musica, musicaId){

    const linhaMusica= document.createElement('li');
    const linhaMusica__titulo= document.createElement('p');
    const linhaMusica__artista= document.createElement('p');
    const linhaMusica__album= document.createElement('p');
    
    linhaMusica__titulo.className= 'primeiro-item';
    linhaMusica.className='linhas'

    linhaMusica.dataset.id = musicaId;
    linhaMusica.setAttribute('id',`${musicaId}`)

    linhaMusica.appendChild(linhaMusica__titulo);
    linhaMusica.appendChild(linhaMusica__artista);
    linhaMusica.appendChild(linhaMusica__album);
    
    linhaMusica__titulo.innerText= musica.name
    linhaMusica__artista.innerText= musica.artist
    linhaMusica__album.innerText= musica.album

    listaDasMusicas.appendChild(linhaMusica)
   
    /* Função para tocar a música ao clicar em item da lista */
    linhaMusica.addEventListener('click', (evento)=>{        

        let numeroMusicaSelecionada = (evento.currentTarget.dataset.id)

        tocarMusica(numeroMusicaSelecionada);
        atualizarInfoMusica(numeroMusicaSelecionada);
        alterarCorMusicaSelecionada(numeroMusicaSelecionada)
        
  

    })
}

const elementoClicado = document.querySelector('li')


function inserindoMusicasBaseDados() {
    for(var i=0; i< baseMusicas.length   ; i++){

        criandoLinha(baseMusicas[i] , i )

    }
    console.log(numeroMusicaSelecionada)
    



/**-------------------------------------- */

}

inserindoMusicasBaseDados();


/* Função para tocar*/
function tocarMusica(musicaSelecionada){

    player.src = baseMusicas[musicaSelecionada].path;
    player.play();
    
    btn__player.src="./src/img/pause.png"
    btn__player.dataset.id='tocando'
    
}
/**Função para atualizar informarções */
function atualizarInfoMusica(musicaSelecionada){
    tituloMusicaAtual.innerText=baseMusicas[musicaSelecionada].name
    tituloAlbumAtual.innerText=baseMusicas[musicaSelecionada].album

    imagemAlbum.src=baseMusicas[musicaSelecionada].image
}
/* Função para mudar cor da linha da musica */

function alterarCorMusicaSelecionada(musicaSelecionada){
    for(let contador=0; contador<baseMusicas.length ; contador++){
        document.getElementById(`${contador}`).style.backgroundColor='#131313';
        if(contador==musicaSelecionada){
            document.getElementById(`${contador}`).style.backgroundColor='rgb(31, 31, 31)';
        }
    }
}



/*   Botão para pausar   */ 
btn_pausar.addEventListener('click', ()=>{
    
    player.pause()
    btn__player.src="src/img/play.png"
    btn__player.dataset.id='pausado'

})


/* Função para o botão de pause */
btn__player.addEventListener('click', (event)=>{


    
    if(btn__player.dataset.id=='tocando'){

        player.pause();
        btn__player.dataset.id='pausado'
        btn__player.src="src/img/play.png"

    }
    else if(btn__player.dataset.id=='pausado'){

        player.play()
        btn__player.dataset.id='tocando'
        btn__player.src="src/img/pause.png"


    }

})


/** Alterar volume */

const btn__volume = document.getElementById('btn__volume')
const range__volume = document.getElementById('range__volume')

btn__volume.addEventListener('click',()=>{
    range__volume.value=0
    player.volume = range__volume.value
});


range__volume.addEventListener('input', ()=>{

    player.volume = range__volume.value

})

for(var j=0; j<baseMusicas.length ; j++){
    const idValor = document.getElementsByClassName('linhas')[j]
    idValor.addEventListener('click',(evento)=>{
        numeroMusicaSelecionada= evento.currentTarget.id
    })
}

    /**Avançar --------------------------------------------*/
    next.addEventListener('click',function (){

        if(numeroMusicaSelecionada==baseMusicas.length-1){
            numeroMusicaSelecionada=0
            tocarMusica(numeroMusicaSelecionada);
            atualizarInfoMusica(numeroMusicaSelecionada);
            alterarCorMusicaSelecionada(numeroMusicaSelecionada)
        }
        else{
            numeroMusicaSelecionada++
            tocarMusica(numeroMusicaSelecionada);
            atualizarInfoMusica(numeroMusicaSelecionada);
            alterarCorMusicaSelecionada(numeroMusicaSelecionada)
        }
        
}) 
/**Voltar ------------------------------------------------*/
previous.addEventListener('click', function(){
    
    if(numeroMusicaSelecionada==0){
        numeroMusicaSelecionada=baseMusicas.length-1;
        tocarMusica(numeroMusicaSelecionada);
        atualizarInfoMusica(numeroMusicaSelecionada);
        alterarCorMusicaSelecionada(numeroMusicaSelecionada)

        numeroMusicaSelecionada=baseMusicas.length-1;
                   
    }
    else{
        numeroMusicaSelecionada--;
        tocarMusica(numeroMusicaSelecionada);
        atualizarInfoMusica(numeroMusicaSelecionada);
        alterarCorMusicaSelecionada(numeroMusicaSelecionada)

    }
    console.log(numeroMusicaSelecionada)
})

const modulo=(()=>{
    'use strict'
    let deck=[];
    const tipos=['C','D','H','S'],especiales=['A','J','Q','K'];
   
    const btnPedir=document.querySelector('#btnPedir'),
          btnNuevo=document.querySelector('#btnNuevo'),
          btnDetener=document.querySelector('#btnDetener');

    const divCartasJugadores=document.querySelectorAll('.divCartas');
        
          
    let puntosJugador=0,puntosCompu=0,puntosComputadora=0,puntajePlayer=document.querySelectorAll("small");;
    let puntosJugadores=[];
  
    console.log(btnPedir);
    const inicializarJuego=(numJugadores=2)=>{
        deck=crearDeck();
        puntosJugadores=[];
        for(let i=0;i<numJugadores;i++){
            puntosJugadores.push(0);
        }
        puntosJugadores[0]=0;
        btnDetener.removeAttribute('disabled');
        btnPedir.removeAttribute('disabled');
        //deck=[];
        //deck=crearDeck();
        
        while (divCartasJugadores[0].hasChildNodes()) {
            divCartasJugadores[0].removeChild(divCartasJugadores[0].firstChild);
            
        }
        while (divCartasJugadores[1].hasChildNodes()) {
            divCartasJugadores[1].removeChild(divCartasJugadores[1].firstChild);
            
        }
        puntajePlayer.forEach((datos)=>{
            datos.innerHTML=0;
        });
       

    }
    const crearDeck=()=>{
        deck=[];
        for(let i=2;i<=10;i++){
            for(let j=0;j<4;j++){
                deck.push(`${i}${tipos[j]}`);
            }
            
        }
        for(let speci of especiales){
            for(let tipo of tipos){
                deck.push(`${speci}${tipo}`);
    
            }
        }
        //console.log(deck);
        
        return _.shuffle(deck);
    }
    
   
    // Esta funcion me permite tomar una carta
    
    const pedirCarta=()=>{
        if(deck.length===0){
            throw 'No hay cartas en el deck';
        }
        
        
        //console.log('carta extraida',carta1);
        //console.log(deck);
        return deck.shift();
    }
    //valor
    const valorCarta=(carta)=>{
        const valor=carta.substring(0,carta.length-1);
        return isNaN(valor)?((valor==='A')?11:10):parseInt(valor);
       //let puntos=0;
       //if(isNaN(valor)){
       //    puntos=(valor==='A')?11:10;
       //    console.log('No es un numero');
       //    console.log(puntos);
       //}else{
       //    console.log('Es un numero');
       //    puntos=parseInt(valor);
       //    
       //}
    }
    //turno compu
//turno 0=1er Judador
    const acumularPuntos=(carta='',turno=0)=>{
        puntosJugadores[turno]=puntosJugadores[turno]+valorCarta(carta);
        puntajePlayer[turno].innerHTML=puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    const crearCarta=(carta='',turno=0)=>{
        const etiImg=document.createElement('img');
        etiImg.setAttribute('class','carta');
        etiImg.setAttribute('src',`./assets/cartas/cartas/${carta}.png`);
       divCartasJugadores[turno].append(etiImg);

    }

const determinarGanador=()=>{
    const [puntosMinimos,puntosComputadora]=puntosJugadores;
    setTimeout(() => {
        if(puntosComputadora===puntosMinimos){
            alert('nadie gana/empate');
        }
        else if(puntosMinimos>21){
            alert('compu gana :K');
        }
        else if(puntosComputadora>21){
            alert('Jugador Gana');

        }
        else{
            alert('Compu gana');
        }
        
    }, 100);
}
    const turnoCompu=(puntosMinimos=0)=>{
        let puntosComputadora=0
        do {
            const carta=pedirCarta();
            puntosComputadora=acumularPuntos(carta,1);
            crearCarta(carta,1);
            console.log(puntosComputadora);
            
        } while ((puntosComputadora<puntosMinimos) &&(puntosMinimos<=21));
            
        determinarGanador();
            
       // console.log({carta});
           
            
        
    
    }
    
  //  let cartaObte=valorCarta(pedirCarta());
    //console.log({cartaObte});
    
    btnPedir.addEventListener('click',()=>{

        const carta=pedirCarta();
        //console.log({carta});
        const puntosJugador=acumularPuntos(carta,0);
        crearCarta(carta,0);
       //puntajePlayer[0].innerHTML=puntosJugador;
       //desplazarCarta(carta,cartaContainer);
       
         if(puntosJugador>21){ 
            console.log("puntos");
        console.log("perdiste");
        btnPedir.setAttribute('disabled','disabled');
        btnDetener.setAttribute('disabled','disabled');
        turnoCompu(puntosJugador);
         
        
       }
       else if(puntosJugador===21){
        console.log('21, genial');
        btnPedir.setAttribute('disabled','disabled');
        btnDetener.setAttribute('disabled','disabled');
        turnoCompu(puntosJugador);
       
       }
        
       }, 10);
      
    
    btnDetener.addEventListener('click',()=>{
        btnDetener.setAttribute('disabled','disabled');
        btnPedir.setAttribute('disabled','disabled');
        turnoCompu(puntosJugadores[0]);
    });
    btnNuevo.addEventListener('click',()=>{
        
        inicializarJuego(2);
    
    });
    return {
        nuevoJuego:inicializarJuego
    };
})();
/*
2C= two of clubs
2D=two of diamonds
2H=two of hearts
2S=spades


*/

//"App" elements

const app = document.querySelector('.app');

//"Money" elements

const walletCash = document.querySelectorAll('.wallet-cash');

//"Cash machine" elements

const cashSpan = document.querySelector('#cash_span');
const cup = document.querySelector('.cup');
const cupHandle = document.querySelector('.cup_handle');

//"Coffee case" elements

const coffeeCase = document.querySelector('.coffee-case');
const coffee = document.querySelectorAll('.coffee');

//"Coffee machine" elements

const workInd = document.querySelector('#work_ind');      //ind - indicator
const stopInd = document.querySelector('#stop_ind');
const coffeeLiquid = document.querySelector('.coffee_liquid');

//Sounds

const buyAudio = document.querySelector('.buy_audio');
const coffeeAudio = document.querySelector('.coffee_audio');
const doneAudio = document.querySelector('.done_audio');


//State manage
const state = {
    current_money:0,
    lamp:false
}

//Functions

function getMoney(e){
    let cash = parseInt(e.target.getAttribute('data-cost'));
    state.current_money += cash;
   
    cashSpan.innerHTML =state.current_money;

    coffeeCase.style.display = 'flex';

    cup.style.display = 'flex';
}

function buyCoffee(e){
    
    let coffeeCost = parseInt(e.target.getAttribute('data-cost'));

    if (state.current_money >= coffeeCost) {
        buyAudio.play();
        state.current_money -= coffeeCost;
        cashSpan.innerHTML = state.current_money; 
        coffeeCase.style.display = 'none'; 
        machineWork();
    }else{
        const divAlert = document.createElement('div');
        divAlert.classList = ('div_alert');
        divAlert.textContent = 'НЕДОСТАТОЧНО СРЕДСТВ';
        app.appendChild(divAlert);

        setTimeout(function(){
            divAlert.remove();
        }, 3000);
    }
}

function machineWork(){
    state.lamp = true;

    coffeeLiquid.style.display = 'block';

    setTimeout(function(){
        coffeeAudio.play();
    }, 1000);

    if(state.lamp = true){
        workInd.style.backgroundColor = '#2d6844';
        stopInd.style.background = 'none';
    }

    setTimeout(function(){
        coffeeLiquid.style.top = '470px';
        coffeeLiquid.style.opacity = '0';
    }, 4000);

    setTimeout(function(){
        workInd.style.background = 'none';
        stopInd.style.backgroundColor = '#b83030';
        coffeeLiquid.style.display = 'none';
        coffeeLiquid.style.opacity = '1';
        coffeeLiquid.style.top = '400px';

        cup.classList.add('coffee_getting');

        doneAudio.play();
        
    }, 5000);

    setTimeout(function(){
        cup.classList.remove('coffee_getting');
        cup.style.display = 'none';
    }, 9000)

    state.lamp = false;
}



//Events


walletCash.forEach((value)=>{
     
    value.addEventListener('click',getMoney);
})

coffee.forEach((value)=>{
    value.addEventListener('click', buyCoffee);
})
const ethers = require('ethers');
const ERC20ABI = require('./ERC20.json');

//0. PREPARAZIONE AL BOT
//0.1 BOILER PLATE ----------------------------START----------------------------------------
const addresses = {
    WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    me: "0xd1AFEF168259F6561D2b6FC1b7A5662153fF3f9a"
}
const mnemonic = "say property piano base snake veteran forward only salt skull pudding else"

const provider = new ethers.providers.WebSocketProvider("wss://compatible-fragrant-haze.bsc.discover.quiknode.pro/1c43e6f08bda5f83f504749aacaf9fe8942042b0/")
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
const account = wallet.connect(provider)

const factory = new ethers.Contract(
    addresses.factory,
    ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
    account
);
const router = new ethers.Contract(
    addresses.router,
    [
        'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
        'function swapExactTokensForTokens( uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)',
    ],
    account
);
//BOILER PLATE ---------------------------------END----------------------------------------------

//0.2 CREA INTERFACCIA PER CONTRATTO CHE COMPRA E VENDE----------------------START-



//CREA INTERFACCIA PER CONTRATTO CHE COMPRA E VENDE----------------------END-------

//1. METTE I NUOVI PAIR IN UN'ARRAY E PREPARIAMO I BALANCES--------------START-----
let tokens = [];
let pairs = [];

factory.on("PairCreated", async (token0, token1, addressPair) => {
      if(token0 === addresses.WBNB){
        token0 = "WBNB"
        pairs.push(addressPair);
        tokens.push(token1)
        console.log("####################################")
        console.log("")
        console.log("ADDRESS PAIR ARRAY")
        console.log(pairs);
        console.log("")
        console.log("TOKEN ADDRESSS ARRAY")
        console.log(tokens);
        console.log("")
        console.log("####################################")
    }
      if(token1 === addresses.WBNB) {
        token1 = "WBNB"
        pairs.push(addressPair);
        tokens.push(token0)
        console.log("####################################")
        console.log("")
        console.log("ADDRESS PAIR ARRAY")
        console.log(pairs);
        console.log("")
        console.log("TOKEN ADDRESSS ARRAY")
        console.log(tokens);
        console.log("")
        console.log("####################################")
      }
       else {
        console.log("####################################")
        console.log("")
        console.log("Not a BNB pair")
        console.log("")
        console.log("####################################")
       }
    }
)
//METTE I NUOVI PAIR IN UN'ARRAY E PREPARIAMO I BALANCES--------------END---------

//2. ANALIZZIAMO IL CAMBIO DI LIQUIDITÀ DI DEI VARI PAIRS CHE ABBIAMO NELL'OGGETTO--START---
     let getLiquiidty = setInterval(async ()=> {
        if(pairs.length <= 0){
            console.log("####################################")
            console.log("")
            console.log("There's no pair here yet")
            console.log("")
            console.log("####################################")
        }else {
        for(let i = 0; i < pairs.length; i++){
            let currentPair = pairs[i]
            let currentToken = tokens[i]
            let WBNB_Contract = new ethers.Contract(addresses.WBNB, ERC20ABI, provider)
            let WBNB_Balance = await WBNB_Contract.balanceOf(currentPair);
            let balance = ethers.utils.formatEther(WBNB_Balance);
            let indexPair = pairs.indexOf(currentPair);
            let indexToken = tokens.indexOf(currentToken);

            if(balance >= 3){
                //buyToken()
                console.log(pairs)
                console.log(currentPair,":", balance)
                console.log(currentToken)
                if(indexPair === i ) {pairs.splice(indexPair,1)}
                else if (indexToken === i) {tokens.splice(indexToken,1)}
                console.log(pairs)
            }
            else{
                console.log("####################################")
                console.log("")
                console.log("Not enough Liquidity")
                console.log("")
                console.log("####################################")
                console.log(pairs)
            }
        }
      }
      }, 20000);
//ANALIZZIAMO IL CAMBIO DI LIQUIDITÀ DI DEI VARI PAIRS CHE ABBIAMO NELL'OGGETTO--END-----     













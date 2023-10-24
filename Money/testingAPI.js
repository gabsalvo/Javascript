const ethers = require('ethers');
const ERC20ABI = require('./ERC20.json');

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


let pairs = ['0x8aaf0ca85d0221bd707bd34910d5445b15a39e35', '0x9a6dbdd5c05e7731f20cacbde42000d214262650', '0x0F6465f0E14564FAf32C8b3F23fCe36f6B14a920']

let getLiquiidty = setInterval(async ()=> {
  if(pairs.length <= 0){
      console.log("####################################")
      console.log("")
      console.log("There's no pair here yet")
      console.log("")
      console.log("####################################")
  }else {
  for(let i = 0; i < pairs.length; i++){
      let current = pairs[i]
      let WBNB_Contract = new ethers.Contract(addresses.WBNB, ERC20ABI, provider)
      let WBNB_Balance = await WBNB_Contract.balanceOf(current);
      let balance = ethers.utils.formatEther(WBNB_Balance);
      let index = pairs.indexOf(current);
      if(balance >= 3){
          //buyToken()
          console.log(pairs)
          console.log(current,":", balance)
          if(index=== i ) pairs.splice(index,1)
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
}, 2000);

//2. ANALIZZIAMO IL CAMBIO DI LIQUIDITÀ DI DEI VARI PAIRS CHE ABBIAMO NELL'OGGETTO
 /*let getBNB_Balance = setInterval(async () => {
        const response = await fetch("https://api.bscscan.com/api?module=account&action=balancemulti&address=" + new_pairAddress_no_liquidity + "&tag=latest&apikey=85IGXYBFRI611CUJ55JHDNT7WHDCIHYEV3")
        const balances = await response.json()
        let status = balances.status;
        let check = balances.result;
        if(status === "0") {console.log("STILL NO NEW PAIRS")}
        else if(status === "1")
        {
        for(let i = 0; i < check.length; i++) {
            let goodBalances = ethers.utils.formatEther(check[i].balance);
            if(goodBalances >= 0) console.log(goodBalances);
        }
        }
        else{
            console.log("ERROR WITH API")
        }
      }, 20000);
      */
     //HO SCRITTO CODICE INUTILE SE DEVO SOLO CERCARE IL WBNB BALANCE BUT STILL I'LL TAKE IT, HO IMPARATO

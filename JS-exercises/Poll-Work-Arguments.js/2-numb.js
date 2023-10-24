'use strict';

const obj = {
  args: [
    '1.Accisa in generale',
    '2.Fattore generatore',
    '3.Esigibilità accisa',
    '4.Accertamento, liquidazione, pagamento',
    '5.Abbuoni e perdite',
    '6.Regime Deposito fiscale',
    '7.Depositario autorizzato',
    '8.Circlazione prodotti in regime sospensivo',
    '9.Irregolarità nella circolazione dei rpdotti soggeti ad accisa',
    '10.Accisa armonizzata e non',
    '11.Destinatario registrato',
    '12.Speditore Registrato',
    '13.Contrassegni fiscali',
    '14.Rimborsi accisa',
    '15.Gasolio commerciale',
    '16.Recupero accisa',
    '17.Esenzioni',
    '18.Poterie e controlli amministrazione',
    '19.Accertamento delle violazioni',
    '20.Accisa sui prodotti energetici',
    '21.Accisa sul gas naturale',
    '22.Depositi fiscali prodotti energetici',
    '23.usi agevolati aliquota ridotta',
    '24.Depostito prodotti soggetti ad accisa',
    '25.accisa prodotti alcolici',
    '26.accertamento qualitativo',
    '27.accertamento quantitativo',
    '28.Deposito fiscale prodotti alcolici',
    '29.accisa vino,birra etc',
    '30.circolazione prodtti assoggettati accisa',
    '31.accisa microbirrifcio',
    '32.deficienze ed eccedenze nel deposito fiscale art 47',
    '33.Accisa energia elettrica e sanzionimposta consumi oli lubrificanti',
    '34.Gasolio agricolo',
    '35.Licenza fiscale e diritti annuali',
    '36.Tabella A',
    '37.Accisa gpl',
    '38.Codice ditta e accisa',
    '39.e das e e da',
  ],
  pollResults: new Array(40).fill(0),

  registerAnswer() {
    for (let i = 0; i <= 100; i++) {
      const answer = Math.trunc(Math.random() * obj.args.length) + 1;
      this.pollResults[answer]++;
      console.log(this.pollResults);
    }
  },
};

obj.registerAnswer();

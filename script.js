class BitcoinStatus {
  constructor(time) {
    this.time = time;
    this.price = document.createElement('p');

    // O primero valor é igual o InitialPrice
    // No entanto usamos o newPrice para não fazer o append com span
    this.price.innerText = this.newPrice();
    this.price.classList.add('manteve'); // inicia com o objeto com a classe manteve
    document.body.appendChild(this.price);
  }

  initialPrice() {
    fetch('https://blockchain.info/ticker')
    .then(body => body.json())
    .then(coin => {
      const span = document.createElement('span');
      span.classList.add('init')
      const brFormatedPrice = coin.BRL.sell.toString().replace('.', ',');
      span.innerText = brFormatedPrice;

      document.body.appendChild(span);
    });
  }

  newPrice() {
    fetch('https://blockchain.info/ticker')
    .then(body => body.json())
    .then(coin => {
      const brFormatedPrice = coin.BRL.sell.toString().replace('.', ',');
      this.price.innerText = brFormatedPrice
    });
  }

  extractECompare() {
    const p = document.querySelector('p');
    const span = document.querySelector('.init');
  
    // Volta os valores para o padrão americano para o cálculo
    const attValue = +p.innerText.toString().replace(',', '.');
    const initValue = +span.innerText.toString().replace(',', '.');

    if (attValue > initValue) {
      this.removeStatusClass(p);
      p.classList.add('subiu');
    } else if (attValue < initValue) {
      this.removeStatusClass(p);
      p.classList.add('desceu');
    } else {
      this.removeStatusClass(p);
      p.classList.add('manteve');
    }
  }

  removeStatusClass(element) {
    const classes = element.getAttribute('class');

    if (classes) {
      return element.removeAttribute('class');
    }
  }

  init() {
    this.initialPrice();

    if (time) {
      setInterval(() => this.newPrice(), this.time * 1000);
      setInterval(() => this.extractECompare(), this.time * 1000);
    }
    return this;
  }
}

const btcStatus = new BitcoinStatus(10);
btcStatus.init();





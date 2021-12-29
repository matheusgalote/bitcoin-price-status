class Status {
  constructor(time) {
    this.time = time;
    this.price = document.createElement('p');

    // O primero valor é igual o InitialPrice
    // No entanto usamos o newPrice para não fazer o append com span
    this.price.innerText = this.newPrice(); 
    document.body.appendChild(this.price);
  }

  initialPrice() {
    fetch('https://blockchain.info/ticker')
    .then(body => body.json())
    .then(coin => {
      const span = document.createElement('span');
      span.classList.add('init')
      span.innerText = coin.BRL.sell;

      document.body.appendChild(span);
    });
  }

  newPrice() {
    fetch('https://blockchain.info/ticker')
    .then(body => body.json())
    .then(coin => {
      this.price.innerText = coin.BRL.sell;
    });
  }

  extractECompare() {
    const p = document.querySelector('p');
    const span = document.querySelector('.init');
  
    const attValue = +p.innerText;
    const initValue = +span.innerText;

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
    setInterval(() => this.newPrice(), this.time * 1000);
    setInterval(() => this.extractECompare(), this.time * 1000);
  }
}

const statu = new Status(10);
statu.init();





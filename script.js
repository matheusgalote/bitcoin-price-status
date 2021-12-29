class Status {
  constructor(time) {
    this.time = time;
    this.price = document.createElement('p');
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
      p.classList.remove('manteve');
      p.classList.remove('desceu');
      p.classList.add('subiu')
    } else if (attValue < initValue) {
      p.classList.remove('manteve');
      p.classList.remove('subiu')
      p.classList.add('desceu');
    } else {
      p.classList.remove('desceu');
      p.classList.remove('subiu');
      p.classList.add('manteve');
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





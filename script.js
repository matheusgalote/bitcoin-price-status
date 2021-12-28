function initalPrice() {
  fetch('https://blockchain.info/ticker')
    .then(body => body.json())
    .then(coin => {
      const span = document.createElement('span');
      span.classList.add('init')
      span.innerText = coin.BRL.sell;

      document.body.appendChild(span);
    });
}

initalPrice();

function newPrice() {
  const p = document.createElement('p');
  document.body.appendChild(p);

  setInterval(() => {
    async function btcPrice() {
      const btc = await fetch('https://blockchain.info/ticker');
      const btcJSON = await btc.json();
    
      p.innerText = btcJSON.BRL.sell;
    }
    btcPrice()
  }, 1000 * 10);
}

newPrice();

function extractECompare() {

  const p = document.querySelector('p');
  const span = document.querySelector('.init');

  const attValue = +p.innerText;
  const initValue = +span.innerText;

  if (attValue > initValue) {
    p.classList.add('subiu')
  } else if (attValue < initValue) {
    p.classList.add('desceu');
  } else {
    p.classList.add('manteve');
  }
}

setInterval(() => extractECompare(), 1000 * 10);





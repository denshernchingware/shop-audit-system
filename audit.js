let report = [];
function Displayitems() {
  const item = document.querySelector(".js-item");
  const stock = document.querySelector(".js-openingStock");
  const stockEnd = document.querySelector(".js-clStock");
  const adds = document.querySelector(".js-adds");
  const unitPrice = document.querySelector(".js-unitPrice");

  let itemName = item.value;
  let openingStock = stock.value.trim();
  let closingStock = stockEnd.value.trim();
  let additions = adds.value.trim();
  let pricePerUnit = unitPrice.value.trim();

  report.push({
    itemName,
    openingStock,
    additions,
    closingStock,
    pricePerUnit,
  });
  console.log(report);
  renderDisplay();
}

function renderDisplay() {
  let html = "";
  for (let i = 0; i < report.length; i++) {
    let os = Number(`${report[i].openingStock}`);
    let adds = Number(`${report[i].additions}`);
    let cs = Number(`${report[i].closingStock}`);
    let up = Number(`${report[i].pricePerUnit}`);

    let sold = 0;

    sold = os + adds - cs;
    console.log(sold);

    let amount = "";
    amount = sold * up;
    console.log(amount);

    html += `
 
    <div class="body-col">
      <span>${report[i].itemName}</span>
      <span>${report[i].openingStock}</span>
      <span>${report[i].additions}</span>
      <span>${report[i].closingStock}</span>
      <span>${sold}</span>
      <span>$${report[i].pricePerUnit}</span>
      <span>$ ${amount}</span>
      <span 
      onclick="report.splice(${i}, 1); renderDisplay();"
      class="delete-btn"
    ><i class="fa-solid fa-trash"></i></span>
    </div>
    
  </div>
  `;
  }
  document.querySelector(".js-report").innerHTML = html;
}

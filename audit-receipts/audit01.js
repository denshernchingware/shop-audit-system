const receipts = JSON.parse(localStorage.getItem("receipts")) || [];

const receiptsInfo = () => {
  const cashInHandCdInput = document.querySelector(".js-cashInHand");
  const cashInHandCd = cashInHandCdInput.value;
  const cashInHandBdInput = document.querySelector(".js-cashInHandBd");
  const cashInHandBd = cashInHandBdInput.value;

  const bankedInput = document.querySelector(".js-banked");
  const banked = bankedInput.value;

  //add to receipts
  receipts.push({ cashInHandCd, cashInHandBd, banked });

  //store receipts in storage
  localStorage.setItem("receipts", JSON.stringify(receipts));

  cashInHandCdInput.value = "";
  cashInHandBdInput.value = "";
  bankedInput.value = "";

  console.log(cashInHandCd);
  console.log(cashInHandBd);
  console.log(banked);
  console.log(receipts);
};

//submit
const submit = document.querySelector(".js-submit-btn");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  receiptsInfo();
});

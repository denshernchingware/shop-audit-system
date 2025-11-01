// Load report
window.onload = function () {
  const savedReport = JSON.parse(localStorage.getItem("report")) || [];
  renderDisplay(savedReport);

  //load receipts

  const savedReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
  auditSummary(savedReceipts);
};
let totalAmounts = [];

function renderDisplay(reportData) {
  let html = "";

  for (let i = 0; i < reportData.length; i++) {
    let os = Number(reportData[i].openingStock);
    let adds = Number(reportData[i].additions);
    let cs = Number(reportData[i].closingStock);
    let up = Number(reportData[i].pricePerUnit);

    let sold = os + adds - cs;
    let amount = sold * up;
    totalAmounts.push(amount);
    html += `
      <div class="body-col">
        <span>${reportData[i].itemName}</span>
        <span>${reportData[i].openingStock}</span>
        <span>${reportData[i].additions}</span>
        <span>${reportData[i].closingStock}</span>
        <span>${sold}</span>
        <span>$${reportData[i].pricePerUnit}</span>
        <span>$${amount}</span>

        <!-- Delete Button -->
        <span onclick="deleteItem(${i})" class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </span>
      </div>
    `;
  }

  document.querySelector(".js-report").innerHTML = html;
}
//audit summary
function auditSummary(summary) {
  if (summary.length === 0) return;

  const item = summary[summary.length - 1];
  const cashInHandCd = Number(item.cashInHandCd) || 0;
  const cashInHandBd = Number(item.cashInHandBd) || 0;
  const banked = Number(item.banked) || 0;

  let totalCashBalance = cashInHandCd + banked;
  let totalAmount = 0;

  totalAmounts.forEach((item) => {
    totalAmount += item;
    console.log(totalAmount);
  });
  const auditSummaryHTML = `
    <h2>Audit Summary</h2>
    <div class="summary-grid">
      <div class="summary-item">
        <span class="label">Cash in hand b/d</span>
        <span class="value">$${cashInHandBd}</span>
      </div>
      <div class="summary-item">
        <span class="label"><strong>Add</strong> Total sold</span>
        <span class="value">$${totalAmount}</span>
      </div>
      <div class="summary-item total">
        <span class="label"><strong>Grand total expected</strong></span>
        <span class="value"><strong>$${
          cashInHandBd + totalAmount
        }</strong></span>
      </div>
      <div class="summary-item">
        <span class="label" style="margin-top: 30px">Cash in hand c/d</span>
        <span class="value" style="margin-top: 30px">$${cashInHandCd}</span>
      </div>
      <div class="summary-item">
        <span class="label"><strong>Add </strong>Banked</span>
        <span class="value">$${banked}</span>
      </div>
      <div class="summary-item">
        <span class="label"><strong>Total Cash Balance</strong></span>
        <span class="value"><strong>$${totalCashBalance}</strong></span>
      </div>
      <div class="summary-item">
        <span class="label" style="margin-top: 30px"><strong>Difference</strong></span>
        <span class="value" style="margin-top: 30px"><strong>$${
          cashInHandBd + totalAmount - totalCashBalance
        }</strong></span>
      </div>
    </div>
  `;

  document.querySelector(".js-audit-summary").innerHTML = auditSummaryHTML;
  renderDisplay();
}

// Alert
function deleteItem(index) {
  const report = JSON.parse(localStorage.getItem("report")) || [];

  Swal.fire({
    title: "Delete Item?",
    text: "Are you sure you want to delete this item from the report?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    background: "#111827",
    color: "#f3f4f6",
  }).then((result) => {
    if (result.isConfirmed) {
      report.splice(index, 1);
      localStorage.setItem("report", JSON.stringify(report));
      renderDisplay(report);

      Swal.fire({
        title: "Deleted!",
        text: "The item has been removed successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#111827",
        color: "#f3f4f6",
      });
    }
  });
}

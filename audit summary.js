// ✅ Load report on page load
window.onload = function () {
  const savedReport = JSON.parse(localStorage.getItem("report")) || [];
  renderDisplay(savedReport);
};

// ✅ Render Report Display
function renderDisplay(reportData) {
  let html = "";

  for (let i = 0; i < reportData.length; i++) {
    let os = Number(reportData[i].openingStock);
    let adds = Number(reportData[i].additions);
    let cs = Number(reportData[i].closingStock);
    let up = Number(reportData[i].pricePerUnit);

    let sold = os + adds - cs;
    let amount = sold * up;

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

// ✅ SweetAlert Delete Function
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

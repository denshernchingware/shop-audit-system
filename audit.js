// ✅ Initialize or load from localStorage
let report = JSON.parse(localStorage.getItem("report")) || [];

function Displayitems() {
  const item = document.querySelector(".js-item");
  const stock = document.querySelector(".js-openingStock");
  const stockEnd = document.querySelector(".js-clStock");
  const adds = document.querySelector(".js-adds");
  const unitPrice = document.querySelector(".js-unitPrice");

  let itemName = item.value.trim();
  let openingStock = stock.value.trim();
  let closingStock = stockEnd.value.trim();
  let additions = adds.value.trim();
  let pricePerUnit = unitPrice.value.trim();

  // Validate inputs
  if (
    !itemName ||
    !openingStock ||
    !closingStock ||
    !additions ||
    !pricePerUnit
  ) {
    Swal.fire({
      title: "Missing Fields!",
      text: "⚠️ Please fill in all fields before submitting.",
      icon: "error",
      background: "#111827",
      color: "#f3f4f6",
      confirmButtonColor: "#2563eb",
    });
    return;
  }

  // 🧾 Confirmation with custom styling
  Swal.fire({
    title: "Confirm Details",
    html: `
      <div style="text-align:left; font-size:14px;">
        <p><b>Item Name:</b> ${itemName}</p>
        <p><b>Opening Stock:</b> ${openingStock}</p>
        <p><b>Additions:</b> ${additions}</p>
        <p><b>Closing Stock:</b> ${closingStock}</p>
        <p><b>Unit Price:</b> ${pricePerUnit}</p>
      </div>
      <p style="margin-top:10px;">Do you want to <b>submit</b> these details?</p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Edit",
    background: "#111827",
    color: "#f3f4f6",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
  }).then((result) => {
    if (result.isConfirmed) {
      // Save data
      report.push({
        itemName,
        openingStock,
        additions,
        closingStock,
        pricePerUnit,
      });

      localStorage.setItem("report", JSON.stringify(report));

      // 🎉 Success popup
      Swal.fire({
        title: "Item Added!",
        text: "✅ Item successfully added to the Audit Report page!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#111827",
        color: "#f3f4f6",
      });

      // Clear inputs
      item.value = "";
      stock.value = "";
      stockEnd.value = "";
      adds.value = "";
      unitPrice.value = "";
    } else {
      // Edit message
      Swal.fire({
        title: "Edit Mode",
        text: "You can edit your details and try again.",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
        background: "#111827",
        color: "#f3f4f6",
      });
    }
  });
}

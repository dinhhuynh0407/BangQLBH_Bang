// ============================
//   KHỞI TẠO DỮ LIỆU TỪ LOCALSTORAGE
// ============================
let products = JSON.parse(localStorage.getItem("products")) || [];

const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productList = document.querySelector("#productList");
const addBtn = document.querySelector("#addBtn");

// ============================
//   HIỂN THỊ DANH SÁCH
// ============================
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((p, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="border p-2 text-center">${index + 1}</td>
      <td class="border p-2">${p.name}</td>
      <td class="border p-2">${Number(p.price).toLocaleString()}</td>
      <td class="border p-2 text-center">
        <button class="updateBtn bg-yellow-400 px-3 py-1 rounded mr-2">Sửa</button>
        <button class="deleteBtn bg-red-500 text-white px-3 py-1 rounded">Xóa</button>
      </td>
    `;

    productList.appendChild(tr);
  });
}

renderProducts();

// ============================
//   LƯU DỮ LIỆU VÀO LOCALSTORAGE
// ============================
function saveToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// ============================
//   THÊM SẢN PHẨM
// ============================
addBtn.addEventListener("click", () => {
  const name = productName.value.trim();
  const priceStr = productPrice.value.trim();
  const price = Number(priceStr);

  // Kiểm tra hợp lệ
  if (!name || isNaN(price)) {
    alert("Vui lòng nhập tên sản phẩm và giá hợp lệ (số)!");
    return;
  }

  products.push({ name, price }); // Giá luôn là number
  saveToStorage();
  renderProducts();

  productName.value = "";
  productPrice.value = "";
});

// ============================
//   SỬA & XÓA SẢN PHẨM (Event Delegation)
// ============================
productList.addEventListener("click", (event) => {
  const btn = event.target;
  const row = btn.closest("tr");
  const index = row.rowIndex - 1; // Trừ 1 vì thead chiếm 1 dòng

  // XÓA SẢN PHẨM
  if (btn.classList.contains("deleteBtn")) {
    products.splice(index, 1);
    saveToStorage();
    renderProducts();
  }

  // SỬA SẢN PHẨM
  if (btn.classList.contains("updateBtn")) {
    const newName = prompt("Nhập tên sản phẩm mới:", products[index].name);
    const newPriceStr = prompt("Nhập giá mới:", products[index].price);
    const newPrice = Number(newPriceStr);

    // Kiểm tra hợp lệ
    if (!newName || isNaN(newPrice)) {
      alert("Vui lòng nhập tên hợp lệ và giá hợp lệ (số)!");
      return;
    }

    products[index].name = newName;
    products[index].price = newPrice; // Giá luôn là number

    saveToStorage();
    renderProducts();
  }
});


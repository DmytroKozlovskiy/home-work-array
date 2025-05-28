/* Створи масив «Список покупок». Кожен елемент масиву є об'єктом, який містить назву продукту, кількість і куплений він чи ні, ціну за одиницю товару, сума. Написати кілька функцій для роботи з таким масивом:
Виводити весь список на екран таким чином, щоб спочатку йшли продукти, що ще не придбані, а потім - ті, що вже придбали.
Покупка продукту. Функція приймає назву продукту і відзначає його як придбаний. */

let shoppingList = [
  { name: "Молоко", quantity: 2, bought: false, price: 20, total: 40 },
  { name: "Хліб", quantity: 1, bought: true, price: 25, total: 25 },
  { name: "Яблука", quantity: 5, bought: false, price: 10, total: 50 }
];

function showShoppingList(list) {
  const sortedList = [...list].sort((a, b) => a.bought - b.bought);
  sortedList.forEach(item => {
    console.log(`${item.name} — ${item.quantity} шт. — ${item.price} грн/шт — Разом: ${item.total} грн — ${item.bought ? "Куплено" : "Не куплено"}`);
  });
}
function buyProduct(name) {
  const item = shoppingList.find(product => product.name === name);
  if (item) item.bought = true;
}

function removeProduct(name) {
  shoppingList = shoppingList.filter(product => product.name !== name);
}

function addProduct(name, quantity, price) {
  let item = shoppingList.find(product => product.name === name);
  if (item) {
    item.quantity += quantity;
    item.total = item.quantity * item.price;
  } else {
    shoppingList.push({
      name,
      quantity,
      price,
      bought: false,
      total: quantity * price
    });
  }
}

function getTotalSum() {
  return shoppingList.reduce((sum, item) => sum + item.total, 0);
}

function getSumByBoughtStatus(boughtStatus) {
  return shoppingList
    .filter(item => item.bought === boughtStatus)
    .reduce((sum, item) => sum + item.total, 0);
}

function sortProductsByTotal(order = 'asc') {
  let sorted = [...shoppingList].sort((a, b) =>
    order === 'asc' ? a.total - b.total : b.total - a.total
  );
  sorted.forEach(item => {
    console.log(`${item.name}: ${item.total} грн`);
  });
}

showShoppingList(shoppingList);
buyProduct("Молоко");
addProduct("Хліб", 2, 25); 
removeProduct("Яблука");

console.log("Загальна сума: " + getTotalSum());
console.log("Сума куплених: " + getSumByBoughtStatus(true));
console.log("Сума не куплених: " + getSumByBoughtStatus(false));

console.log("Сортування за зростанням:");
sortProductsByTotal('asc');
console.log("Сортування за спаданням:");
sortProductsByTotal('desc');

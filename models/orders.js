export default class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return this.date.toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digits",
      minute: "2-digits",
    });
  }
}

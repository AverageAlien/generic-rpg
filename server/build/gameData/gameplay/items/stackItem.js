export class StackItem {
    constructor(name, texture, description, price, quantity, unitMass) {
        this.name = name;
        this.texture = texture;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.unitMass = unitMass;
    }
    get mass() {
        return this.unitMass * this.quantity;
    }
}
//# sourceMappingURL=stackItem.js.map
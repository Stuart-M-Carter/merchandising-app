
export class Feature {
    readonly label: string;
    readonly icon: string;
    readonly route: string;

    constructor(label: string, icon: string, route: string) {
        this.label = label;
        this.icon = icon;
        this.route = route;
    }
}

export const defaultFeatures: Feature[] = [
    new Feature("Home", "home", "/"),
    new Feature("Products", "inventory_2", "/products"),
    new Feature("Cart", "shopping_cart", "/cart"),
];


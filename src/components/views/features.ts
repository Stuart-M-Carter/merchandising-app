
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

export const features: Feature[] = [
    new Feature("Home", 'home' , "/"),
    new Feature("Assortments", 'category', "/assortments"),
    new Feature("Hierarchy", 'lan', "/hierarchy"),
];


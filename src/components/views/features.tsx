import type { JSX } from "react";
import HomeIcon from '@mui/icons-material/Home';
import LanIcon from '@mui/icons-material/Lan';
import CategoryIcon from '@mui/icons-material/Category';

export class Feature {
    readonly label: string;
    readonly icon: JSX.Element;
    readonly route: string;

    constructor(label: string, icon: JSX.Element, route: string) {
        this.label = label;
        this.icon = icon;
        this.route = route;
    }
}

export const features: Feature[] = [
    new Feature("Home", <HomeIcon />, "/"),
    new Feature("Assortments", <CategoryIcon />, "/assortments"),
    new Feature("Hierarchy", <LanIcon />, "/hierarchy"),
];


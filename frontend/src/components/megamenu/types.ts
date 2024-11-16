import {FC} from "react";

export interface NavLinkProps {
    id: string;
    label: string;
    link: string;
    children?: Array<NavLinkProps>;
    width?: number | "auto" | string;
    renderMenu?: FC
}
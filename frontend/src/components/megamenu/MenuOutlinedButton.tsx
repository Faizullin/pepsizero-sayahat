import React, {FC, ReactNode} from "react";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

type MenuOutlinedButtonProps = {
    children: ReactNode;
    href?: string;
    onClick?: Function;
    chevronRight?: boolean;
}
const MenuOutlinedButton: FC<MenuOutlinedButtonProps> = (
    {
        children, href, onClick, chevronRight,
    }
) => {
    return (
        <Link
            href={href || "#"}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick();
                }
            }}
            className="py-[5px] ps-[20px] pe-[20px] border-2 rounded-[32px] text-green_light bg-transparent border-green_light hover:text-green_light leading-[24px] font-aecom-sans font-normal flex w-fit">
            {children}
            {
                chevronRight && (
                    <ChevronRight
                        className={"ml-[3px] transition-transform duration-300"}/>
                )
            }
        </Link>
    )
}
export default MenuOutlinedButton
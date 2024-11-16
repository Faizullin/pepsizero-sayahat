import type {ComponentPropsWithoutRef, ElementType, PropsWithChildren,} from 'react';
import React, {HTMLAttributes} from "react";


const shapes = {round: "rounded-[18px]", square: "rounded-[0px]",} as const;
const variants: Record<string, HTMLAttributes<any>["className"]> = {
    outline: "bg-transparent border rounded",
    fill: "bg-green-900 text-white-a700 font-inter font-medium text-[15px] leading-[28px]",
} as const;
const sizes = {xs: "h-[36px] px-4 text-[16px]",} as const;
// type ButtonProps =
//     Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "onClick">
//     & Partial<{
//     className: string;
//     leftIcon: React.ReactNode;
//     rightIcon: React.ReactNode;
//     onClick: () => void;
//     shape: keyof typeof shapes;
//     variant: keyof typeof variants | null;
//     size: keyof typeof sizes;
//     color: string;
//     borderRadius?: number;
//     as: React.ElementType;
// }>;

type PolymorphicAsProp<E extends ElementType> = {
    as?: E;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
    ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>;

const defaultElement = 'button';

type ButtonProps<E extends ElementType = typeof defaultElement> =
    PolymorphicProps<E> & {
    className?: string;
    variant: keyof typeof variants | null;
};

// export function Button<E extends ElementType = typeof defaultElement>({


const Button = <E extends ElementType = typeof defaultElement, >(
    {
        children,
        as,
        className = "",
        leftIcon,
        rightIcon,
        shape,
        variant = "fill",
        size = "xs",
        color = "light_green_400",
        ...restProps
    }: ButtonProps<E>
) => {
    const Component = as ?? defaultElement;

    return (
        <Component
            className={`flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${className} ${variant && variants[variant]}`} {...restProps}>
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </Component>);
};

export {Button};
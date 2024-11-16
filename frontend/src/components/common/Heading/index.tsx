import React from "react";

const sizes = {
    headingxs: "text-[4px] font-semibold",
    headings: "text-[11px] font-semibold",
    headingmd: "text-[13px] font-bold",
    headinglg: "text-[14px] font-bold",
    headingxl: "text-[22px] font-bold",
};
export type HeadingProps =
    Partial<{ className: string; as: any; size: keyof typeof sizes; }>
    & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = (
    {
        children,
        className = "",
        size = "headingmd",
        as,
        ...restProps
    }
) => {
    const Component = as || "h6";
    return (
        <Component
            className={`${className} ${sizes[size]}`} {...restProps}>
            {children}
        </Component>
    );
};
export {Heading};
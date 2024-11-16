import React from "react";

const sizes = {
    textxs: "text-[15px] font-light",
    texts: "text-[16px] font-light",
    textmd: "text-[17px] font-light",
    textlg: "text-[18px] font-normal",
    textxl: "text-[20px] font-normal",
    text2xl: "text-[22px] font-light",
    text3xl: "text-[23px] font-light md:text-[21px]",
    text4xl: "text-[25px] font-hairline md:text-[23px] sm:text-[21px]",
    text5xl: "text-[26px] font-normal md:text-[24px] sm:text-[22px]",
    text6xl: "text-[27px] font-normal md:text-[25px] sm:text-[23px]",
    text7xl: "text-[28px] font-normal not-italic md:text-[26px] sm:text-[24px]",
    text8xl: "text-[29px] font-normal not-italic md:text-[27px] sm:text-[25px]",
    text9xl: "text-[44px] font-normal not-italic md:text-[40px] sm:text-[34px]",
    text10xl: "text-[49px] font-normal not-italic md:text-[45px] sm:text-[39px]",
};
export type TextProps =
    Partial<{ className: string; as: any; size: keyof typeof sizes; }>
    & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
const Text: React.FC<React.PropsWithChildren<TextProps>> = (
    {
        children,
        className = "",
        as,
        size = "textxs",
        ...restProps
    }
) => {
    const Component = as || "p";
    return (
        <Component
            className={`font-aecom-sans font-normal text-[1rem] ${className} ${sizes[size]}`} {...restProps}>
            {children}
        </Component>
    );
};
export {Text}
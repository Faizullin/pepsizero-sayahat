import {lazy, ReactElement, Suspense} from "react";
import {ComponentConfig} from "@packages/core/types";
import styles from "./styles.module.css";
import {getClassNameFactory} from "@packages/core/lib";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const getClassName = getClassNameFactory("Card", styles);

// Use React.lazy to dynamically import components
const icons = Object.keys(dynamicIconImports).reduce<
    Record<string, ReactElement>
>((acc, iconName) => {
    const El = lazy(() => (dynamicIconImports as any)[iconName]());

    return {
        ...acc,
        [iconName]: (
            <Suspense fallback={<div>Loading...</div>}>
                <El />
            </Suspense>
        ),
    };
}, {});

const iconOptions = Object.keys(dynamicIconImports).map((iconName) => ({
    label: iconName,
    value: iconName,
}));

export type CardProps = {
    title: string;
    description: string;
    icon?: string;
    mode: "flat" | "card";
};

export const Card: ComponentConfig<CardProps> = {
    fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        icon: {
            type: "select",
            options: iconOptions,
        },
        mode: {
            type: "radio",
            options: [
                { label: "card", value: "card" },
                { label: "flat", value: "flat" },
            ],
        },
    },
    defaultProps: {
        title: "Title",
        description: "Description",
        icon: "Feather",
        mode: "flat",
    },
    render: ({ title, icon, description, mode }) => {
        return (
            <div className={getClassName({ [mode]: mode })}>
                <div className={getClassName("icon")}>
                    {icon && icons[icon]}
                </div>
                <div className={getClassName("title")}>{title}</div>
                <div className={getClassName("description")}>{description}</div>
            </div>
        );
    },
};

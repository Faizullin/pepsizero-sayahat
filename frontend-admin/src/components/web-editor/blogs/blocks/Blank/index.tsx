import {ComponentConfig} from "@packages/core";
import styles from "./styles.module.css";
import {getClassNameFactory} from "@packages/core/lib";

const getClassName = getClassNameFactory("Hero", styles);

export type HeroProps = NonNullable<unknown>;

export const Hero: ComponentConfig<HeroProps> = {
    fields: {},
    defaultProps: {},
    render: () => {
        return <div className={getClassName()}></div>;
    },
};

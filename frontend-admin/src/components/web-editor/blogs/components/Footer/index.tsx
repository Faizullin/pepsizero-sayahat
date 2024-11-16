import {ReactNode} from "react";
import {Section} from "../Section";

const FooterLink = ({children, href}: { children: string; href: string }) => {
    const El = href ? "a" : "span";

    return (
        <li style={{paddingBottom: 8}}>
            <El
                href={href}
                style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    color: "var(--puck-color-grey-05)",
                }}
            >
                {children}
            </El>
        </li>
    );
};

const FooterList = ({
                        children,
                    }: {
    children: ReactNode;
    title: string;
}) => {
    return (
        <div>
            <ul
                style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    paddingTop: 12,
                }}
            >
                {children}
            </ul>
        </div>
    );
};

const Footer = ({children}: { children: ReactNode }) => {
    return (
        <footer className={"footer"}>
            <h2 style={{visibility: "hidden", height: 0, margin: 0}}>Footer</h2>
            <Section padding="32px">
                <div
                    style={{
                        display: "grid",
                        gridGap: 24,
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        paddingTop: 24,
                        paddingBottom: 24,
                    }}
                >
                    {children}
                </div>
            </Section>
        </footer>
    );
};

Footer.List = FooterList;
Footer.Link = FooterLink;

export {Footer};

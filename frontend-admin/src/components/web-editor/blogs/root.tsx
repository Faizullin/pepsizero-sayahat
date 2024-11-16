import {DefaultRootProps} from "@packages/core";
import {Footer} from "./components/Footer";
import {Header} from "./components/Header";

export type RootProps = DefaultRootProps;

function Root({children, puck}: RootProps) {
    // useEffect(() => {
    //   console.log("useEffect puck", puck)
    // }, [puck]);
    return (
        <>
            <Header editMode={puck.isEditing}/>
            {children}
            <Footer>
                <Footer.List title="Section">
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                </Footer.List>
                <Footer.List title="Section">
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                </Footer.List>
                <Footer.List title="Section">
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                </Footer.List>
                <Footer.List title="Section">
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                    <Footer.Link href="">Label</Footer.Link>
                </Footer.List>
            </Footer>
        </>
    );
}

export default Root;

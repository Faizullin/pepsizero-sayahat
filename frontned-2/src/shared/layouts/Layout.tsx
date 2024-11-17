import {FC} from "react";
import {Outlet} from "react-router-dom";
import Header from "@/shared/components/common/Header";
import Footer from "@/shared/components/common/Footer";

const Layout: FC = () => {
    return (
        <div className={"flex flex-col min-h-screen"}>
            <Header/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default Layout;
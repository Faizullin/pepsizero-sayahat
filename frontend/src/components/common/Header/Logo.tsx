import React, {FC} from "react";
import Link from "next/link";
import LogoImg from "@public/images/logo/img_header_logo.png"
import LogoImg2 from "@public/images/logo/logo.png"
import useWindowWidth from "@/hooks/useWindowWidth";

const Logo: FC = () => {
    const {breakpoint} = useWindowWidth()
    return (
        <Link href={"/"} className="h-full flex items-center">
            <img
                src={LogoImg2.src}
                alt="Header Logo"
                className="w-[38px] h-[38px] object-contain block sm:hidden"
            />
            <img
                src={LogoImg.src}
                alt="Header Logo"
                className="h-[40px] object-contain hidden sm:block"
            />
        </Link>
    )
}
export default Logo;
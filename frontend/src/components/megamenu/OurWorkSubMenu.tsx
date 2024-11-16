"use client"
import {FC, memo} from "react";
import {Heading, Text} from "@/components/common";
import Link from "next/link";
import {NavLinkProps} from "./types";
import MenuOutlinedButton from "@/components/megamenu/MenuOutlinedButton";

const OurWorkSubMenu: FC = memo(() => {
    const marketsLinks: NavLinkProps[] = [
        {
            id: "energy",
            label: "Energy",
            link: "#",
        },
        {
            id: "healthcare",
            label: "Healthcare",
            link: "#",
        },
        {
            id: "national-governments",
            label: "National Governments",
            link: "#",
        },
        {
            id: "transportation",
            label: "Transportation",
            link: "#",
        },
        {
            id: "water",
            label: "Water",
            link: "#",
        },
    ]
    const serviceLinks: NavLinkProps[] = [
        {
            id: "architecture-and-design",
            label: "Architecture & Design",
            link: "#",
        },
        {
            id: "healthcare",
            label: "Healthcare",
            link: "#",
        },
        {
            id: "engineering",
            label: "Engineering",
            link: "#",
        },
        {
            id: "transportation",
            label: "Transportation",
            link: "#",
        },
        {
            id: "water",
            label: "Water",
            link: "#",
        },
    ]
    return (
        <div className={"w-full h-full flex"}>
            <div className={"w-1/4 h-full"}>
                <div
                    className={"w-full h-full px-[40px] py-[20px] bg-center bg-no-repeat bg-cover relative"}
                    style={{
                        backgroundImage: "url(https://aecom.com/wp-content/uploads/2019/10/img-mm-promo-1.jpg)"
                    }}
                >
                    <Heading
                        className={"font-abril-titling font-normal my-[20px] text-[41px] leading-[2.5vw]"}
                    >
                        The world’s trusted infrastructure consulting firm
                    </Heading>
                    <Text className={"my-[10px] text-[22px]"}>We partner with our clients to deliver
                        a better world</Text>
                    <div className="absolute bottom-[40px]">
                        <Link
                            href="#"
                            className="font-lato font-semibold text-[14px] text-green_m px-[20px] py-[5px] bg-green_light rounded-[32px] border-r-[32px]">
                            Download factsheet
                        </Link>
                    </div>
                </div>
            </div>
            <div className={"flex-1 h-full"}>
                <div className={"size-full p-[20px]"}>
                    <div className="px-[40px] flex">


                        <div className="w-1/3">
                            <div className={"my-[24px]"}>
                                <h3 className="break-words text-[24px] leading-[25px] text-white font-abril-titling font-normal">
                                    Markets
                                </h3>
                            </div>
                            {
                                marketsLinks.map(item => (
                                    <div
                                        key={item.id}
                                        className={"my-[10px]"}>
                                        <Link
                                            href={item.link}
                                            className="text-green_light no-underline leading-[20px] font-aecom-sans">
                                            {item.label}
                                        </Link>
                                    </div>
                                ))
                            }
                            <div className="bottom-btn mt-[70px]">
                                <MenuOutlinedButton chevronRight={true}>
                                    View all markets
                                </MenuOutlinedButton>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className={"my-[24px]"}>
                                <h3 className="break-words text-[24px] leading-[25px] text-white font-abril-titling font-normal">
                                    Services
                                </h3>
                            </div>
                            {
                                serviceLinks.map(item => (
                                    <div
                                        key={item.id}
                                        className={"my-[10px]"}>
                                        <Link
                                            href={item.link}
                                            className="text-green_light no-underline leading-[20px] font-aecom-sans">
                                            {item.label}
                                        </Link>
                                    </div>
                                ))
                            }
                            <div className="bottom-btn mt-[70px]">
                                <MenuOutlinedButton chevronRight={true}>
                                    View all services
                                </MenuOutlinedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});
OurWorkSubMenu.displayName = "OurWorkSubMenu";
export default OurWorkSubMenu;
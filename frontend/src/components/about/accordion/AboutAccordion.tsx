import React, {FC, useMemo} from "react";
import {Accordion, AccordionBody, AccordionHeader,} from "@material-tailwind/react";
import {PlusIcon} from "lucide-react";

const AboutAccordion: FC = () => {
    const [open, setOpen] = React.useState<number>(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    const accordion_data: Array<{
        headerLabel: string;
        content: FC;
    }> = useMemo(() => {
        return [
            {
                headerLabel: "ВЫГОДНЫЕ РЕШЕНИЯ",
                content: () => <div></div>
            },
            {
                headerLabel: "ЛУЧШИЕ СПЕЦИАЛИСТЫ",
                content: () => <div></div>
            },
            {
                headerLabel: "ГИБКОСТЬ",
                content: () => <div></div>
            },
            {
                headerLabel: "СКОРОСТЬ",
                content: () => <div></div>
            },
        ];
    }, [])

    return (
        <>
            {
                accordion_data.map((item, index) => (

                    <Accordion key={index} open={open === index + 1} icon={<PlusIcon/>}
                               className={"h-[61px] flex items-center border-b-gray-300 border-b-[1px]"}
                               placeholder={undefined} onPointerEnterCapture={undefined}
                               onPointerLeaveCapture={undefined}
                    >
                        <AccordionHeader onClick={() => handleOpen(index + 1)}
                                         placeholder={undefined} onPointerEnterCapture={undefined}
                                         onPointerLeaveCapture={undefined}>
                            <div>
                                <span className={"font-oswald font-bold text-6 text-green-900 mr-10"}>
                                0{index + 1}
                            </span>
                                <span className={"font-futurapt font-bold text-5 text-blue_gray-900"}>
                                {item.headerLabel}
                            </span>
                            </div>
                        </AccordionHeader>
                        <AccordionBody>
                            <item.content/>
                        </AccordionBody>
                    </Accordion>
                ))
            }
        </>
    );
}
export default AboutAccordion;
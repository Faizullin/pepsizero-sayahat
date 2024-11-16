import {Button} from "@/components/common";
import Link from "next/link";
import {FC, memo, useMemo} from "react";


import useWindowWidth from "@/hooks/useWindowWidth";
import GalleryImg1 from "@public/images/home/gallery/gallery-1.png";
import GalleryImg2 from "@public/images/home/gallery/gallery-2.png";
import GalleryImg3 from "@public/images/home/gallery/gallery-3.png";
import GalleryImg4 from "@public/images/home/gallery/gallery-4.png";
import GalleryImg5 from "@public/images/home/gallery/gallery-5.png";
import {StaticImageData} from "next/image";

enum CornerPosition {
    topRight = "top-right",
    topLeft = "top-left",
    bottomRight = "bottom-right",
    bottomLeft = "bottom-left",
}

interface GalleryImageItem {
    image: StaticImageData;
    w?: number;
    h?: number;
    height?: number;
    id: number;
}


interface IGalleryPositioning {
    type: "column" | "row";
    children?: Array<IGalleryPositioning>;
    item_id? : number;
    item? : any;
    w?: number;
}

const GalleryItemWidget: FC<{
    item: GalleryImageItem;
    title: string;
    button: {
        label?: string;
        link: string;
    };
    className?: string;
}> = (
    {
        title, button, className, item,
    }
) => {
    const button_label = button.label || "Узнать больше";
    // const cornerPosition = CornerPosition.bottomLeft;
    return (
        <div
            className={`gallery-item gallery-item-w-${item.w ? item.w : "def"}`}
            style={{
                height: `${item.height}px`,
                backgroundImage: `url(${item.image.src})`,
            }}
        >
            <div className={"absolute right-0 bottom-0 left-0"}>
                <div className={"px-3 sm:pl-5 pb-[26px]"}>
                    <div className={"max-w-[500px] mb-[15px]"}>
                        <h3 className={"font-inter font-medium text-[22px] leading-[28px] text-white-a700"}>{title}</h3>
                    </div>
                    <Button variant={"fill"} className={"h-[37px] w-fit px-3 text-[17px]"} as={Link}
                            href={button.link}>
                        {button_label}
                    </Button>
                </div>
            </div>
        </div>
    )
}

const GalleryView = memo(() => {
    const {breakpoint} = useWindowWidth();
    const images_data: GalleryImageItem[] = useMemo(() => {
        const col1_height = breakpoint === 'xs' ? 294 : 500;
        const col2_height = breakpoint === 'xs' ? 294 : 300;
        return [
            {
                id: 1,
                image: GalleryImg1,
                w: 2,
                height: col1_height,
            },
            {
                id: 2,
                image: GalleryImg2,
                height: col1_height,
            },
            {

                id: 3,
                image: GalleryImg3,
                height: col1_height,
            },
            {

                id: 4,
                image: GalleryImg4,
                w: 2,
                height: col2_height,
            },
            {

                id: 5,
                image: GalleryImg5,
                w: 2,
                height: col2_height,
            }
        ]
    }, [breakpoint]);
    const positioning = useMemo(() => {
        const positioningData: IGalleryPositioning = {
            type: "column",
            children: [
                {
                    type: "row",
                    children: [
                        {
                            item_id: 1,
                            type: "column",
                            w: 6,
                        },
                        {
                            item_id: 2,
                            type: "column",
                            w: 3,
                        },
                        {
                            item_id: 3,
                            type: "column",
                            w: 3,
                        },
                    ]
                },
                {
                    type: "row",
                    children: [
                        {
                            item_id: 4,
                            type: "column",
                            w: 6,
                        },
                        {
                            item_id: 5,
                            type: "column",
                            w: 6,
                        },
                    ]
                }
            ],
        }
        return positioningData;
    }, [images_data, breakpoint])
    const images_data_matrix = useMemo(() => {
        const images_dict: Record<number, GalleryImageItem> = {}
        images_data.forEach((item) => {
            images_dict[item.id] = {
                ...item,
            }
        });
        const newPositioning = {...positioning}
        const stack = [newPositioning]; // Start with the root position

        while (stack.length > 0) {
            const current = stack.pop()!; // Get the current position

            if (current.children) {
                stack.push(...current.children);
            }
            if (current.item_id) {
                const item = images_dict[current.item_id];
                if (item) {
                    (current as any).item = item; // Attach the image data
                }
            }
        }
        return newPositioning;
    }, [images_data, positioning])


    const renderPositioning = (position: IGalleryPositioning) => {
        if (position.children) {
            return (
                <div className={`flex ${position.type === "column" ? "flex-col" : "flex-row"}`}>
                    {position.children.map((child, index) => (
                        <div key={index} className={`flex ${child.type === "column" ? "flex-col" : "flex-row"} gallery-item-w-${position.w} h-${position.item.height}`}>
                            {renderPositioning(child)}
                        </div>
                    ))}
                </div>
            );
        } else if (position.item) {
            return (
                <div style={{ backgroundImage: `url(${position.item.image})`, backgroundSize: 'cover' }}>
                    {/* You can render additional content related to the image here, if needed */}
                    {position.item_id}
                </div>
            );
        }
        return null;
    };
    return (
        <div
            className="gallery-view">
            {renderPositioning(images_data_matrix)}
            {/*{*/}
            {/*    images_data_matrix.map((row, index) => (*/}
            {/*        <div key={index} className={"flex"}>*/}
            {/*            {*/}
            {/*                row.map((item, j) => (*/}
            {/*                    <GalleryItemWidget*/}
            {/*                        key={j}*/}
            {/*                        item={item}*/}
            {/*                        title={""}*/}
            {/*                        button={{*/}
            {/*                            link: "#",*/}
            {/*                            label: ""*/}
            {/*                        }}/>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}
            {/*{images_data.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <GalleryItemWidget*/}
            {/*            key={index}*/}
            {/*            item={item}*/}
            {/*            title={""}*/}
            {/*            button={{*/}
            {/*                link: "#",*/}
            {/*                label: ""*/}
            {/*            }}/>*/}
            {/*    )*/}
            {/*})}*/}

        </div>
    );
})

GalleryView.displayName = 'GalleryView';
export default GalleryView;
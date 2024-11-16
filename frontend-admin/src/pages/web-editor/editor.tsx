import {ActionBar, Button, ComponentData, Puck} from "@packages/core";

// import "@measured/puck/puck.css";
import {FC, useCallback, useEffect, useState} from "react";
import conf, {UserData} from "../../components/web-editor/blogs";
import headingAnalyzer from "@measured/puck-plugin-heading-analyzer";
import {useGetOne, useUpdate} from "react-admin";
import {useParams} from "react-router";
import {DefaultOverride} from "@packages/core/components/DefaultOverride";
import {Edit} from "lucide-react";
import {useAppContext} from "@packages/core/components/Puck/context.tsx";
import QuillEditorDrawer from "@/pages/web-editor/QuillEditorDrawer.tsx";
import {ActionType} from "@/components/web-editor/blogs/blocks/TextContent";
import {replaceAction, ReplaceAction, SetAction} from "@packages/core/reducer";
import {rootDroppableId} from "@packages/core/lib/root-droppable-id.ts";
// import RichEditor from "@/components/web-editor/editor/slate-editor/RichEditor.tsx";


const Editor: FC = () => {
    const {id} = useParams()
    const [ready, setReady] = useState(false)
    const [record, setRecord] = useState(null)
    const response = useGetOne(`pages/pagedocument`,
        {
            id,
        })
    useEffect(() => {
        if (!response.isLoading && response.isSuccess && response.data) {
            setRecord({
                ...response.data,
                content_json: JSON.parse(response.data.content_json)
            });
            setReady(true);
        }
        console.log("response", response)
    }, [response.isSuccess, response.isLoading]);
    if (response.isLoading || !ready || !record) {
        return "Loading..."
    }
    if (response.isError) {
        return "Error"
    }


    return <EditorForm record={record}/>
}

const EditorForm: FC<
    {
        record: {
            id: string;
            content_json: Record<string, string>;
            [key: string]: unknown;
        }
    }
> = ({
         record,
     }) => {
    const [saveAction, {isPending}] = useUpdate(`pages/pagedocument`,
        {
            id: record.id,
        })

    const handlePublish = useCallback(async (data: UserData) => {
        const data_title = data.root.props?.title || "";
        await saveAction(`pages/pagedocument`,
            {
                id: record.id,
                data: {
                    title: data_title,
                    content_json: JSON.stringify(data)
                }
            });
    }, [record.id, saveAction]);
    useEffect(() => {
        // if (record?.styles) {
        //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        //     const getIframe = () => document.getElementById("preview-frame")! as HTMLIFrameElement;
        //     const timeout = setTimeout(() => {
        //         const iframeEl = getIframe();
        //         const iframeDocument = iframeEl.contentDocument || (iframeEl as any).contentWindow.document;
        //         console.log(iframeDocument)
        //         let stylesStr = '';
        //         (record.styles as Array<{ content: string; title: string; }>).forEach((item) => {
        //             stylesStr += item.content;
        //         })
        //         const styleTag = iframeDocument.createElement('style');
        //         styleTag.innerHTML = stylesStr;
        //         iframeDocument.head.appendChild(styleTag);
        //     }, 5000);
        //
        //     // Clean up by removing the style tag if the component unmounts
        //     return () => {
        //         clearTimeout(timeout)
        //         // const iframeEl = getIframe();
        //         // const iframeDocument = iframeEl.contentDocument || (iframeEl as any).contentWindow.document;
        //         // iframeDocument.head.removeChild(styleTag);
        //     };
        // }
    }, [record]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ComponentData<any, string> | null>(null);
    const handleTextContentEdit = useCallback((newSelectedItem: ComponentData<any, string>) => {
        console.log("edit", newSelectedItem);
        setSelectedItem(newSelectedItem);
        setIsEditModalOpen(true);
    }, [selectedItem])
    return (
        <div style={{
            width: "100%",
            position: "relative"
        }}>
            <Puck
                config={conf}
                data={record.content_json}
                onPublish={handlePublish}
                plugins={[headingAnalyzer]}
                // headerPath={path}
                overrides={{
                    headerActions: ({children}) => (
                        <>
                            <div>
                                <Button variant="secondary" newTab href={`/builder/${record.id}/preview`}
                                        disabled={isPending}>
                                    View page
                                </Button>
                            </div>
                            {children}
                        </>
                    ),
                    actionBar: ({
                                    label,
                                    children,
                                }) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const cxt = useAppContext();
                        let additional = null;
                        if (label === "TextContent") {
                            additional = (
                                <>
                                    <ActionBar.Action onClick={() => handleTextContentEdit(cxt.selectedItem!)}
                                                      label="Edit">
                                        <Edit size={16}/>
                                    </ActionBar.Action>
                                    <QuillEditorDrawer
                                        open={isEditModalOpen}
                                        setOpen={setIsEditModalOpen}
                                        onClose={() => {
                                            setSelectedItem(null);
                                            setIsEditModalOpen(false);
                                            const {selectedItem,} = cxt;
                                            const {ui, data} = cxt.state;
                                            const newProps = {
                                                ...selectedItem?.props,
                                                action_type: ActionType.updatePreviewEdit,
                                            }
                                            const {itemSelector} = ui;
                                            const replaceActionData: ReplaceAction = {
                                                type: "replace",
                                                destinationIndex: (itemSelector as any).index!,
                                                destinationZone: itemSelector?.zone || rootDroppableId,
                                                data: {...selectedItem, props: newProps},
                                            };
                                            const replacedData = replaceAction(data, replaceActionData);
                                            const setActionData: SetAction = {
                                                type: "set",
                                                state: {
                                                    data: {...data, ...replacedData},
                                                    ui: {...ui},
                                                },
                                            };
                                            cxt.dispatch({
                                                ...setActionData,
                                                recordHistory: true,
                                            });
                                        }}
                                    />
                                </>
                            )
                        }
                        return (
                            <ActionBar label={label}>
                                {additional}
                                <DefaultOverride>{children}</DefaultOverride>
                            </ActionBar>
                        );
                    },
                }}
            >
            </Puck>
        </div>
    );

}
export default Editor;
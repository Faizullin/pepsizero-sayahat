import {useAppContext} from "@packages/core/components/Puck/context.tsx";
import {useDebouncedCallback} from "use-debounce";
import {replaceAction, ReplaceAction, SetAction} from "@packages/core/reducer";
import {rootDroppableId} from "@packages/core/lib/root-droppable-id.ts";
import {FC, memo, PropsWithChildren, useEffect, useState} from "react";
import {Section} from "@/components/web-editor/blogs/components/Section";
import {Box, Container, Drawer} from "@mui/material";
import Editor from "@/components/web-editor/editor/quill-editor/editor.tsx";
import {ActionType} from "@/components/web-editor/blogs/blocks/TextContent";
import {ComponentData} from "@packages/core";

interface DrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose: () => void;
}

const Wrapper: FC<PropsWithChildren<DrawerProps>> = ({children, open, onClose}) => {
    return (
        <Drawer
            anchor={"bottom"}
            open={open}
            onClose={onClose}
            sx={{
                minHeight: "600px",
            }}
        >
            <Container
                maxWidth={"lg"}>
                {children}
            </Container>
        </Drawer>
    );
}
type ValueType = any;
export type SelectedItemType = ComponentData<any, string>;

interface QuillEditorDrawerInnerProps extends DrawerProps {
    selectedItem: SelectedItemType;
}

type QuillEditorDrawerProps = DrawerProps

const QuillEditorDrawer: FC<QuillEditorDrawerProps> = memo((props) => {
        const cxt = useAppContext();
        if (!cxt.selectedItem) {
            return "Error: Undefined selected item.";
        }
        return <QuillEditorDrawerInner {...props} selectedItem={cxt.selectedItem}/>
    }
)
QuillEditorDrawer.displayName = "QuillEditorDrawer";
const QuillEditorDrawerInner: FC<QuillEditorDrawerInnerProps> = (props) => {
    const {
        open, setOpen, onClose, selectedItem
    } = props;
    const cxt = useAppContext();
    const {id, action_type, text,} = selectedItem.props;
    const editor_id = `editor-${id}-drawer`
    const record = useDebouncedCallback((state) => {
        console.log("record: state", state, {...cxt})
        const {selectedItem,} = cxt;
        const {ui, data} = cxt.state;
        const {itemSelector} = ui;
        const newProps = {
            ...selectedItem?.props,
            text: JSON.stringify({
                state,
            }),
            action_type: ActionType.inputEdit,
        }
        if (!itemSelector) {
            console.error("itemSelector is null")
            return;
        }
        const replaceActionData: ReplaceAction = {
            type: "replace",
            destinationIndex: (itemSelector as any).index!,
            destinationZone: itemSelector?.zone || rootDroppableId,
            data: {...selectedItem, props: newProps},
        };

        // We use `replace` action, then feed into `set` action so we can also process any UI changes
        const replacedData = replaceAction(data, replaceActionData);

        const setActionData: SetAction = {
            type: "set",
            state: {
                data: {...data, ...replacedData},
                ui: {...ui},
            },
        };

        // // If the component has a resolveData method, we let resolveData run and handle the dispatch once it's done
        // if (config.components[selectedItem!.type]?.resolveData) {
        //     resolveData(setAction(state, setActionData));
        // } else {
        //     dispatch({
        //         ...setActionData,
        //         recordHistory: true,
        //     });
        // }
        cxt.dispatch({
            ...setActionData,
            recordHistory: true,
        });
        // const newProps = {
        //     ...cxt.selectedItem?.props,
        //     text: JSON.stringify(state),
        // }
        // const replaceActionData: ReplaceAction = {
        //     type: "replace",
        //     destinationIndex: itemSelector.index,
        //     destinationZone: itemSelector.zone || rootDroppableId,
        //     data: {...cxt.selectedItem, props: newProps},
        // };
        // const updatedData = transformProps(data, {
        //     // Rename `title` to `heading`
        //     HeadingBlock: ({title, ...props}) => ({heading: title, ...props}),
        // });
        // cxt.dispatch(replaceActionData)
    }, 250);
    const [state, setState] = useState<ValueType>({value: null});
    const handleChange = (value: string) => {
        record({
            value,
        });
    };

    useEffect(() => {
        const startLoad = () => {
            console.log("load", action_type, text);

            if (!action_type || action_type !== ActionType.inputEdit) {
                const jsonData = JSON.parse(text);
                setState(jsonData.state);
            }
        }
        const timer = setTimeout(startLoad, 500)
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [text, action_type]);
    if (cxt.selectedItem && cxt.selectedItem.props.id === id) {
        return (
            <Wrapper open={open} setOpen={setOpen} onClose={onClose}>
                <Section padding={"0"}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}>
                        <Editor
                            value={state.value}
                            id={editor_id}
                            onChange={handleChange}
                            simple={false}
                            error={null}
                            sx={null}
                            readOnly={false}
                            theme={"snow"}
                        />
                    </Box>
                </Section>
            </Wrapper>
        );
    }
}
export default QuillEditorDrawer;
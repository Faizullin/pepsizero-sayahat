import {
    Dispatch,
    FC,
    forwardRef,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import isHotkey from "is-hotkey";
import {Editable, RenderElementProps, RenderLeafProps, Slate, useSlate, withReact} from "slate-react";
import {BaseEditor, createEditor, Descendant, Editor, Transforms} from "slate";
import {withHistory} from "slate-history";
import {Box, Divider, ToggleButton} from "@mui/material";

import "./RichEditor.scss";
import {
    BoldIcon,
    CodeIcon,
    Heading1Icon,
    Heading2Icon,
    ItalicIcon,
    ListIcon,
    ListOrdered,
    QuoteIcon,
    UnderlineIcon
} from "lucide-react";

const HOTKEYS: Record<string, string> = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
};

interface RichEditorProps {
    value: Descendant[];
    setValue: Dispatch<SetStateAction<Descendant[]>>
}

const RichEditor: FC<RichEditorProps> = ({setValue}) => {
    const renderElement = useCallback((props: any) => <Element {...props} />, []);
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const initialValue = [
        {
            type: "paragraph",
            children: [{text: "Hello World"}]
        }
    ];
    const [currentValue, setCurrentValue] = useState<Descendant[]>([]);
    useEffect(() => {
        setValue(currentValue)
    }, [currentValue, setValue]);

    return (
        <Box
            p={0}
            m={0}
            border={0}
            borderRadius={4}
            className={"slate-editor"}>
            {/*<Box p={1} m={2} border={1} borderColor="grey.500" borderRadius={4}>*/}

            <Slate
                editor={editor}
                onChange={value => {
                    setCurrentValue(value);
                }}
                initialValue={initialValue}>
                <Toolbar>
                    <MarkButton format="bold">
                        <BoldIcon/>
                    </MarkButton>
                    <MarkButton format="italic">
                        <ItalicIcon/>
                    </MarkButton>
                    <MarkButton format="underline">
                        <UnderlineIcon/>
                    </MarkButton>
                    <MarkButton format="code">
                        <CodeIcon/>
                    </MarkButton>
                    <BlockButton format="heading-one">
                        <Heading1Icon/>
                    </BlockButton>
                    <BlockButton format="heading-two">
                        <Heading2Icon/>
                    </BlockButton>
                    <BlockButton format="block-quote">
                        <QuoteIcon/>
                    </BlockButton>
                    <BlockButton format="numbered-list">
                        <ListOrdered/>
                    </BlockButton>
                    <BlockButton format="bulleted-list">
                        <ListIcon/>
                    </BlockButton>
                </Toolbar>
                <Box pl={0}>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey] as any;
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </Box>
            </Slate>
        </Box>
    );
};

export const Element: FC<RenderElementProps> = ({attributes, children, element}) => {
    switch ((element as any).type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

export const Leaf: FC<RenderLeafProps> = ({attributes, children, leaf}) => {
    if ((leaf as any).bold) {
        children = <strong>{children}</strong>;
    }

    if ((leaf as any).code) {
        children = <code>{children}</code>;
    }

    if ((leaf as any).italic) {
        children = <em>{children}</em>;
    }

    if ((leaf as any).underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

interface MenuButtonProps extends PropsWithChildren {
    format: string;
}

const BlockButton: FC<MenuButtonProps> = ({format, children}) => {
    const editor = useSlate();
    return (
        <Box ml={1} mt={1}>
            <ToggleButton
                value={format}
                selected={isBlockActive(editor, format)}
                onMouseDown={event => {
                    event.preventDefault();
                    toggleBlock(editor, format);
                }}
                style={{lineHeight: 1}}
            >
                {children}
            </ToggleButton>
        </Box>
    );
};

const MarkButton: FC<MenuButtonProps> = ({format, children}) => {
    const editor = useSlate();
    return (
        <Box ml={1} mt={1}>
            <ToggleButton
                value={format}
                selected={isMarkActive(editor, format)}
                onMouseDown={event => {
                    event.preventDefault();
                    toggleMark(editor, format);
                }}
                style={{lineHeight: 1}}
            >
                {children}
            </ToggleButton>
        </Box>
    );
};
type TFormat = any;
const Menu = forwardRef((props: any, _: any) => {
    const {children} = props;
    return (
        <Box className={"toolbar-menu"}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {children}
            </Box>
            <Box pt={2}>
                <Divider variant="middle"/>
            </Box>
        </Box>
    );
});
Menu.displayName = "Menu";

// eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
const Toolbar = forwardRef(({className, ...props}: any, ref) => (
    <Menu {...props} ref={ref}/>
));

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor: BaseEditor, format: TFormat) => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as any).type === format
    });
    return !!match;
};

const isMarkActive = (editor: BaseEditor, format: TFormat) => {
    const marks = Editor.marks(editor);
    return marks ? ((marks as any)[format] as any) === true : false;
};

const toggleBlock = (editor: BaseEditor, format: TFormat) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes((n as any).type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format
    } as any);

    if (!isActive && isList) {
        const block = {type: format, children: []};
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor: BaseEditor, format: TFormat) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export default RichEditor;

import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {SlateContent, SlateEditor, SlateToolbar} from 'slate-editor'
import {BoldButton} from '@slate-editor/bold-plugin'
import {FontFamilyPlugin} from '@slate-editor/font-family-plugin'

const plugins = [
    FontFamilyPlugin()
]
export default function RichEditor2({onChange}: any) {
    // const renderElement = useCallback((props: any) => <Element {...props} />, []);
    // const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
    // const editor = useMemo(
    //     () => withLinks(withHistory(withReact(createEditor()))),
    //     []
    // );
    // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [currentValue, setCurrentValue] = useState<Descendant[]>([]);
    useEffect(() => {
        if (onChange) {
            onChange(currentValue)
        }
    }, [currentValue, onChange]);

    return (
        <Box
            p={0}
            m={0}
            border={0}
            borderRadius={4}
            className={"slate-editor2"}>
            <SlateEditor plugins={plugins}>
                <SlateToolbar>
                    <BoldButton/>
                </SlateToolbar>
                <SlateContent/>
            </SlateEditor>
            {/*<Slate*/}
            {/*    editor={editor}*/}
            {/*    onChange={value => {*/}
            {/*        setCurrentValue(value);*/}
            {/*    }}initialValue={initialValueForSlate}>*/}
            {/*    <Toolbar>*/}
            {/*        <MarkButton format="bold" icon="format_bold"/>*/}
            {/*        <MarkButton format="italic" icon="format_italic"/>*/}
            {/*        <MarkButton format="underline" icon="format_underlined"/>*/}
            {/*        <MarkButton format="code" icon="code"/>*/}
            {/*        <BlockButton format="heading-one" icon="looks_one"/>*/}
            {/*        <BlockButton format="heading-two" icon="looks_two"/>*/}
            {/*        <BlockButton format="block-quote" icon="format_quote"/>*/}
            {/*        <BlockButton format="numbered-list" icon="format_list_numbered"/>*/}
            {/*        <BlockButton format="bulleted-list" icon="format_list_bulleted"/>*/}
            {/*        <BlockButton format="link" icon="href"/>*/}
            {/*        <FontFamilyDropdown/>*/}
            {/*    </Toolbar>*/}
            {/*    <Editable*/}
            {/*        renderElement={renderElement}*/}
            {/*        renderLeaf={renderLeaf}*/}
            {/*        placeholder="Enter some rich text…"*/}
            {/*        spellCheck*/}
            {/*        autoFocus*/}
            {/*        onKeyDown={(event) => {*/}
            {/*            for (const hotkey in HOTKEYS) {*/}
            {/*                if (isHotkey(hotkey, event as any)) {*/}
            {/*                    event.preventDefault();*/}
            {/*                    const mark = HOTKEYS[hotkey];*/}
            {/*                    toggleMark(editor, mark);*/}
            {/*                }*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Slate>*/}
        </Box>
    );
}
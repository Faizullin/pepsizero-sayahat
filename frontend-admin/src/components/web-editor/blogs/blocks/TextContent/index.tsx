import {ComponentConfig} from "@packages/core";
import {Section} from "../../components/Section";
import {FC, useEffect, useState} from "react";
import {Box} from "@mui/material";
import Preview from "@/components/web-editor/editor/quill-editor/Preview.tsx";

export enum ActionType {
    inputEdit = "inputEdit",
    updatePreviewEdit = "updatePreviewEdit",
}

export type TextContentProps = {
    align: "left" | "center" | "right";
    text?: string;
    padding?: string;
    size?: "s" | "m";
    color: "default" | "muted";
    maxWidth?: string;
    id?: any;
    action_type?: ActionType;
};

type ValueType = Record<string, any>;


const TextContentRenderer: FC<TextContentProps> = (props) => {
    const {
        // align, color, text, size,
        padding, maxWidth, id, text, action_type,
    } = props as any;
    const editor_id = `editor-${id}`
    const [state, setState] = useState<ValueType>({value: null});

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

    return (
        <Section padding={padding} maxWidth={maxWidth}>
            <Box
                sx={{
                    width: "100%",
                }}>
                <Preview
                    value={state.value}
                    onChange={() => null}
                    id={editor_id}
                    simple={false}
                    error={null}
                    sx={null}
                />
            </Box>
        </Section>
    );
}

export const TextContent: ComponentConfig<TextContentProps> = {
    fields: {
        text: {type: "textarea"},
        size: {
            type: "select",
            options: [
                {label: "S", value: "s"},
                {label: "M", value: "m"},
            ],
        },
        align: {
            type: "radio",
            options: [
                {label: "Left", value: "left"},
                {label: "Center", value: "center"},
                {label: "Right", value: "right"},
            ],
        },
        color: {
            type: "radio",
            options: [
                {label: "Default", value: "default"},
                {label: "Muted", value: "muted"},
            ],
        },
        padding: {type: "text"},
        maxWidth: {type: "text"},
    },
    defaultProps: {
        align: "left",
        text: "TextContent",
        padding: "24px",
        size: "m",
        color: "default",
    },
    render: TextContentRenderer as any,
};

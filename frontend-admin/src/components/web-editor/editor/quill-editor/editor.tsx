import ReactQuill from "react-quill";
import {FC, useEffect, useRef} from "react";
import {styled} from "@mui/material/styles";
import "react-quill/dist/quill.snow.css";
import {formats, modules,} from "./EditorToolbar.tsx";
import Quill from "quill";

const RootStyle = styled("div")(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.grey}`,
    "& .ql-container.ql-snow": {
        borderColor: "transparent",
        ...theme.typography.body1,
        fontFamily: theme.typography.fontFamily,
    },
    "& .ql-editor": {
        minHeight: 200,
        "&.ql-blank::before": {
            fontStyle: "normal",
            color: theme.palette.text.disabled,
        },
        "& pre.ql-syntax": {
            ...theme.typography.body2,
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.grey[900],
        },
    },
}));
// QuillEditor.propTypes = {
//     id: PropTypes.string,
//     value: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     error: PropTypes.bool,
//     simple: PropTypes.bool,
//     sx: PropTypes.object,
// };

interface EditorProps {
    id: string;
    error: any;
    value: any;
    onChange: any;
    simple?: boolean;
    sx: any;
    readOnly?: boolean;
    theme?: string;

    [key: string]: any;
}

const Editor: FC<EditorProps> = ({
                                     id,
                                     error,
                                     value,
                                     onChange,
                                     sx,
                                     readOnly,
                                     theme,
                                 }) => {
    const editorRef = useRef<any>();

    useEffect(() => {
        const editorObj = editorRef.current.editor as Quill;
        const converted = editorObj.clipboard.convert(value)
        editorObj.setContents(converted);
    }, [value]);
    return (
        <RootStyle
            sx={{
                ...(error && {
                    border: (theme) => `solid 1px ${theme.palette.error.main}`,
                }),
                ...sx,
            }}
        >
            {/*<EditorToolbar/>*/}
            <ReactQuill
                ref={editorRef}
                id={id}
                onChange={onChange}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
                readOnly={readOnly}
                theme={theme || "snow"}
            />
        </RootStyle>
    );
}
export default Editor;
import {Quill} from "react-quill";
import {Redo, Undo} from "lucide-react";
import 'react-quill/dist/quill.snow.css';
import {FC} from "react";

const FONT_FAMILY = ["Arial", "Tahoma", "Georgia", "Impact", "Verdana"];
const FONT_SIZE = [
    "8px",
    "9px",
    "10px",
    "12px",
    "14px",
    "16px",
    "20px",
    "24px",
    "32px",
    "42px",
    "54px",
    "68px",
    "84px",
    "98px",
];
const HEADINGS = [
    "Heading 1",
    "Heading 2",
    "Heading 3",
    "Heading 4",
    "Heading 5",
    "Heading 6",
];

export function undoChange() {
    this.quill.history.undo();
}

export function redoChange() {
    this.quill.history.redo();
}

const Size = Quill.import("attributors/style/size") as any;
Size.whitelist = FONT_SIZE;
Quill.register(Size, true);
const Font = Quill.import("attributors/style/font") as any;
Font.whitelist = FONT_FAMILY;
Quill.register(Font, true);
export const formats = [
    "align",
    "background",
    "blockquote",
    "bold",
    "bullet",
    "code",
    "code-block",
    "color",
    "direction",
    "font",
    "formula",
    "header",
    "image",
    "indent",
    "italic",
    "link",
    "list",
    "script",
    "size",
    "strike",
    "table",
    "underline",
    "video",
];

interface QuillEditorToolbarStyleProps {
    id: string;
    isSimple: boolean;

    [key: string]: any;
}

const QuillEditorToolbar: FC<QuillEditorToolbarStyleProps> = ({id, isSimple, ...other}) => {
    return (
        <QuillEditorToolbar {...other}>
            <div id={id}>
                <div className="ql-formats">
                    {!isSimple && (
                        <select className="ql-font" defaultValue="">
                            <option value="">Font</option>
                            {FONT_FAMILY.map((font) => (
                                <option key={font} value={font}>
                                    {font}
                                </option>
                            ))}
                        </select>
                    )}
                    {!isSimple && (
                        <select className="ql-size" defaultValue="16px">
                            {FONT_SIZE.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    )}
                    <select className="ql-header" defaultValue="">
                        {HEADINGS.map((heading, index) => (
                            <option key={heading} value={index + 1}>
                                {heading}
                            </option>
                        ))}
                        <option value="">Normal</option>
                    </select>
                </div>
                <div className="ql-formats">
                    <button type="button" className="ql-bold"/>
                    <button type="button" className="ql-italic"/>
                    <button type="button" className="ql-underline"/>
                    <button type="button" className="ql-strike"/>
                </div>
                {!isSimple && (
                    <div className="ql-formats">
                        <select className="ql-color"/>
                        <select className="ql-background"/>
                    </div>
                )}
                <div className="ql-formats">
                    <button type="button" className="ql-list" value="ordered"/>
                    <button type="button" className="ql-list" value="bullet"/>
                    {!isSimple && (
                        <button type="button" className="ql-indent" value="-1"/>
                    )}
                    {!isSimple && (
                        <button type="button" className="ql-indent" value="+1"/>
                    )}
                </div>
                {!isSimple && (
                    <div className="ql-formats">
                        <button type="button" className="ql-script" value="super"/>
                        <button type="button" className="ql-script" value="sub"/>
                    </div>
                )}
                {!isSimple && (
                    <div className="ql-formats">
                        <button type="button" className="ql-code-block"/>
                        <button type="button" className="ql-blockquote"/>
                    </div>
                )}
                <div className="ql-formats">
                    <button type="button" className="ql-direction" value="rtl"/>
                    <select className="ql-align"/>
                </div>
                <div className="ql-formats">
                    <button type="button" className="ql-link"/>
                    <button type="button" className="ql-image"/>
                    <button type="button" className="ql-video"/>
                </div>
                <div className="ql-formats">
                    {!isSimple && <button type="button" className="ql-formula"/>}
                    <button type="button" className="ql-clean"/>
                </div>
                {!isSimple && (
                    <div className="ql-formats">
                        <button type="button" className="ql-undo">
                            <Undo/>
                        </button>
                        <button type="button" className="ql-redo">
                            <Redo/>
                        </button>
                    </div>
                )}
            </div>
        </QuillEditorToolbar>
    );
}
export default QuillEditorToolbar;
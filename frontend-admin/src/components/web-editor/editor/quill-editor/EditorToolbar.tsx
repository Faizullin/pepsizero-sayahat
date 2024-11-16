import {Quill} from "react-quill";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {StringMap} from "quill";
import {Redo, Undo} from "lucide-react";
// import hljs from "highlight.js";
// import "highlight.js/styles/monokai-sublime.css";

function undoChange(q) {
    console.log(q, this)
    this.quill.history.undo();
}

function redoChange() {
    this.quill.history.redo();
}

const Size = Quill.import("formats/size");
(Size as any).whitelist = ["extra-small", "small", "medium", "large"];
Quill.register((Size as any), true);

const Font = Quill.import("formats/font");
(Font as any).whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font as any, true);

export const modules: StringMap = {
        // syntax: {
        //   highlight: (text) => hljs.highlightAuto(text).value
        // },
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'
            ],
            ['link', 'image', 'video', 'formula'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],

            ['clean']                                         // remove formatting button
        ],

        history: {
            delay: 500,
            maxStack:
                100,
            userOnly:
                true
        }
        ,

// syntax: true,
// clipboard: {
//   matchVisual: false,
// },
    }
;

export const formats = [
    "header",
    //"font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    // "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

export const QuillToolbar = () => (
    <div id="toolbar-1">

        <span className="ql-formats">
            <select className="ql-font" defaultValue="arial">
            <option value="arial">Arial</option>
            <option value="comic-sans">Comic Sans</option>
            <option value="courier-new">Courier New</option>
            <option value="georgia">Georgia</option>
            <option value="helvetica">Helvetica</option>
            <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size" defaultValue="medium">
            <option value="extra-small">Size 1</option>
            <option value="small">Size 2</option>
            <option value="medium">Size 3</option>
            <option value="large">Size 4</option>
            </select>
        <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
        </select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
            {/* <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" /> */}
            <button className="ql-blockquote"/>
            <button className="ql-direction"></button>
        </span>
        <span className="ql-formats">
            <select className="ql-align">

            </select>
            <select className="ql-color">

            </select>
            {/* <select className="ql-background" /> */}
        </span>
        <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-video"></button>
        </span>
        <span className="ql-formats">
            {/* <button className="ql-formula" /> */}
            <button className="ql-code-block"/>
            {/* <button className="ql-clean" /> */}
        </span>
        <span className="ql-formats">
            <button className="ql-undo">
                <Undo/>
            </button>
            <button className="ql-redo">
            <Redo/>
            </button>
        </span>
    </div>
);

export default QuillToolbar;

import {Render} from "@packages/core";
import conf from "../../components/web-editor/blogs";
import {useDemoData} from "./hook.ts";
import {useEffect} from "react";

const EditorPreview = () => {
    const path = "test";
    const {data} = useDemoData({
        isEdit: true,
        path,
    })
    useEffect(() => {
        const prevDisplay = document.getElementsByTagName("header")![0].style.display;
        document.getElementsByTagName("header")![0].style.display = "none";
        return () => {
            document.getElementsByTagName("header")![0].style.display = prevDisplay;
        }
    }, []);
    if (data) {
        return (
            <div style={{
                width: "100%",
                position: "relative"
            }}>
                <Render config={conf} data={data}/>
            </div>
        )
    }
    return (
        <div
            style={{
                width: "100%",
                position: "relative",
                display: "flex",
                height: "100vh",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>
                <h1>404</h1>
                <p>Page does not exist in session storage</p>
            </div>
        </div>
    );
}
export default EditorPreview;
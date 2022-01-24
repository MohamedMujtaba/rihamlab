import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Hello from CKEditor 5!</p>"
      // config={{
      //   toolbar: {
      //     items: [
      //       "heading",
      //       "|",
      //       "alignment",
      //       "|",
      //       "bold",
      //       "italic",
      //       "strikethrough",
      //       "underline",
      //       "subscript",
      //       "superscript",
      //       "|",
      //       "link",
      //       "|",
      //       "bulletedList",
      //       "numberedList",
      //       "todoList",
      //       "-", // break point
      //       "fontfamily",
      //       "fontsize",
      //       "fontColor",
      //       "fontBackgroundColor",
      //       "|",
      //       "code",
      //       "codeBlock",
      //       "|",
      //       "insertTable",
      //       "|",
      //       "outdent",
      //       "indent",
      //       "|",
      //       "uploadImage",
      //       "blockQuote",
      //       "|",
      //       "undo",
      //       "redo",
      //     ],
      //     shouldNotGroupWhenFull: true,
      //   },
      // }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default TextEditor;

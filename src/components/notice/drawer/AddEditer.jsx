import React from 'react';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import Context from '@ckeditor/ckeditor5-core/src/context';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

const AddEditer = ({ setCkcontent, data }) => {
  return (
    <div className="AddEditer">
      <CKEditorContext context={Context}>
        <CKEditor
          editor={ClassicEditor}
          // config={{
          //   plugins: [Paragraph, Bold, Italic, Essentials],
          //   toolbar: ['bold', 'italic'],
          // }}
          // onReady={(editor) => {
          //   console.log(editor);
          // }}
          data="<p>내용을 넣어보시요.</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            setCkcontent(data);
          }}
        />
      </CKEditorContext>
    </div>
  );
};

export default AddEditer;

import React, { Component } from 'react';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddEditer = ({ setCkcontent }) => {
  return (
    <div className="AddEditer" z>
      {/* <h2>Using CKEditor 5 build in React</h2> */}
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from the first editor working with the context!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log('hellodata', data);
          console.log({ event, editor, data });
          setCkcontent(data);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default AddEditer;

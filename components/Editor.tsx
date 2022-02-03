import React from 'react';
import EditorJS from '@editorjs/editorjs';
const Editor = () => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Введите текст',
    });
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((error) => {
          console.log('error at destroy', error);
        });
    };
  }, []);

  return <div id="editor" className="editor" />;
};

export { Editor };

import React from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void;
  initialBlocks: OutputData['blocks'];
}

const Editor: React.FC<EditorProps> = ({ onChange, initialBlocks }) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Введите текст',
      data: {
        blocks: initialBlocks,
      },
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      },
    });
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((error) => {
          console.error('error at destroy', error);
        });
    };
  }, []);

  return <div id="editor" className="editor" />;
};

export { Editor };

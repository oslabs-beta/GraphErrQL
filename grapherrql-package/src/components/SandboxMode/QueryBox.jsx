import React, { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { GraphContext } from './Context';

// import CodeMirror from 'codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css'
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closebrackets';

const QueryEditor = () => {
  const [info, setInfo] = useContext(GraphContext);

  // const DEFAULT_JSX_OPTIONS = {
  //   theme: 'custom-0',
  //   autoCloseBrackets: true,
  //   cursorScrollMargin: 48,
  //   mode: 'graphql',
  //   lineNumbers: true,
  //   indentUnit: 2,
  //   tabSize: 2,
  //   styleActiveLine: true,
  //   viewportMargin: 99,
  //   placeholder: 'Enter query or mutation'
  // };

 const onChange = (editor, data, value) => {
   setInfo(() => ({
     ...info,
     body: value,
   }));
 };

  return (
    <>
      <CodeMirror
        value={info.body}
        options={{
          mode: 'graphql',
          lineNumbers: true,
          placeholder: 'Enter GraphQL query or mutation here'
        }}
        onBeforeChange={onChange}
        onChange={(editor, metadata, value) => {
          // final value, no need to setState here
        }}
      />
    </>
  );
};

export default QueryEditor;
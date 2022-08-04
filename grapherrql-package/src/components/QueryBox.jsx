import { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { GraphContext } from './Context';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closebrackets';

const QueryEditor = () => {
  const [info, setInfo] = useContext(GraphContext);

 const handleChange = (editor, data, value) => {
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
        }}
        onBeforeChange={handleChange}
      />
    </>
  );
};

export default QueryEditor;

// props;

// onSave
// onChange
// data

let editor;
let programmaticEdit = false;
let updateProps = false;
let elemId = 'aceEditor-' + Math.random().toString(36).substring(7);

function getValue() {
    return editor.getValue();
}

function setValue(str) {
    editor.setValue(str,-1);
}

class Editor extends React.Component {

    componentDidMount () {
        editor = ace.edit(elemId);

        editor.$blockScrolling = Infinity;
        editor.getSession().setUseWorker(false);
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/javascript');
        editor.setOptions({fontSize: '12pt', wrap: true});

        if (this.props.onSave) {
            editor.commands.addCommand({
                name: 'save',
                bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
                exec: editor => {
                    let value = editor.session.getValue();

                    if (value != '') {
                        this.props.onSave(value);
                    }
                    
                }
            })
        }

        setValue(this.props.data || '');

        editor.getSession().on('change', () => {

            if (!programmaticEdit) {
                updateProps = true;
                if (this.props.onChange) {
                    this.props.onChange(getValue());
                }
                updateProps = false;
            }

        });
    }

    componentWillReceiveProps (props) {

        if (!updateProps) {
            programmaticEdit = true; 
            setValue(props.data);
            programmaticEdit = false; 
        }

    }

    render () {
        return <div className="aceEditor" id={elemId} />;
    }

}
export default Editor;

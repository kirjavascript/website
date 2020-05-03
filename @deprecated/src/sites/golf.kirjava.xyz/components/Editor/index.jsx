import initialConfig from '../util/initialConfig';

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

function updateEditor(obj) {
    Object.keys(obj).forEach(prop => {
        if (prop == 'theme') {
            editor.setTheme(`ace/theme/${obj[prop]}`);
        }
        else if (prop == 'wrap') {
            editor.getSession().setUseWrapMode(obj[prop]);
        }
    })
}

export {
    getValue as getEditor,
    setValue as setEditor,
    updateEditor
};

class Editor extends React.Component {

    componentDidMount () {
        editor = ace.edit(elemId);

        let config = initialConfig();

        editor.$blockScrolling = Infinity;
        editor.getSession().setUseWorker(false);
        editor.setTheme(`ace/theme/${config.theme}`);
        editor.getSession().setMode('ace/mode/javascript');
        editor.setOptions({
            fontSize: '12pt',
            wrap: config.wrap
        });

        if (this.props.onCommand) {
            editor.commands.addCommand({
                name: 'save',
                bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
                exec: editor => {
                    let value = editor.session.getValue();
                    this.props.onCommand('save', value);
                }
            })
            editor.commands.addCommand({
                name: 'new',
                bindKey: {win: "Ctrl-Enter", "mac": "Cmd-Enter"},
                exec: editor => {
                    this.props.onCommand('new');
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

    componentWillReceiveProps (nextProps) {

        if (!updateProps) {

            if (nextProps.data != getValue()) {
                programmaticEdit = true; 
                setValue(nextProps.data || '');
                programmaticEdit = false; 
            }

        }

    }

    render () {
        return <div className="aceEditor" id={elemId} />;
    }

}
export default Editor;

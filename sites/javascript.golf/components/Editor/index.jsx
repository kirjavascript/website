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

export {
    getValue as getEditor,
    setValue as setEditor
};

class Editor extends React.Component {

    componentDidMount () {
        editor = ace.edit(elemId);

        let theme = this.props.theme || 'monokai';

        editor.$blockScrolling = Infinity;
        editor.getSession().setUseWorker(false);
        editor.setTheme('ace/theme/' + theme);
        editor.getSession().setMode('ace/mode/javascript');
        editor.setOptions({fontSize: '12pt', wrap: true});

        if (this.props.onCommand) {
            editor.commands.addCommand({
                name: 'save',
                bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
                exec: editor => {
                    let value = editor.session.getValue();

                    if (value != '') {
                        this.props.onCommand('save', value);
                    }
                }
            })
            editor.commands.addCommand({
                name: 'new',
                bindKey: {win: "Ctrl-N", "mac": "Cmd-N"},
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
            if (nextProps.theme != this.props.theme) {
                editor.setTheme('ace/theme/' + nextProps.theme);
            }

        }

    }

    render () {
        return <div className="aceEditor" id={elemId} />;
    }

}
export default Editor;

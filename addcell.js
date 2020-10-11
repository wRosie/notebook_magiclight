define([
    'base/js/namespace',
    'base/js/events',
    'notebook/js/codecell'
], function (Jupyter, events, codecell) {
    var removeHighlight = function(){
        var cell = Jupyter.notebook.get_selected_cell();
        if (cell instanceof codecell.CodeCell){
            var prompt = cell.element.find('div.input_area');
            prompt.removeClass('CodeMirror cm-s-ipython');
        }
    };
    
    var changeHighlight = function(){
        removeHighlight();
    };
    var load_ipython_extension = function () {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register({
                'help': 'Increase code font size',
                'icon': 'fa-search-plus',
                'handler': function () {
                    $(document).ready(changeHighlight());
                }
            }, 'changeHighlight', 'sql_magiclight')
        ]);
    };
    return {
        load_ipython_extension: load_ipython_extension
    };
});
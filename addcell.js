define([
    'base/js/namespace',
    'base/js/events',
    'notebook/js/codecell',
    'codemirror/addon/mode/loadmode'
], function (Jupyter, events, codecell, CodeMirror) {

    // var removeHighlight = function(){
    //     // Jupyter.notebook.get_selected_cell().element.children()[0].getElementsByClassName('inner_cell')[0].getElementsByClassName('input_area')[0]
    //     console.log("in remove");
    //     var cell = Jupyter.notebook.get_selected_cell();

    //     // var script = document.createElement('script');
    //     // script.onload = function () {
    //     //     console.log("loaded");
    //     //     CodeMirror.autoLoadMode(cell.code_mirror, 'sql');
    //     // };
    //     // script.src = '/usr/local/share/jupyter/nbextensions/SQL_Magiclight/codemirror/addon/mode/loadmode.js';
    //     // document.head.appendChild(script); //or something of the likes
    //     //CodeMirror.autoLoadMode(cell.code_mirror, 'sql');
    //     CodeMirror.modeURL = "codemirror/mode/sql/sql.js";
    //     if (cell instanceof codecell.CodeCell){
    //         console.log("in set");
    //         //cell.code_mirror.setOption('mode','null');
    //         cell.force_highlight('null');
    //     }
    // };
    
    var changeHighlight = function(){
        console.log("in change");
        codecell.CodeCell.options_default.highlight_modes['magic_text/x-mssql'] = { 'reg': [/^%%sql/] };
        Jupyter.notebook.events.one('kernel_ready.Kernel', function () {
            Jupyter.notebook.get_cells().map(function (cell) {
                if (cell.cell_type == 'code') { cell.auto_highlight(); }
            });
        });
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

        console.log("loaded sql magic");

    };
    return {
        load_ipython_extension: load_ipython_extension
    };
});
define([
    'base/js/namespace',
    'base/js/events',
    'notebook/js/codecell',
    'codemirror/lib/codemirror',
    'codemirror/addon/mode/loadmode'
], function (Jupyter, events, codecell, CodeMirror) {

    var findMagic = function (cells) {
        var modes = []
        for (i = 0; i < cells.length; i++) {
            if (cells[i].get_text().startsWith('%%')) {
                console.log('get magic');
                var magic = cells[i].get_text().split(/ |\n/)[0];
                if (magic.length > 2) {
                    magic = magic.substring(2, magic.length);
                    if (!modes.includes(magic)) modes.push(magic);
                }
            }
        }
        return modes;
    }

    var searchForCodeMirrorMode = function (modes) {
        modeToMimes = {};
        for (i = 0; i < modes.length; i++) {
            //console.log(i + modes[i]);
            //console.log('codemirror str '+CodeMirror.toString());
            var m = CodeMirror.findModeByName(modes[i]);
            if (m != undefined) {
                modeToMimes[modes[i]] = m;
            }
        }
        return modeToMimes;
    };

    //HardCode SQL for now
    var changeHighlight = function (mode, mime) {
        key = 'magic_' + mime;
        var re = new RegExp("^%%" + mode);
        console.log(mode + re.test('%%sql'));
        modesDict = codecell.CodeCell.options_default.highlight_modes;
        if (key in modesDict) {
            modesDict[key]['reg'].push(re);
        }
        else {
            modesDict[key] = { 'reg': [re] };
        }
        Jupyter.notebook.events.one('kernel_ready.Kernel', function () {
            Jupyter.notebook.get_cells().map(function (cell) {
                if (cell.cell_type == 'code') { cell.auto_highlight(); }
            });
        });
        // console.log("in change");
        // codecell.CodeCell.options_default.highlight_modes['magic_text/x-mysql'] = { 'reg': [/^%%sql/] };
        // Jupyter.notebook.events.one('kernel_ready.Kernel', function () {
        //     Jupyter.notebook.get_cells().map(function (cell) {
        //         if (cell.cell_type == 'code') { cell.auto_highlight(); }
        //     });
        // });
    };

    var initialize = function () {
        var cells = Jupyter.notebook.get_cells();
        modes = findMagic(cells);
        console.log("modes:" + modes);
        modeToMimes = searchForCodeMirrorMode(modes);
        //if not exist
        console.log(modeToMimes)
        for (var mode in modeToMimes) {
            changeHighlight(mode, modeToMimes[mode]['mime']);
        }

    }

    var load_ipython_extension = function () {
        if (Jupyter.notebook !== undefined && Jupyter.notebook._fully_loaded) {
            $(document).ready(initialize());
        }

        events.on("notebook_loaded.Notebook", initialize(),);

        console.log("loaded magiclight");

    };
    return {
        load_ipython_extension: load_ipython_extension
    };
});
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    'use strict';
    
    var CommandManager   = brackets.getModule("command/CommandManager"),
        Menus            = brackets.getModule("command/Menus"),
        EditorManager    = brackets.getModule("editor/EditorManager"),
        DocumentManager  = brackets.getModule("document/DocumentManager"),
        Commands         = brackets.getModule("command/Commands"),
        ExtensionUtils   = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain       = brackets.getModule("utils/NodeDomain"),
        ProjectManager   = brackets.getModule("project/ProjectManager");
    
    var clipboard_module = require('clipboard_module');
    
    var setCursorPos = false;
    var initialPos   = {};
    
    function enable_option(option, set_enabled) {
        var id  = '#editor-context-menu-rightclickmenu\\.' + option;
        var id2 =  'editor-context-menu-rightclickmenu.'   + option;
        if (set_enabled) { // Enable it
            $(id).parent().show();
            $(id + '\\.disabled').remove();
        }
        else { // Disable it
            var li = $(id).parent();
            li.hide();
            if ($(id + '\\.disabled').length===0){
                $('<li>'+li.html().replace(id2, id2 + '.disabled')+'</li>').insertBefore(li).find('a').css('color', '#494949');
            }
        }
    }

    $('#editor-holder').mousedown(function(event) {
        var el = $(event.target);

        switch (event.which) {
            case 1:
                //alert('Left Mouse button pressed.');
                break;
            case 2:
                //alert('Middle Mouse button pressed.');
                break;
            case 3:
                //alert('Right Mouse button pressed.');
                          
                if(el.find('.CodeMirror-code').length > 0) {
                    var editor        = EditorManager.getCurrentFullEditor();
                    var selectedText  = editor.getSelectedText();
                    var has_selection = selectedText.length !== 0;
                    
                    initialPos   = editor.getCursorPos();
                    setCursorPos = !has_selection;
                    enable_option('copy', has_selection);
                    enable_option('cut',  has_selection);
                    //enable_option('delete', has_selection);
                    
                    //$('#editor-context-menu-navigate\\.toggleQuickEdit').parent().hide();
                    //$('#editor-context-menu-navigate\\.toggleQuickDocs').parent().hide();
                    //$('#editor-context-menu-edit\\.selectAll').parent().hide();
                }
                break;
        }
    });

    // Pastes some string into the editor
    function paste_some_string(some_str) {
        
        var editor       = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        var pos          = editor.getSelection();
        var currentDoc   = DocumentManager.getCurrentDocument();

        currentDoc.replaceRange(some_str, pos.start, pos.end);
        editor.setSelection(pos.start, pos.end);
    }
    
    // Function to paste text into editor from the clipboard
    function cmd_paste() {
        var editor = EditorManager.getCurrentFullEditor();
        if (setCursorPos) editor.setCursorPos(initialPos.line, initialPos.ch);
        
        clipboard_module.get_clipboard(function(paste_data) {
            if (paste_data) {
                paste_some_string(paste_data);
            }
        });
        
        // Note: For some reason the following does not work with win10 and brackets 1.7
        // Many of the other commands work so I don't know why paste doesn't...
        //CommandManager.execute("edit.paste");
    }
    
    function cmd_delete() {
        paste_some_string("");
    }
 
    function cmd_copy() {
        //CommandManager.execute("edit.copy");
        document.execCommand("copy", false, null);
    }
    
    function cmd_cut() {
        //CommandManager.execute("edit.cut");
        document.execCommand('cut');
    }

    function cmd_save_all_and_preview() {
        
        CommandManager.execute("file.saveAll");
        
        setTimeout(function() {
            // Note: I assume 'saveAll' is executed in an aSync process
            // so it technically might not be finished when we run this
            // command. So we put a delay so that it is most likely finished.
            CommandManager.execute("file.liveFilePreview");
        }, 250);
    }
    
    function cmd_remove_empty_lines() {
        
        var editor       = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        var pos          = editor.getSelection();
        var currentDoc   = DocumentManager.getCurrentDocument();

        if (selectedText.length === 0) {
            var str = currentDoc.getText().replace(/^\s*$[\n\r]{1,}/gm, '');
            currentDoc.setText(str);
        }
        else {
            var str = selectedText.replace(/^\s*$[\n\r]{1,}/gm, '');
            currentDoc.replaceRange(str, pos.start, pos.end);
            editor.setSelection(pos.start, pos.end);
        }
    }

    // function to reindent lines *shamelessly taken from ahuth brackets-paste-and-indent code*
    function cmd_indent_lines() {
        var editor = EditorManager.getCurrentFullEditor(),
            selection = editor.getSelection(), codeMirror = editor._codeMirror;

        codeMirror.operation(function () {
            codeMirror.eachLine(selection.start.line, selection.end.line, function (lineHandle) {
                codeMirror.indentLine(lineHandle.lineNo(), "smart");
            });
        });
    }
    
    function register_command(name, id, fn, cmd_id) {
        if (cmd_id) CommandManager.register(name, id, function() { CommandManager.execute(cmd_id); });
        else        CommandManager.register(name, id, fn);
        Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(id);
        
        // Register keybinding
        // KeyBindingManager.addBinding(id, 'Ctrl-U');
    }
    
    // Register commands on the menu
    // See https://github.com/adobe/brackets/blob/master/src/command/Commands.js
    //Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    register_command("Undo",   "rightclickmenu.undo",  null, "edit.undo");
    register_command("Redo",   "rightclickmenu.redo",  null, "edit.redo");
    
    //Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    //register_command("Cut",    "rightclickmenu.cut",    cmd_cut);
    //register_command("Copy",   "rightclickmenu.copy",   cmd_copy);
    //register_command("Paste",  "rightclickmenu.paste",  cmd_paste);
    //register_command("Delete", "rightclickmenu.delete", cmd_delete);
    
    //Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    //register_command("Select All", "rightclickmenu.selectAll", null, "edit.selectAll");
    
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    register_command("Save",         "rightclickmenu.save",    null, "file.save");
    register_command("Save All",     "rightclickmenu.saveAll", null, "file.saveAll");
    //register_command("Save As...", "rightclickmenu.saveAs",  null, "file.saveAs");
    register_command("Live Preview", "rightclickmenu.livePreview", null, "file.liveFilePreview");
    //register_command("Save All & Live Preview", "rightclickmenu.saveAllPreview", cmd_save_all_and_preview);
    
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    register_command("Toggle Line Comment",  "rightclickmenu.lineComment",  null, Commands.EDIT_LINE_COMMENT);
    register_command("Toggle Block Comment", "rightclickmenu.blockComment", null, Commands.EDIT_BLOCK_COMMENT);
    
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    register_command("Remove Empty Lines",   "rightclickmenu.removeLines",  cmd_remove_empty_lines);
    register_command("Fix Line Indentions",  "rightclickmenu.indentLine",   cmd_indent_lines);
});

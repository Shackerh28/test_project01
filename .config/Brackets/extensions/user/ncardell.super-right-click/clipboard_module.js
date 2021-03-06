/*jslint indent: 2, nomen: true, white: true, vars: true */
/*global define, brackets, console */

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain     = brackets.getModule("utils/NodeDomain");
    
    var simpleDomain   = new NodeDomain("clipboard_module", ExtensionUtils.getModulePath(module, "node/clipboard_module_domain"));

    function exec_get_clipboard(call_back) {
        if (simpleDomain) {
            simpleDomain.exec("get_clipboard")
                .done(function (paste_data) {
                    //console.log("[brackets-clipboard_module-node] get_clipboard success!");
                    //console.log("paste_data valid: " + !!paste_data);
                    //console.log("paste_data: [" + paste_data + "]");
                    call_back(paste_data);
                }).fail(function (err) {
                    console.error("[brackets-clipboard_module-node] failed to run get_clipboard...", err);
                });
        }
    }

    exports.get_clipboard = exec_get_clipboard;
});
 


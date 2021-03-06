/*jslint indent: 2 */
/*global require, exports */

(function () {
    'use strict';

    var copy_paste = require('copy-paste');
    
    function cmd_get_clipboard(err_back) {
        copy_paste.get_clipboard(function(err, result) {
            return err_back(err, result);
        });
    }
    
    /**
    * Initializes the domain.
    * @param {DomainManager} DomainManager The DomainManager for the server.
    */
    function init(DomainManager) {
        if(!DomainManager.hasDomain('clipboard_module')) {
            DomainManager.registerDomain('clipboard_module', {major: 1, minor: 4});
        }
             
        DomainManager.registerCommand(
            'clipboard_module',     // domain name
            'get_clipboard',        // command name
            cmd_get_clipboard,      // command handler function
            true,                   // isAsync?
            'Gets paste data from clipboard.',
            [],                     // parameters documentation...
            []                      // return result documentation...
        );
    }
    
    exports.init = init;
    
}());
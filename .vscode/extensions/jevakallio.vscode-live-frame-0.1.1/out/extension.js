"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const host_1 = require("./host");
const pane_1 = require("./pane");
function activate(context) {
    let currentPanel;
    let disposable = vscode.commands.registerCommand("vscode-live-frame.open", () => {
        const config = vscode.workspace.getConfiguration("liveFrame");
        const url = config.get("url");
        const title = config.get("title") || url || "Live Frame";
        const pane = config.get("pane");
        const column = pane_1.getColumnFromPane(pane);
        if (!currentPanel) {
            const panel = (currentPanel = vscode.window.createWebviewPanel("vscode-live-frame", title, column, {
                enableCommandUris: true,
                enableFindWidget: true,
                localResourceRoots: [],
                enableScripts: true,
            }));
            vscode.workspace.onDidChangeConfiguration((e) => {
                const newConfig = vscode.workspace.getConfiguration("liveFrame");
                const newUrl = newConfig.get("url");
                const newTitle = newConfig.get("title") || newUrl || "Live Frame";
                panel.webview.html = newUrl
                    ? host_1.renderHost(newUrl)
                    : host_1.renderPlaceholder();
                panel.title = newTitle;
            });
            panel.webview.html = url ? host_1.renderHost(url) : host_1.renderPlaceholder();
            panel.onDidDispose(() => {
                currentPanel = undefined;
            });
        }
        else {
            currentPanel.reveal();
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
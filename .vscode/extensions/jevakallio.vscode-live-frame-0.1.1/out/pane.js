"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnFromPane = void 0;
const vscode_1 = require("vscode");
exports.getColumnFromPane = (pane) => {
    switch (pane) {
        case "Active":
            return vscode_1.ViewColumn.Active;
        case "Beside":
            return vscode_1.ViewColumn.Beside;
        case "One":
            return vscode_1.ViewColumn.One;
        case "Two":
            return vscode_1.ViewColumn.Two;
        case "Three":
            return vscode_1.ViewColumn.Three;
        case "Four":
            return vscode_1.ViewColumn.Four;
        case "Five":
            return vscode_1.ViewColumn.Five;
        case "Six":
            return vscode_1.ViewColumn.Six;
        case "Seven":
            return vscode_1.ViewColumn.Seven;
        case "Eight":
            return vscode_1.ViewColumn.Eight;
        case "Nine":
            return vscode_1.ViewColumn.Nine;
        default:
            return vscode_1.ViewColumn.Beside;
    }
};
//# sourceMappingURL=pane.js.map
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const nextErrorDisposable = vscode.commands.registerCommand('code-crawler.nextError', function () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        vscode.commands.executeCommand('editor.action.marker.next');
    } else {
        vscode.window.showInformationMessage('No active editor');
    }
});

// Navigate to Previous Error/Warning
const prevErrorDisposable = vscode.commands.registerCommand('code-crawler.prevError', function () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        vscode.commands.executeCommand('editor.action.marker.prev');
    } else {
        vscode.window.showInformationMessage('No active editor');
    }
});

module.exports = {
    nextErrorDisposable,
    prevErrorDisposable
};


// The module 'vscode' contains the VS Code extensibility API


// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const jumpToMatchingBracketDisposable = vscode.commands.registerCommand('code-crawler.jumpToMatchingBracket', function () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        vscode.commands.executeCommand('editor.action.jumpToBracket');
    } else {
        vscode.window.showInformationMessage('No active editor');
    }
});

module.exports={
    jumpToMatchingBracketDisposable
}

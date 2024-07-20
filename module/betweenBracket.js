// The module 'vscode' contains the VS Code extensibility API


// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const selectBetweenBracketsDisposable = vscode.commands.registerCommand('code-crawler.selectBetweenBrackets', function () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const cursorPosition = editor.selection.active;
        const text = document.getText();

        const bracketPairs = {
            '(': ')',
            '{': '}',
            '[': ']'
        };
        const openBrackets = Object.keys(bracketPairs);
        const closeBrackets = Object.values(bracketPairs);

        const stack = [];
        let startPosition = null;
        let endPosition = null;

        // Forward search for the opening bracket
        for (let i = document.offsetAt(cursorPosition); i >= 0; i--) {
            // console.log(i);
            const char = text[i];
            // console.log(char);
            const position = document.positionAt(i);
            // console.log(position);

            if (closeBrackets.includes(char)) {
                stack.push(char);
            } else if (openBrackets.includes(char)) {
                if (stack.length === 0) {
                    startPosition = position.translate(0, 1);
                    break;
                }
            }
        }

        stack.length = 0;

        // Backward search for the closing bracket
        for (let i = document.offsetAt(cursorPosition); i < text.length; i++) {
            const char = text[i];
            const position = document.positionAt(i);

            if (openBrackets.includes(char)) {
                stack.push(char);
            } else if (closeBrackets.includes(char)) {
                if (stack.length === 0) {
                    endPosition = position;
                    break;
                }
                const expectedOpenBracket = Object.keys(bracketPairs).find(key => bracketPairs[key] === char);
                if (stack[stack.length - 1] === expectedOpenBracket) {
                    stack.pop();
                }
            }
        }

        if (startPosition && endPosition) {
            const range = new vscode.Range(startPosition, endPosition);
            editor.selection = new vscode.Selection(range.start, range.end);
            editor.revealRange(range);
        } else {
            vscode.window.showInformationMessage('No matching bracket found');
        }
    } else {
        vscode.window.showInformationMessage('No active editor');
    }
});

module.exports={
    selectBetweenBracketsDisposable
}
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-crawler" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('code-crawler.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from code-crawler!');

		// me here
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const cursorPosition = editor.selection.active;
            const text = document.getText();

            // vscode.window.showInformationMessage(`Cursor Position: Line ${cursorPosition.line + 1}, Column ${cursorPosition.character + 1}`);
            // vscode.window.showInformationMessage(`Cursor Text: selected ${text.slice(0,2)}`);


			const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
			const start = selection.start;
            const end = selection.end;
			// console.log('helooo');
			// console.log([start.line,start.character]);
			// console.log(end);
			// console.log('hello');

            if (selectedText) {
                console.log(`Selected Text: ${selectedText}`);
                vscode.window.showInformationMessage(`Selected Text: ${selectedText}`);

            } else {
                vscode.window.showInformationMessage('No text selected');
            }
			

			const regex = new RegExp(selectedText, 'g');
            let match;
            const positions = [];
			let ind=0;
            while ((match = regex.exec(text)) !== null) {
                const startPos = editor.document.positionAt(match.index);
                const endPos = editor.document.positionAt(match.index + selectedText.length);
                positions.push({ind, startPos, endPos });
				ind++;
            }

			let curPos=0;
			let len  = positions.length;
			for (let i = 0; i < positions.length; i++) {
				const pos = positions[i];
				if(start.line==pos.startPos.line && end.line==pos.endPos.line && start.character==pos.startPos.character && end.character==pos.endPos.character ){
					curPos=pos.ind;
					break;
				}
			}
			console.log('ppppossss  : ');
			console.log(curPos);
            if (positions.length === 0) {
                vscode.window.showInformationMessage('No matches found');
                return;
            }else{
				console.log(`occurences of the word is  : ${positions.length}`);
				// for (let i = 0; i < positions.length; i++) {
				// 	const pos = positions[i];
				// 	console.log(`Occurrence ${i + 1}: Line ${pos.startPos.line + 1}, Column ${pos.startPos.character + 1} to Line ${pos.endPos.line + 1}, Column ${pos.endPos.character + 1}, positibn : ${pos.ind}`);
				// }
			}
			
			if (curPos<=len-1 && curPos>=0) {
				// Create a new position
				curPos++;
				if (curPos==len) {
					curPos=0;
				}
				console.log(`now we at : ${curPos}`);
				console.log(`new postitio : ${curPos}`);
				let lineNumber = positions[curPos].startPos.line;
				let characterNumber = positions[curPos].startPos.character;
				const newPosition = new vscode.Position(positions[curPos].startPos.line, positions[curPos].startPos.character);
				// Ensure the new position is within the document bounds
				if (lineNumber >= editor.document.lineCount) {
					vscode.window.showInformationMessage('Line number out of bounds');
					return;
				}
	
				const lineLength = editor.document.lineAt(lineNumber).range.end.character;
				if (characterNumber > lineLength) {
					vscode.window.showInformationMessage('Character position out of bounds for the specified line');
					return;
				}
	
				// Move the cursor to the new position
				const newSelection = new vscode.Selection(newPosition, newPosition);
				editor.selection = newSelection;
				editor.revealRange(new vscode.Range(newPosition, newPosition));
	
				console.log(`Cursor moved to: Line ${lineNumber + 1}, Character ${characterNumber + 1}`);
				vscode.window.showInformationMessage(`Cursor moved to: Line ${lineNumber + 1}, Character ${characterNumber + 1}`);
			}

			// now moving forward the cursor of the selected text






        } else {
            vscode.window.showInformationMessage('No active editor');
        }
		// me there 

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

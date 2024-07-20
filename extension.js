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
	// console.log('Congratulations, your extension "code-crawler" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('code-crawler.navigateNext', function () {
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
			// const wordLen = start.character - end.character ;
			

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
			//  now moving forward the cursor of the selected text
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
				// const newPosition = new vscode.Position(positions[curPos].startPos.line, positions[curPos].startPos.character);
				const newPosition = new vscode.Position(positions[curPos].startPos.line, positions[curPos].startPos.character);
                const endPosition = new vscode.Position(positions[curPos].endPos.line, positions[curPos].endPos.character);


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
				const newSelection = new vscode.Selection(newPosition, endPosition);
				editor.selection = newSelection;
				editor.revealRange(new vscode.Range(newPosition, endPosition));
	
				console.log(`Cursor moved to: Line ${lineNumber + 1}, Character ${characterNumber + 1}`);
				vscode.window.showInformationMessage(`Cursor moved to: Line ${lineNumber + 1}, Character ${characterNumber + 1}`);
			}

			//
        } else {
            vscode.window.showInformationMessage('No active editor');
        }
		// me there
	});
	context.subscriptions.push(disposable);

	// new feature

	const simpleFunctionDisposable = vscode.commands.registerCommand('code-crawler.navigatePrevious', function () {
        // me here
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const cursorPosition = editor.selection.active;
            const text = document.getText();


			const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
			const start = selection.start;
            const end = selection.end;
			const wordLen = start.character - end.character ;			

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
				
			}
			//  now moving forward the cursor of the selected text
			if (curPos<=len-1 && curPos>=0) {
				// Create a new position
				curPos--;
				if (curPos==-1) {
					curPos=len-1;
				}
				console.log(`now we at : ${curPos}`);
				console.log(`new postitio : ${curPos}`);
				let lineNumber = positions[curPos].startPos.line;
				let characterNumber = positions[curPos].startPos.character;
				
				const newPosition = new vscode.Position(positions[curPos].startPos.line, positions[curPos].startPos.character);
                const endPosition = new vscode.Position(positions[curPos].endPos.line, positions[curPos].endPos.character);
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
				
				// const newSelection = new vscode.Selection(newPosition, newPosition);
				// editor.selection = newSelection;
				// editor.revealRange(new vscode.Range(newPosition, newPosition));
				const newSelection = new vscode.Selection(newPosition, endPosition);
				editor.selection = newSelection;
				editor.revealRange(new vscode.Range(newPosition, endPosition));
			}
			//
        } else {
            vscode.window.showInformationMessage('No active editor');
        }
		// me there
    });
    context.subscriptions.push(simpleFunctionDisposable);

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

    context.subscriptions.push(nextErrorDisposable);
    context.subscriptions.push(prevErrorDisposable);	

	const jumpToMatchingBracketDisposable = vscode.commands.registerCommand('code-crawler.jumpToMatchingBracket', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            vscode.commands.executeCommand('editor.action.jumpToBracket');
        } else {
            vscode.window.showInformationMessage('No active editor');
        }
    });

    context.subscriptions.push(jumpToMatchingBracketDisposable);

	// Command to select the text between matching brackets
	const selectBetweenBracketsDisposable = vscode.commands.registerCommand('code-crawler.selectBetweenBrackets', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const cursorPosition = editor.selection.active;
			// console.log(cursorPosition);
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
				console.log(i);
                const char = text[i];
				console.log(char);
                const position = document.positionAt(i);
				console.log(position);
				// console.log('********');

                if (closeBrackets.includes(char)) {
                    stack.push(char);
                } else if (openBrackets.includes(char)) {
                    if (stack.length === 0) {
                        startPosition = position.translate(0, 1);
                        break;
                    }
                    // const expectedCloseBracket = bracketPairs[char];
                    // if (stack[stack.length - 1] === expectedCloseBracket) {
                    //     stack.pop();
                    // }
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

    // context.subscriptions.push(jumpToMatchingBracketDisposable);
    context.subscriptions.push(selectBetweenBracketsDisposable);


	

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

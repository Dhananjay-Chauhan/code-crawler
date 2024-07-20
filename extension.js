const vscode = require('vscode');

const { disposable } = require('./module/navigateNext');
const { simpleFunctionDisposable } = require('./module/navigatePrev');
const { nextErrorDisposable,prevErrorDisposable } = require('./module/error');
const { jumpToMatchingBracketDisposable } = require('./module/nextBracket');
const { selectBetweenBracketsDisposable } = require('./module/betweenBracket');




/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	context.subscriptions.push(disposable);
    context.subscriptions.push(simpleFunctionDisposable);
    context.subscriptions.push(nextErrorDisposable);
    context.subscriptions.push(prevErrorDisposable);	
    context.subscriptions.push(jumpToMatchingBracketDisposable);
    context.subscriptions.push(selectBetweenBracketsDisposable);

}


function deactivate() {}

module.exports = {
	activate,
	deactivate
}

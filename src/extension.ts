import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('img-contextual.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World from img-contextual!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

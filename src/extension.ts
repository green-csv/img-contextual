import {
	commands,
	ExtensionContext,
	window,
	Uri,
	env,

} from 'vscode';

import { ImageEncoder} from './encoder';
const output = window.createOutputChannel('Docs: Image compression');

export function activate(context: ExtensionContext) {

	[
		commands.registerCommand('img-contextual.encodeToB64', (uri: Uri) => {

			const encoder = new ImageEncoder();
			const result = encoder.imageEncode(uri.fsPath);
			if(result){
				env.clipboard.writeText(result || '');
				window.showInformationMessage('Copied to clipboard.');
			}else{
				window.showErrorMessage(`Can't encode this file.`);
			}
		})
	].forEach(cmd => context.subscriptions.push(cmd));
}

export function deactivate() {}

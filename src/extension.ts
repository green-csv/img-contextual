import {
	commands,
	ExtensionContext,
	window,
	Uri,
	env,
	Selection,
	TextDocument,
	TextEditor
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
		}),
		commands.registerCommand('img-contextual.encodeTextToB64', () => {
			const encoder = new ImageEncoder();

			const result = encoder.textEncodeToBase64(window.activeTextEditor);
			if(result){
				env.clipboard.writeText(result || '');
				window.showInformationMessage('Copied to clipboard.');
			}else{
				window.showErrorMessage(`Can't encode selected lines.`);
			}

		}),
		commands.registerCommand('img-contextual.decodeB64ToAscii',() => {

			const encoder = new ImageEncoder();

			const result = encoder.textDecodeBase64ToAscii(window.activeTextEditor);
			if(result){
				env.clipboard.writeText(result || '');
				window.showInformationMessage('Copied to clipboard.');
			}else{
				window.showErrorMessage(`Can't decode selected lines.`);
			}
		})
	].forEach(cmd => context.subscriptions.push(cmd));
}

export function deactivate() {}

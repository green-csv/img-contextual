import {
	commands,
	env,
	ExtensionContext,
	Range,
	Selection,
	Uri,
	TextDocument,
	TextEditor,
	window
} from 'vscode';
import { ImageEncoder } from './encoder';
import { PreviewPanel } from './web-view/preview';
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
		}),
		commands.registerCommand('img-contextual.previewB64',() => {

			if(window.activeTextEditor) {
				const preview = new PreviewPanel();

				const selection = window.activeTextEditor.selection as Selection;
				const text = window.activeTextEditor.document.getText(new Range(selection.start, selection.end)) as string;

				preview.show(text, context.extensionUri);
			}
		})
	].forEach(cmd => context.subscriptions.push(cmd));
}

export function deactivate() {}

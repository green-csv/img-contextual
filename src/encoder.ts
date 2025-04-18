import * as fs from 'fs';
import { Range, TextEditor,  } from 'vscode';
import { imageExtensions, imageMimeTypes, fileExtensionExpression } from './extensions-registry';
export class ImageEncoder {

	constructor() {}

	private filePathHasValidExtension(filePath: string): boolean {
		const fileExtension = this.getFileExtension(filePath).toLowerCase();
		return imageExtensions.includes(fileExtension);
	}

	public imageEncode(filePath: string): string {
		
		const fileExtension = this.getFileExtension(filePath).toLowerCase();
		const mimeType = imageMimeTypes.get(fileExtension);
		
		const base64 = fs.readFileSync(filePath, { encoding: 'base64' });
		if (!mimeType) {
			return `base64,${base64}`;
		}
		
		return `data:${mimeType};base64,${base64}`;
	}

	public textEncodeToBase64(currentTextEditor: TextEditor | undefined): string {
		if (!currentTextEditor || currentTextEditor.selections.length === 0) {return '';}

		const document = currentTextEditor.document;
		return currentTextEditor.selections
			.map((selection) => {
				const selectedText = document.getText(new Range(selection.start, selection.end));
				return Buffer.from(selectedText).toString('base64');
			})
			.join('\n');
	}

	public textDecodeBase64ToAscii(currentTextEditor: TextEditor | undefined): string {
		if (!currentTextEditor || currentTextEditor.selections.length === 0) {return '';}

		const document = currentTextEditor.document;
		return currentTextEditor.selections
			.map((selection) => {
				const selectedText = document.getText(new Range(selection.start, selection.end));
				return Buffer.from(selectedText, 'base64').toString('ascii');
			})
			.join('\n');
	}

	private getFileExtension(filePath: string): string {
		if (filePath) {
			const result = fileExtensionExpression.exec(filePath);
			return result ? result[0] : '';
		}
		return '';
	}
}

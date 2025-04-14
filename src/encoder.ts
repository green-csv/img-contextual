import * as fs from 'fs';
import { Range, TextEditor } from 'vscode';

export class ImageEncoder {

	private readonly fileExtensionExpression: RegExp = /(?:\.([^.]+))?$/;
	private readonly imageExtensions: string[] = [
		'.png',
		'.jpg',
		'.jpeg',
		'.gif',
		'.webp',
		'.ico'
	];
	private readonly imageMimeTypes: Map<string, string> =
		new Map<string, string>([
			['.png', 'image/png'],
			['.jpg', 'image/jpg'],
			['.jpeg', 'image/jpeg'],
			['.gif', 'image/gif'],
			['.webp', 'image/webp'],
			['.ico', 'image/x-icon']
		]);

	constructor() { }

	private filePathHasValidExtension(filePath: string): boolean {
		const fileExtension = this.getFileExtension(filePath).toLowerCase();
		return this.imageExtensions.includes(fileExtension);
	}

	public imageEncode(filePath: string): string | false {
		if (!this.filePathHasValidExtension(filePath)) return false;

		const fileExtension = this.getFileExtension(filePath).toLowerCase();
		const mimeType = this.imageMimeTypes.get(fileExtension);
		if (!mimeType) return false;

		const base64 = fs.readFileSync(filePath, { encoding: 'base64' });
		return `data:${mimeType};base64,${base64}`;
	}

	public textEncodeToBase64(currentTextEditor: TextEditor | undefined): string {
		if (!currentTextEditor || currentTextEditor.selections.length === 0) return '';

		const document = currentTextEditor.document;
		return currentTextEditor.selections
			.map((selection) => {
				const selectedText = document.getText(new Range(selection.start, selection.end));
				return Buffer.from(selectedText).toString('base64');
			})
			.join('\n');
	}

	public textDecodeBase64ToAscii(currentTextEditor: TextEditor | undefined): string {
		if (!currentTextEditor || currentTextEditor.selections.length === 0) return '';

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
			const result = this.fileExtensionExpression.exec(filePath);
			return result ? result[0] : '';
		}
		return '';
	}
}

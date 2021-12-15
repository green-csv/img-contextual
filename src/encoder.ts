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
		if (filePath) {
			const fileExtension = this.getFileExtension(filePath);
			let is = (
				fileExtension &&
				this.imageExtensions.some((ext) => ext === fileExtension.toLowerCase())
			);
			return !!is;
		}
		return false;
	}

	public imageEncode(filePath: string): string | false {
		if (this.filePathHasValidExtension(filePath)) {
			const fileExtension = (this.getFileExtension(filePath) || '').toLowerCase();

			switch (fileExtension) {
				case '.png':
				case '.jpg':
				case '.jpeg':
				case '.gif':
				case '.webp':
				case '.ico':
					return  `data:${this.imageMimeTypes.get(fileExtension)};base64,${fs.readFileSync(filePath, { encoding: 'base64' })}`;
			}
		}
		return false;
	}

	public textEncodeToBase64(currentTextEditor: TextEditor | undefined): string {

		if(currentTextEditor === undefined){return '';}

		const document = currentTextEditor.document;
		var linesEncoded: string = '';

		currentTextEditor.selections.forEach( (e) =>{
			let selection = document.getText(new Range(e.start, e.end));
			let buffer = Buffer.from(selection);

			linesEncoded += buffer.toString('base64') + '\n';
		});

		return linesEncoded;
	}

	public textDecodeBase64ToAscii(currentTextEditor: TextEditor | undefined): string {

		if(currentTextEditor === undefined){return '';}

		const document = currentTextEditor.document;
		var linesDecoded: string = '';

		currentTextEditor.selections.forEach( (e) =>{
			let selection = document.getText(new Range(e.start, e.end));
			let buffer = Buffer.from(selection, 'base64');

			linesDecoded += buffer.toString('ascii') + '\n';
		});

		return linesDecoded;
	}

	private getFileExtension(filePath: string): string{
		if (filePath) {
			const result = this.fileExtensionExpression.exec(filePath);
			return result ? result[0] : '';
		}
		return '';
	}
}

import { OutputChannel, Progress } from 'vscode';
import * as fs from 'fs';


export class ImageEncoder {
	private isBatching = false;

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

	private filePathHasValidExtension(filePath: string) {
		if (filePath) {
			const fileExtension = this.getFileExtension(filePath);
			return (
				fileExtension &&
				this.imageExtensions.some((ext) => ext === fileExtension.toLowerCase())
			);
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

	private getFileExtension(filePath: string) {
		if (!filePath) {
			return null;
		}

		const result = this.fileExtensionExpression.exec(filePath);
		return result ? result[0] : null;
	}
}

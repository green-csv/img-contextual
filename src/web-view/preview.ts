import * as vscode from 'vscode';

export class PreviewPanel{
   public static readonly viewType = 'PreviewPanel';

   public  show(imageSrc: string, extensionUri: vscode.Uri){
      const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

      const panel = vscode.window.createWebviewPanel(
         PreviewPanel.viewType,
         'Preview encode image',
         column || vscode.ViewColumn.One
      );

      panel.webview.html = this._getHtmlForWebview(panel.webview, extensionUri, imageSrc);
   }

   private  _getHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri, imageSrc: string) {
		// Get resource paths
		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'styles.css'));

		return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Preview Encode</title>

          <link href="${styleUri}" rel="stylesheet" />
        </head>
        <body>
           <main class="container">
               <img src="${imageSrc}" alt="Preview Decoded" />
           </main>
        </body>
      </html>`;
	}
}
import * as vscode from 'vscode';

export class PreviewPanel {
   public static readonly viewType = 'PreviewPanel';

   public show(imageSrc: string, extensionUri: vscode.Uri) {
      const column = vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One;

      const panel = vscode.window.createWebviewPanel(
         PreviewPanel.viewType,
         'Preview encode image',
         column,
         {
            enableScripts: false,
            localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'assets')]
         }
      );

      panel.webview.html = this.getHtmlContent(panel.webview, extensionUri, imageSrc);
   }

   private getHtmlContent(webview: vscode.Webview, extensionUri: vscode.Uri, imageSrc: string): string {
      const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'styles.css'));
      const safeImageSrc = imageSrc.replace(/"/g, '&quot;');

      return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Preview Encode</title>
          <link href="${styleUri}" rel="stylesheet" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https:; style-src ${webview.cspSource};" />
        </head>
        <body>
         <main class="container">
            <div class="preview">
               <img src="${safeImageSrc}" alt="Preview Decoded" />
               <section class="meta">
               <p><strong>File Type:</strong> Image (Base64)</p>
               <p><strong>Resolution:</strong> Auto-detected by browser</p>
               <p><strong>Size:</strong> Depends on base64 input</p>
               </section>
            </div>
         </main>
         </body>
      </html>`;
   }
}
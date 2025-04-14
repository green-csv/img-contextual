import {
  commands,
  env,
  ExtensionContext,
  Range,
  Selection,
  Uri,
  window
} from 'vscode';
import { ImageEncoder } from './encoder';
import { PreviewPanel } from './web-view/preview';

const output = window.createOutputChannel('Docs: Image compression');

export function activate(context: ExtensionContext) {
  const encoder = new ImageEncoder();

  const subscriptions = [
    commands.registerCommand('img-contextual.encodeToB64', (uri: Uri) =>
      handleEncodeToBase64(uri, encoder)
    ),
    commands.registerCommand('img-contextual.encodeTextToB64', () =>
      handleEncodeTextToBase64(encoder)
    ),
    commands.registerCommand('img-contextual.decodeB64ToAscii', () =>
      handleDecodeBase64ToAscii(encoder)
    ),
    commands.registerCommand('img-contextual.previewB64', () =>
      handlePreviewBase64(context)
    )
  ];

  context.subscriptions.push(...subscriptions);
}

export function deactivate() {}

function handleEncodeToBase64(uri: Uri, encoder: ImageEncoder) {
  const result = encoder.imageEncode(uri.fsPath);
  if (result) {
    env.clipboard.writeText(result);
    window.showInformationMessage('Copied image as Base64 to clipboard.');
    output.appendLine(`Encoded: ${uri.fsPath}`);
  } else {
    window.showErrorMessage("Can't encode this file.");
  }
}

function handleEncodeTextToBase64(encoder: ImageEncoder) {
  const editor = window.activeTextEditor;
  if (!editor) {return;}

  const result = encoder.textEncodeToBase64(editor);
  if (result) {
    env.clipboard.writeText(result);
    window.showInformationMessage('Copied selected text as Base64.');
    output.appendLine(`Encoded selected text.`);
  } else {
    window.showErrorMessage("Can't encode selected lines.");
  }
}

function handleDecodeBase64ToAscii(encoder: ImageEncoder) {
  const editor = window.activeTextEditor;
  if (!editor) {return;}

  const result = encoder.textDecodeBase64ToAscii(editor);
  if (result) {
    env.clipboard.writeText(result);
    window.showInformationMessage('Decoded Base64 and copied to clipboard.');
    output.appendLine(`Decoded selected Base64.`);
  } else {
    window.showErrorMessage("Can't decode selected lines.");
  }
}

function handlePreviewBase64(context: ExtensionContext) {
  const editor = window.activeTextEditor;
  if (!editor) {return;}

  const selection = editor.selection;
  const text = editor.document.getText(new Range(selection.start, selection.end));
  new PreviewPanel().show(text, context.extensionUri);
  output.appendLine('Previewing base64 string.');
}

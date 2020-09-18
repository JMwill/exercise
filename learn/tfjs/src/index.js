import * as nn from './nn'
function onDocumentLoad() {
  nn.setup()
}

document.addEventListener('DOMContentLoaded', onDocumentLoad);
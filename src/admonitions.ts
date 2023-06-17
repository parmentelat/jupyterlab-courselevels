/* eslint-disable prettier/prettier */

import { Notebook, NotebookActions, } from '@jupyterlab/notebook'

/* works on the active cell */
export const toggle_admonition = (notebook: Notebook, admonition: string): void => {

  const activeCell = notebook?.activeCell
  if (activeCell === undefined) { return }
  const model = activeCell?.model
  if (model === undefined) { return }

  NotebookActions.changeCellType(notebook, 'markdown')

  let cell_source = model.sharedModel.getSource()
  // remove trailing newlines
  while (cell_source.endsWith('\n')) {
    cell_source = cell_source.slice(0, -1)
  }
  // does it start with an admonition?
  const turning_off = (cell_source.startsWith(':::') || cell_source.startsWith('````'))

  console.log('turning_off', turning_off)

  // a function that removes any initial white line, and any trailing white line
  // a line is considered white if it is empty or only contains whitespace
  const tidy = (dirty: string): string => {
    const lines = dirty.split('\n')
    while (lines[0].match(/^\s*$/)) {
      lines.shift()
    }
    while (lines[lines.length - 1].match(/^\s*$/)) {
      lines.pop()
    }
    return lines.join('\n')
  }

  if (turning_off) {
    model.sharedModel.setSource(
      tidy(
        cell_source
          .replace(RegExp(`^::: *{[a-zA-Z]+}`), '')
          .replace(RegExp(`^\`\`\`\` *{[a-zA-Z]+}`), '')
          // .replace(RegExp('````.*$'), '')
          // .replace(RegExp('```.*$'), '')
          // .replace(RegExp(':::.*$'), '')
      )
    )
  } else {
    model.sharedModel.setSource(
      `\`\`\`\`{${admonition}}\n${tidy(cell_source)}\n\`\`\`\``
    )
  }
}

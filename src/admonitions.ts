/* eslint-disable prettier/prettier */

import { Notebook, NotebookActions, } from '@jupyterlab/notebook'

const FENCE = '````'

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
  const turning_off = cell_source.startsWith(FENCE)

  console.debug('admonition: turning_off', turning_off)

  // a function that removes any initial white line, and any trailing white line
  // a line is considered white if it is empty or only contains whitespace
  const tidy = (dirty: string): string => {
    const lines = dirty.split('\n')
    while (lines.length !=0 && lines[0].match(/^\s*$/)) {
      lines.shift()
    }
    while (lines.length !=0 && lines[lines.length - 1].match(/^\s*$/)) {
      lines.pop()
    }
    return lines.join('\n')
  }

  let new_source: string
  if (turning_off) {
    new_source = tidy(
        cell_source
        .replace(RegExp(`^${FENCE} *{[a-zA-Z]+}`), '')
        .replace(RegExp(`\n${FENCE}$`), '')
    )
  } else {
    new_source = `${FENCE}{${admonition}}\n${tidy(cell_source)}\n${FENCE}`
  }

  model.sharedModel.setSource(new_source)
}

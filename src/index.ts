/*
 * for attaching keybindings later on, see
 * https://towardsdatascience.com/how-to-customize-jupyterlab-keyboard-shortcuts-72321f73753d
 */

/* eslint-disable prettier/prettier */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application'

import { ICommandPalette } from '@jupyterlab/apputils'

import {
  INotebookTracker,
  // Notebook,
  // NotebookActions,
} from '@jupyterlab/notebook'

// import {
//   CodeCell,
//   MarkdownCell,
//   Cell,
// } from '@jupyterlab/cells'

//import { Widget } from '@lumino/widgets'

// import {
//   md_get, md_set, md_unset, md_insert, md_remove, /*md_toggle, */md_clean
// } from './metadata' //from '@jupyterlab-celltagsclasses'


/**
 * Initialization data for the jupyterlab-courselevels extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-courselevels:plugin',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, notebookTracker: INotebookTracker) => {
    console.log('JupyterLab extension jupyterlab-courselevels is activating')
    // https://lumino.readthedocs.io/en/1.x/api/commands/interfaces/commandregistry.ikeybindingoptions.html
    // The supported modifiers are: Accel, Alt, Cmd, Ctrl, and Shift. The Accel
    // modifier is translated to Cmd on Mac and Ctrl on all other platforms. The
    // Cmd modifier is ignored on non-Mac platforms.
    // Alt is option on mac

    // let command

    // command = 'courselevels:metadata-clean'
    // app.commands.addCommand(command, {
    //   label: `clean metadata for all selected cells`,
    //   execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => md_clean(cell, ''))
    // })
    // palette.addItem({ command, category: 'CourseLevels' })
    // app.commands.addKeyBinding({ command, keys: ['Alt Cmd 7'], selector: '.jp-Notebook' })


    // xxx
  }
}

export default plugin

/*
 * for attaching keybindings later on, see
 * https://towardsdatascience.com/how-to-customize-jupyterlab-keyboard-shortcuts-72321f73753d
 */

/* eslint-disable prettier/prettier */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application'
import { ICommandPalette } from '@jupyterlab/apputils'
import { INotebookTracker, NotebookPanel, INotebookModel } from '@jupyterlab/notebook'
import { Cell } from '@jupyterlab/cells'

import { IDisposable, DisposableDelegate } from '@lumino/disposable'
import { DocumentRegistry } from '@jupyterlab/docregistry'
import { ToolbarButton } from '@jupyterlab/apputils'

import { md_has, md_insert, md_remove } from 'jupyterlab-celltagsclasses'

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

    const cell_toggle_level = (cell: Cell, level: string): void => {
      switch (level) {
        case 'basic':
          if (md_has(cell, 'tags', 'level_basic')) {
            md_remove(cell, 'tags', 'level_basic')
          } else {
            md_insert(cell, 'tags', 'level_basic')
            md_remove(cell, 'tags', 'level_intermediate')
            md_remove(cell, 'tags', 'level_advanced')
          }
          break
        case 'intermediate':
          if (md_has(cell, 'tags', 'level_intermediate')) {
            md_remove(cell, 'tags', 'level_intermediate')
          } else {
            md_remove(cell, 'tags', 'level_basic')
            md_insert(cell, 'tags', 'level_intermediate')
            md_remove(cell, 'tags', 'level_advanced')
          }
          break
        case 'advanced':
          if (md_has(cell, 'tags', 'level_advanced')) {
            md_remove(cell, 'tags', 'level_advanced')
          } else {
            md_remove(cell, 'tags', 'level_basic')
            md_remove(cell, 'tags', 'level_intermediate')
            md_insert(cell, 'tags', 'level_advanced')
          }
          break
        default:
          md_remove(cell, 'tags', 'level_basic')
          md_remove(cell, 'tags', 'level_intermediate')
          md_remove(cell, 'tags', 'level_advanced')
      }
    }

    const toggle_level = (level: string) => {
      const notebook = notebookTracker.currentWidget?.content
      if (notebook === undefined) { return }
      const activeCell = notebook.activeCell
      if (activeCell === null) { return }
      cell_toggle_level(activeCell, level)
    }

    let command

    for (const [level, key] of [
      ['basic', 'Ctrl X'],
      ['intermediate', 'Ctrl Y'],
      ['advanced', 'Ctrl Z'],
    ]) {
      command = `courselevels:toggle-level-${level}`
      app.commands.addCommand(command, {
        label: `toggle ${level} level`,
        execute: () => toggle_level(level)
      })
      palette.addItem({ command, category: 'CourseLevels' })
      app.commands.addKeyBinding({ command, keys: [key], selector: '.jp-Notebook' })
    }


    const toggle_frame = () => {
      const notebook = notebookTracker.currentWidget?.content
      if (notebook === undefined) { return }
      const activeCell = notebook.activeCell
      if (activeCell === null) { return }
      if (md_has(activeCell, 'tags', 'framed_cell')) {
        md_remove(activeCell, 'tags', 'framed_cell')
      } else {
        md_insert(activeCell, 'tags', 'framed_cell')
      }
    }

    command = 'courselevels:toggle-frame'
    app.commands.addCommand(command, {
      label: 'toggle frame',
      execute: () => toggle_frame()
    })
    palette.addItem({ command, category: 'CourseLevels' })
    app.commands.addKeyBinding({ command, keys: ['Ctrl M'], selector: '.jp-Notebook' })



    const toggle_licence = () => {
      const notebook = notebookTracker.currentWidget?.content
      if (notebook === undefined) { return }
      const activeCell = notebook.activeCell
      if (activeCell === null) { return }
      if (md_has(activeCell, 'tags', 'licence')) {
        md_remove(activeCell, 'tags', 'licence')
      } else {
        md_insert(activeCell, 'tags', 'licence')
      }
    }

    command = 'courselevels:toggle-licence'
    app.commands.addCommand(command, {
      label: 'toggle licence',
      execute: () => toggle_licence()
    })
    palette.addItem({ command, category: 'CourseLevels' })
    app.commands.addKeyBinding({ command, keys: ['Ctrl L'], selector: '.jp-Notebook' })

    // the buttons in the toolbar

    // compute where to insert them
    let spacer = panel.toolbar.children.find((item) => item.className === 'jp-Toolbar-spacer')
    let index = panel.toolbar.children.indexOf(spacer) + 1

    class BasicButton implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
      createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        const button = new ToolbarButton({
          className: 'courselevels-button',
          iconClass: 'far fa-hand-pointer',
          onClick: () => toggle_level('basic'),
          tooltip: 'Toggle basic level',
        })
        console.log(panel.toolbar)
        panel.toolbar.insertItem(index++, 'basicLevel', button)
        return new DisposableDelegate(() => {
          button.dispose()
        })
      }
    }
    app.docRegistry.addWidgetExtension('Notebook', new BasicButton())

    class IntermediateButton implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
      createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        const button = new ToolbarButton({
          className: 'courselevels-button',
          iconClass: 'far fa-hand-peace',
          onClick: () => toggle_level('intermediate'),
          tooltip: 'Toggle intermediate level',
        })
        panel.toolbar.insertItem(index++, 'intermediateLevel', button)
        return new DisposableDelegate(() => {
          button.dispose()
        })
      }
    }
    app.docRegistry.addWidgetExtension('Notebook', new IntermediateButton())

    class AdvancedButton implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
      createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        const button = new ToolbarButton({
          className: 'courselevels-button',
          iconClass: 'far fa-hand-spock',
          onClick: () => toggle_level('advanced'),
          tooltip: 'Toggle advanced level',
        })
        panel.toolbar.insertItem(index++, 'advancedLevel', button)
        return new DisposableDelegate(() => {
          button.dispose()
        })
      }
    }
    app.docRegistry.addWidgetExtension('Notebook', new AdvancedButton())

    class FrameButton implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
      createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        const button = new ToolbarButton({
          className: 'courselevels-button',
          iconClass: 'fas fa-crop-alt',
          onClick: () => toggle_frame(),
          tooltip: 'Toggle frame around cell',
        })
        panel.toolbar.insertItem(index++, 'frameLevel', button)
        return new DisposableDelegate(() => {
          button.dispose()
        })
      }
    }
    app.docRegistry.addWidgetExtension('Notebook', new FrameButton())
  }
}

export default plugin

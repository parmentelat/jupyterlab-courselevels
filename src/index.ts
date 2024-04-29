/*
 * for attaching keybindings later on, see
 * https://towardsdatascience.com/how-to-customize-jupyterlab-keyboard-shortcuts-72321f73753d
 */

/* eslint-disable prettier/prettier */

import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'
import { ICommandPalette } from '@jupyterlab/apputils'
import {
  INotebookTracker,
  NotebookPanel,
  INotebookModel
} from '@jupyterlab/notebook'
import { Cell } from '@jupyterlab/cells'
import { ISettingRegistry } from '@jupyterlab/settingregistry'

import { IDisposable, DisposableDelegate } from '@lumino/disposable'
import { DocumentRegistry } from '@jupyterlab/docregistry'
import { ToolbarButton } from '@jupyterlab/apputils'

import {
  md_toggle,
  md_toggle_multi,
} from 'jupyterlab-celltagsclasses'
import { Scope, apply_on_cells } from 'jupyterlab-celltagsclasses'

const PLUGIN_ID = 'jupyterlab-courselevels:plugin'

const ALL_LEVELS = ['basic', 'intermediate', 'advanced']

const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker, ISettingRegistry],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    notebookTracker: INotebookTracker,
    settingRegistry: ISettingRegistry
  ) => {
    console.log('extension jupyterlab-courselevels is activating')
    // https://lumino.readthedocs.io/en/1.x/api/commands/interfaces/commandregistry.ikeybindingoptions.html
    // The supported modifiers are: Accel, Alt, Cmd, Ctrl, and Shift. The Accel
    // modifier is translated to Cmd on Mac and Ctrl on all other platforms. The
    // Cmd modifier is ignored on non-Mac platforms.
    // Alt is option on mac

    let [show_level_buttons] = [false]

    const ALL_FULL_LEVELS = ALL_LEVELS.map(level => `level_${level}`)

    const cell_toggle_level = (cell: Cell, level: string): void => {
      const full_level = `level_${level}`
      return md_toggle_multi(cell, 'tags', full_level, ALL_FULL_LEVELS)
    }

    const toggle_level = (level: string) => {
      apply_on_cells(notebookTracker, Scope.Multiple, (cell: Cell) => {
        cell_toggle_level(cell, level)
      })
    }

    let command

    for (const [level, key] of [
      ['basic', 'Ctrl X'],
      ['intermediate', 'Ctrl Y'],
      ['advanced', 'Ctrl Z']
    ]) {
      command = `courselevels:toggle-level-${level}`
      app.commands.addCommand(command, {
        label: `toggle ${level} level`,
        execute: () => toggle_level(level)
      })
      palette.addItem({ command, category: 'courselevels' })
      app.commands.addKeyBinding({
        command,
        keys: ['Ctrl \\', key],
        selector: '.jp-Notebook'
      })
    }

    const toggle_frame = () => {
      apply_on_cells(notebookTracker, Scope.Multiple, (cell: Cell) => {
        md_toggle(cell, 'tags', 'framed_cell')
      })
    }

    command = 'courselevels:toggle-frame'
    app.commands.addCommand(command, {
      label: 'toggle frame',
      execute: () => toggle_frame()
    })
    palette.addItem({ command, category: 'courselevels' })
    app.commands.addKeyBinding({
      command,
      keys: ['Ctrl \\', 'Ctrl M'],
      selector: '.jp-Notebook'
    })

    const toggle_licence = () => {
      apply_on_cells(notebookTracker, Scope.Active, (cell: Cell) => {
        md_toggle(cell, 'tags', 'licence')
      })
    }

    command = 'courselevels:toggle-licence'
    app.commands.addCommand(command, {
      label: 'toggle licence',
      execute: () => toggle_licence()
    })
    palette.addItem({ command, category: 'courselevels' })
    app.commands.addKeyBinding({
      command,
      keys: ['Ctrl \\', 'Ctrl L'],
      selector: '.jp-Notebook'
    })

    // the buttons in the toolbar
    const create_level_buttons = () => {
      const find_spacer = (panel: NotebookPanel): number => {
        let index = 0
        for (const child of panel.toolbar.children()) {
          if (child.node.classList.contains('jp-Toolbar-spacer')) {
            return index
          } else {
            index += 1
          }
        }
        return 0
      }

      class BasicButton
        implements
          DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
      {
        createNew(
          panel: NotebookPanel,
          context: DocumentRegistry.IContext<INotebookModel>
        ): IDisposable {
          const button = new ToolbarButton({
            className: 'courselevels-button',
            iconClass: 'far fa-hand-pointer',
            onClick: () => toggle_level('basic'),
            tooltip: 'Toggle basic level'
          })
          // compute where to insert it
          const index = find_spacer(panel)
          panel.toolbar.insertItem(index, 'basicLevel', button)
          return new DisposableDelegate(() => {
            button.dispose()
          })
        }
      }
      app.docRegistry.addWidgetExtension('Notebook', new BasicButton())

      class IntermediateButton
        implements
          DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
      {
        createNew(
          panel: NotebookPanel,
          context: DocumentRegistry.IContext<INotebookModel>
        ): IDisposable {
          const button = new ToolbarButton({
            className: 'courselevels-button',
            iconClass: 'far fa-hand-peace',
            onClick: () => toggle_level('intermediate'),
            tooltip: 'Toggle intermediate level'
          })
          // compute where to insert it
          const index = find_spacer(panel)
          panel.toolbar.insertItem(index, 'intermediateLevel', button)
          return new DisposableDelegate(() => {
            button.dispose()
          })
        }
      }
      app.docRegistry.addWidgetExtension('Notebook', new IntermediateButton())

      class AdvancedButton
        implements
          DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
      {
        createNew(
          panel: NotebookPanel,
          context: DocumentRegistry.IContext<INotebookModel>
        ): IDisposable {
          const button = new ToolbarButton({
            className: 'courselevels-button',
            iconClass: 'far fa-hand-spock',
            onClick: () => toggle_level('advanced'),
            tooltip: 'Toggle advanced level'
          })
          // compute where to insert it
          const index = find_spacer(panel)
          panel.toolbar.insertItem(index, 'advancedLevel', button)
          return new DisposableDelegate(() => {
            button.dispose()
          })
        }
      }
      app.docRegistry.addWidgetExtension('Notebook', new AdvancedButton())

      class FrameButton
        implements
          DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
      {
        createNew(
          panel: NotebookPanel,
          context: DocumentRegistry.IContext<INotebookModel>
        ): IDisposable {
          const button = new ToolbarButton({
            className: 'courselevels-button',
            iconClass: 'fas fa-crop-alt',
            onClick: () => toggle_frame(),
            tooltip: 'Toggle frame around cell'
          })
          // compute where to insert it
          const index = find_spacer(panel)
          panel.toolbar.insertItem(index, 'frameLevel', button)
          return new DisposableDelegate(() => {
            button.dispose()
          })
        }
      }
      app.docRegistry.addWidgetExtension('Notebook', new FrameButton())
    }

    // load settings and create buttons if requested
    function loadSetting(setting: ISettingRegistry.ISettings): void {
      // Read the settings and convert to the correct type
      show_level_buttons = setting.get('show_level_buttons')
        .composite as boolean

      console.log(
        `jupyterlab-courselevels extension: show_level_buttons is set to ${show_level_buttons}`
      )
      if (show_level_buttons) {
        create_level_buttons()
      }
    }

    // but do it only after the app has started
    Promise.all([app.restored, settingRegistry.load(PLUGIN_ID)]).then(
      ([_, setting]) => {
        loadSetting(setting)
        setting.changed.connect(loadSetting)
      }
    )
  }
}

export default plugin

# jupyterlab_tpt

[![Github Actions Status](https://github.com/parmentelat/jupyterlab-tpt/workflows/Build/badge.svg)](https://github.com/parmentelat/jupyterlab-tpt/actions/workflows/build.yml)
My custom tweaks for using JLAB

## Requirements

- JupyterLab >= 4.0.0
- jupyterlab-myst

## Install

To install the extension, execute:

```bash
pip install jupyterlab_tpt
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_tpt
```

## misc keystrokes

Remember that Alt = Option on the mac

| keystroke | command | what |
|-:|:-:|:-|
| Alt-Cmd-9 | `convenience:hide-input` | hide input on selected cells |
| Ctrl-Alt-9 | `convenience:show-input` | show input on selected cells |
| Alt-Cmd-8 | `convenience:hide-input-all-samples` | hide input on all code cells with `tools.sample_from` |
| Ctrl-Alt-8 | `convenience:show-input-all-samples` | hide input on all code cells with `tools.sample_from` |
| Ctrl-0 | `convenience:section-level-0` | remove section header (#s) |
| Ctrl-1 | `convenience:section-level-1` | set as section 1 header |
| Ctrl-2 |
| Ctrl-3 |
| Ctrl-4 | `convenience:section-level-4` | set as section 4 header |
| Ctrl-e | `convenience:unrender-all-markdown` | unrender all markdown cells |
| Ctrl-w | `notebook:render-all-markdown` | render all markdown cells |
| u | `notebook:move-cell-up` |
| d | `notebook:move-cell-down` |

## `sync_cell_tags_as_css_classes`

each cell has its widget (the DOM element) classes kept in sync in terms of the cell's tags;
for example, after using 'Alt-Cmd-9', the current cell will have class `cell-tag-hide-input` added

for the record, in nb-courselevels - i.e. in the classic notebook - we had set `data-tag-basic=true`; 
it does not matter much if we don't follow the same convention here

## courselevels

still TODO

| keystroke | command | what |
|-:|:-:|:-|
| ctrl-x | `courselevels:toggle-basic` |
| ctrl-y | `courselevels:toggle-intermediate` |
| ctrl-z | `courselevels:toggle-advanced` |
| ???    | `courselevels:toggle-frame` |
|||
| ???    | remove-empty-tags |

## Development

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_tpt directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_tpt
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-tpt` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)

# My notes

* on using signals
  <https://github.com/jupyterlab/extension-examples/tree/master/signals>

* a very useful example of arming callbacks on changes
  // https://discourse.jupyter.org/t/how-to-get-output-model-for-a-given-cell-in-a-jupyterlab-extension/11342/6

* waiting for a notebook context to be ready
  ```js
  notebookContext: DocumentRegistry.IContext<INotebookModel>
  notebookContext.ready.then(() => {
    /*
     * The order of operations here is key. First, create a model that contains a log of
     * executed cells and the state of the gather UI.
     */
    let notebookModel = notebookContext.model;
    ...
  })
  ```

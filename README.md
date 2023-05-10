# jupyterlab_courselevels

[![Github Actions Status](https://github.com/parmentelat/jupyterlab-courselevels/workflows/Build/badge.svg)](https://github.com/parmentelat/jupyterlab-courselevels/actions/workflows/build.yml)
JupyterLab extension to display cells in colors based on their intended audience level; the color codes follows the logic of ski tracks

- green : basic - all students should know that
- blue : intermediate - if you want to dig a little more
- red : advanced - for the geeks

in addition some cells may show up with a surrounding frame, to emphasize the course structure

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_courselevels
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_courselevels
```

## misc commands

| command | 
|:-:|
| `courselevels:toggle-basic` |
| `courselevels:toggle-intermediate` |
| `courselevels:toggle-advanced` |
| `courselevels:toggle-frame` |
| `courselevels:clean-metadata` |

### persistence

this is done by adding the following tags in each cell

* `level_basic`
* `level_intermediate`
* `level_advanced`
* `framed_cell`

### rendering

for the record, in nb-courselevels - i.e. in the classic notebook - we had added e.g.
`data-tag-basic=true` in the DOM element; here we rely on the `jupyterlab-celltagsclasses`
extension, which will instead set the `cell-tag-level_basic` class, but it does not
matter that we don't use the same means here

## Development

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_courselevels directory
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
pip uninstall jupyterlab_courselevels
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-courselevels` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)

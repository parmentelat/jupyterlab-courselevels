---
celltoolbar: Edit Metadata
jupytext:
  cell_metadata_filter: all,-hidden,-heading_collapsed,-run_control,-trusted
  formats: md:myst
  notebook_metadata_filter: all,-language_info,-toc,-jupytext.text_representation.jupytext_version,-jupytext.text_representation.format_version
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
nbhosting:
  title: React apps basics
rise:
  autolaunch: true
  slideNumber: c/t
  start_slideshow_at: selected
  theme: sky
  transition: cube
---

+++ {"slideshow": {"slide_type": "-"}, "user_expressions": []}

Licence CC BY-NC-ND, Thierry Parmentelat

+++ {"user_expressions": []}

# purpose

playing with the various ways to implement:

* hide content, either for
  * hiding code cell input
  * make markdown fragments collapsible

* and regular admonitions like primarily *note*s  
  which btw can also be made collapsible

and hopefully all this should work in the following contexts

* jupyter book output, which is now our primary output medium
* classic notebook, which although it is almost deprecated, remains our main editing tool
* jlab, but apparently this is mostly a hopeless goal

+++ {"tags": [], "user_expressions": []}

## references

* jbook: <https://jupyterbook.org/en/stable/interactive/hiding.html>
* myst: <https://myst-tools.org/docs/spec/admonitions>

+++ {"user_expressions": []}

## collapsable

+++ {"user_expressions": []}

### code cells

the next code cell is marked as

1. `metadata.hide_input=true`
1. and metadata.tags contains 'hide-input'

* because of (1) the cell input will not show under nbclassic  
  this requires the jupyter contrib extensions installed, and the hide-input extension enabled
* thanks to (2) the jb HTML output will come as a collapsible
* however under jupyter lab **the code cell input is still visible**

+++ {"user_expressions": []}

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ hide-input cell below

```{code-cell} ipython3
:hide_input: true
:tags: [hide-input]

# this text whould be hidden
print("should show the output but not the code")
```

+++ {"user_expressions": []}

↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ hide-input cell above

+++ {"user_expressions": []}

## admonitions

```{code-cell} ipython3
# this is the required piece
%pip show jupyterlab-myst
```

+++ {"user_expressions": []}

here is an simple untagged admonition with the `dropdown` class:

```{admonition} Click the button to reveal!
:class: dropdown
Some hidden toggle content!
```

+++ {"tags": [], "user_expressions": []}

```{admonition} without the dropdown class
this is a regular *admonition* with a custom title  
not sure how to change the color then
```

+++ {"user_expressions": []}

```{tip} 
1/10 Let's give readers a helpful hint! - this one uses ```
```

+++ {"user_expressions": []}

:::{note}
2/10 note: you can use either ``` or :::
:::

+++ {"user_expressions": []}

```{attention}
3/10 let us try this
```

+++ {"user_expressions": []}

```{caution}
4/10 let us try this
```

+++ {"user_expressions": []}

```{danger}
5/10 let us try this
```

+++ {"user_expressions": []}

```{error}
6/10 let us try this
```

+++ {"user_expressions": []}

```{hint}
7/10 let us try this
```

+++ {"user_expressions": []}

```{important}
8/10 let us try this
```

+++ {"tags": [], "user_expressions": []}

```{seealso}
9/10 let us try this
```

+++ {"user_expressions": []}

```{warning}
10/10 let us try this
```

+++ {"tags": [], "user_expressions": []}

:::{danger} with class dropdown
:class: dropdown
note: you can use either ``` or :::
:::

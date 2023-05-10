# ---
# jupyter:
#   jupytext:
#     text_representation:
#       extension: .py
#       format_name: percent
#       format_version: '1.3'
#       jupytext_version: 1.14.5
#   kernelspec:
#     display_name: Python 3 (ipykernel)
#     language: python
#     name: python3
# ---

# %% [markdown]
# # header 1

# %% [markdown] user_expressions=[]
# text cell 1

# %% [markdown] hide_input=false user_expressions=[]
# ## header 2

# %% [markdown] user_expressions=[]
# text cell 2

# %% hide_input=false
# a code cell 1
print('hello')


# %% [markdown] hide_input=false user_expressions=[]
# ## header 2 again

# %% hide_input=false
# and a code cell 2

# %% [markdown] hide_input=false user_expressions=[]
# ### header 3

# %% [markdown] user_expressions=[]
# text cell 3

# %% [markdown] hide_input=false slideshow={"slide_type": "slide"} user_expressions=[]
# #### and a header 4

# %% [markdown] user_expressions=[]
# text cell 4

# %% tags=["hide-input"] hide_input=true
# this cell should get hide-input with option-command 8 even if not active

class Foo: pass
tools = Foo()
tools.sample_from = print

a, b = 100, 200

tools.sample_from(12, f"{a=} + {b=} = {a+b=}")

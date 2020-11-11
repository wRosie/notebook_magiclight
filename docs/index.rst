.. notebook_magiclight documentation master file, created by
   sphinx-quickstart on Thu Nov  5 22:30:17 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to notebook_magiclight's documentation!
===============================================
Getting Started
===============
To get started, clone the repo to your favorite spot and install the extension::

   jupyter nbextension install /path_to_the_repo/notebook_magiclight

Then you will have to enable the extension by::

   jupyter nbextension enable notebook_magiclight/index

And you are good to go! No more ugly magic cells!

Code Documentation
==================
* Functions

.. js:autofunction:: findMagic
.. js:autofunction:: searchForCodeMirrorMode
.. js:autofunction:: changeHighlight
.. js:autofunction:: initialize
.. js:autofunction:: load_ipython_extension

.. toctree::
   :maxdepth: 2

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

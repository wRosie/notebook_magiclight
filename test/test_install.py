import os
from os.path import basename, join as pjoin
from notebook import nbextensions
from notebook.nbextensions import (install_nbextension, check_nbextension,
    enable_nbextension, disable_nbextension,
    install_nbextension_python, uninstall_nbextension_python,
    enable_nbextension_python, disable_nbextension_python, _get_config_dir,
    validate_nbextension, validate_nbextension_python
)

def test_install_nbextension():
    res = install_nbextension('..')
    assert (res is not None)

def test_check():
    installed = check_nbextension(['notebook_magiclight'], user=False)
    assert (installed)


def check_enable():
    res = enable_nbextension(section='notebook',
                               require='notebook_magiclight/index')
    print(res)

def check_disable():
    res = disable_nbextension(section='notebook',
                        require='notebook_magiclight/index')
    print(res)

test_install_nbextension()
test_check()
#check_disable()
#check_enable()

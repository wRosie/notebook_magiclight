#coding=utf-8

import os
from os.path import basename, join as pjoin
from notebook import nbextensions
from notebook.nbextensions import (install_nbextension, check_nbextension,
    enable_nbextension, disable_nbextension, _get_config_dir,
    validate_nbextension
)
from ipython_genutils import py3compat
from ipython_genutils.tempdir import TemporaryDirectory

from notebook.config_manager import BaseJSONConfigManager

tempdirs = []


def tempdir():
    td = TemporaryDirectory()
    tempdirs.append(td)
    return py3compat.cast_unicode(td.name)


test_dir = tempdir()
data_dir = os.path.join(test_dir, 'data')
system_data_dir = os.path.join(test_dir, 'system_data')
system_nbext = os.path.join(system_data_dir, 'nbextensions')

# def assert_dir_exists(path):
#     if not os.path.exists(path):
#         do_exist = os.listdir(os.path.dirname(path))
#         fail(u"%s should exist (found %s)" % (path, do_exist))

# def assert_installed(relative_path, user=False):
#     if user:
#         nbext = pjoin(data_dir, u'nbextensions')
#     else:
#         nbext = system_nbext
#     assert_dir_exists(pjoin(nbext, relative_path))


def test_install_nbextension():
    res = install_nbextension('..')
    assert (res is not None)

# def test_check_installed():
#     installed = check_nbextension(['notebook_magiclight'], user=False)
#     assert (installed)


def test_check_enable():
    enable_nbextension(section='notebook',
                               require='notebook_magiclight/index')
    config_dir = os.path.join(_get_config_dir(user=True), 'nbconfig')
    cm = BaseJSONConfigManager(config_dir=config_dir)
    enabled = cm.get('notebook').get('load_extensions',
                                     {}).get('notebook_magiclight/index',
                                             False)
    assert enabled

def test_check_disable():
    test_check_enable()
    disable_nbextension(section='notebook',
                        require='notebook_magiclight/index')
    config_dir = os.path.join(_get_config_dir(user=True), 'nbconfig')
    cm = BaseJSONConfigManager(config_dir=config_dir)
    enabled = cm.get('notebook').get('load_extensions', {}).get(u'ƒ', False)
    assert not enabled

# def  test_check_validate():
#     test_install_nbextension()
#     test_check_enable()
#     res = validate_nbextension('notebook_magiclight/index')
#     assert (res == [])


#coding=utf-8

import os
from os.path import basename, join as pjoin
from notebook import nbextensions
from notebook.nbextensions import (install_nbextension, check_nbextension,
    enable_nbextension, disable_nbextension, _get_config_dir,
    validate_nbextension
)

from notebook.config_manager import BaseJSONConfigManager


def test_install_nbextension():
    res = install_nbextension('..')
    assert (res is not None)

def test_check_installed():
    installed = check_nbextension(['notebook_magiclight'], user=False)
    assert (installed)


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

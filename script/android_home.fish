#!/usr/bin/env fish

set -x ANDROID_HOME ~/Library/Android/sdk
set -x PATH $PATH $ANDROID_HOME/emulator
set -x PATH $PATH $ANDROID_HOME/tools
set -x PATH $PATH $ANDROID_HOME/tools/bin
set -x PATH $PATH $ANDROID_HOME/platform-tools

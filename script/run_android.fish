#!/usr/bin/env fish

set -x ENVFILE node_modules/diablo/config/.local.env

source script/android_home.fish

react-native run-android

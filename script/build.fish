#!/usr/bin/env fish

if test $CONFIGURATION = "Release"
  if not test -e ./script/common.fish
    echo "Run this script under project root directory."
    exit
  end

  source ./script/common.fish

  set -l info_plist (get_info_plist)
  set -l new_bundle_version (math (defaults read $info_plist CFBundleVersion) + 1)
  plutil -replace CFBundleVersion -string $new_bundle_version $info_plist
  git commit $info_plist -m "bump build: $new_bundle_version"

  plutil -remove NSAppTransportSecurity $info_plist
end

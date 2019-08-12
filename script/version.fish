#!/usr/bin/env fish

if not test -e ./script/common.fish
  echo "Run this script under project root directory."
  exit
end

source ./script/common.fish

set -l info_plist (get_info_plist)
read --prompt-str "Please input the new version number: " -l bundle_version
plutil -replace CFBundleShortVersionString -string $bundle_version $info_plist
git commit $info_plist -m "bump version: $bundle_version"

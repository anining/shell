#!/usr/bin/env fish

if test $CONFIGURATION = "Release"
  if not test -e ./script/common.fish
    echo "Run this script under project root directory."
    exit
  end

  source ./script/common.fish

  set -l info_plist (get_info_plist)
  git checkout $info_plist
end

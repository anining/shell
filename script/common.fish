function get_info_plist
  realpath ./ios/mephistopheles/Info.plist
end

function get_plist_key
  defaults read (get_info_plist) $argv[1]
end

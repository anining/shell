import * as U from "karet.util"

import * as C from "./common"

export default function loadResources() {
  const { categories, quotes, bgs, layouts, fonts } = U.destructure(U.view("resource", C.gstate))

  U.holding(() => {
    categories.set(C.getCategories())
    quotes.set(C.getQuotes())
    bgs.set(C.getBgs())
    layouts.set(C.getLayouts())
    fonts.set(C.getFonts())
  })
}

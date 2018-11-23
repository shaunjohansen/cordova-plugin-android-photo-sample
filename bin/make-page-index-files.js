#!/usr/bin/env node

//
// Generates page index.js files that asynchronously load the modules on access.
//

const fs = require('fs')

const PAGES_FOLDER = 'src/pages'

const dirs = fs.readdirSync(PAGES_FOLDER)
dirs.forEach(function(dir) {
  console.log('generating page:', dir)
  const indexJsFilename = `${PAGES_FOLDER}/${dir}/index.js`
  const indexJsContent = makeIndexJs(dir)
  try {
    fs.writeFileSync(indexJsFilename, indexJsContent)
  } catch (exception) {
    console.log('could not write to', indexJsFilename, exception)
  }
})

function makeIndexJs(pageName) {
  return `//
// Loads the page module asynchronously on initial visit.
//
// Generated with 'npm run make-page-index-files'
//

import Bundle from 'components/Bundle'
import React from 'react'

const ${pageName} = (props) => (
  <Bundle load={import('./${pageName}.js')}>
    {(${pageName}) => <${pageName} {...props}/>}
  </Bundle>
)

export default ${pageName}
`
}

const fs = require('fs')

const main = () => {
  if (fs.existsSync('./.env')) {
    return
  }

  fs.writeFileSync(
    './.env',
    `GH_TOKEN_REST=${process.env.GH_TOKEN_REST}\n
GH_TOKEN_GRAPHQL=${process.env.GH_TOKEN_GRAPHQL}
    `
  )
}

main()

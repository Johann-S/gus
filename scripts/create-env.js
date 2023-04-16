const fs = require('fs')

const main = () => {
  if (fs.existsSync('./.env')) {
    return
  }

  fs.writeFileSync('./.env', `GH_TOKEN=${process.env.GH_TOKEN}\n`)
}

main()

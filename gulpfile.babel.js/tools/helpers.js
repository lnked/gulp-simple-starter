module.exports.parseArguments = argv => {
  const data = {}

  argv.map((item, index) => {
    if (item.substring(0, 2) === '--') {
      const name = item.substring(2)
      const value = argv[index + 1] || true

      data[name] = value
    }
  })

  return data
}

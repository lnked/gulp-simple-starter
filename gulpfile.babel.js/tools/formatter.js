module.exports.formatter = (params, stringify = false) => {
  const length = Object.keys(params).length

  if (length && stringify) {
    for (const x in params) {
      params[x] = params[x]
      // params[x] = JSON.stringify(params[x])
    }
  }

  return params
}

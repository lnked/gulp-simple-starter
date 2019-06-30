import store from 'store';
// import expirePlugin from 'store/plugins/expire'
// store.addPlugin(expirePlugin)

// // Example plugin that stores a version history of every value
// var versionHistoryPlugin = function() {
//   var historyStore = this.namespace('history')
//   return {
//     set: function(super_fn, key, value) {
//       var history = historyStore.get(key) || []
//       history.push(value)
//       historyStore.set(key, history)
//       return super_fn()
//     },
//     getHistory: function(key) {
//       return historyStore.get(key)
//     }
//   }
// }
// store.addPlugin(versionHistoryPlugin)
// store.set('foo', 'bar 1')
// store.set('foo', 'bar 2')
// store.getHistory('foo') == ['bar 1', 'bar 2']

// var storage = {
// name: 'myStorage',
// read: function(key) { ... },
// write: function(key, value) { ... },
// each: function(fn) { ... },
// remove: function(key) { ... },
// clearAll: function() { ... }
// }
// var store = require('store').createStore(storage)

// Store current user
store.set('user', { name:'Marcus' })

// Get current user
store.get('user')

// Remove current user
store.remove('user')

// Clear all keys
store.clearAll()

// Loop over all stored values
store.each(function(value, key) {
  console.log(key, '==', value)
})

store.set('user', { name:'Marcus' })
store.get('user').name == 'Marcus'

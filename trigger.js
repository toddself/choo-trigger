function trigger (store, emitter) {
  emitter.on('trigger:create', function (opts) {
    opts = opts || {}
    emitter.once(opts.on, function () {
      emitter.emit(opts.event, opts.data)
    })
  })
}

module.exports = trigger

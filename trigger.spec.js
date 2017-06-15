const test = require('tape')
const nanobus = require('nanobus')

const trigger = require('./')

test('trigger', (t) => {
  t.plan(4)
  const bus = nanobus()
  const triggerOpts = {
    foo: 'bar'
  }
  let i = 0
  trigger({}, bus)

  bus.on('trigger:test', (opts) => {
    ++i
    t.equal(i, 1, 'first')
    t.deepEqual(opts, triggerOpts, 'got opts')
  })

  bus.on('trigger:another', (opts) => {
    ++i
    t.equal(i, 2, 'second')
    t.pass('another trigger')
  })

  bus.emit('trigger:create', {on: 'trigger:run', event: 'trigger:test', data: triggerOpts})
  bus.emit('trigger:create', {on: 'trigger:test', event: 'trigger:another'})
  bus.emit('trigger:run')
})

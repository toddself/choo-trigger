# choo-trigger

Set up an event to be emitter after another event has been emitted. This allows
you to chain events in series from a view to create ad-hoc workflows for your
application. Triggers are attached via `.once` so after they are fired, they are
removed from the emitter.

## API
#### `emit('trigger:create', opts:object(key:string))`
Create a listener using `.once` for a specific event, and then fire an event
in response to it.

* `opts`:
  * `on:string` - event name to listen for
  * `event:string` - event name to fire
  * `data:any` - data to include with the event being emitted


## Usage
```js
var choo = require('choo')
var trigger = require('choo-trigger')
var app = choo()
app.use(trigger)
app.use(store)
app.route('/', main)
document.body.appendChild(app.start())

function store (state, emitter) {
  state = {
    trigger: false,
    hello: 'no one'
  }

  emitter.on('runTrigger', (opts) => {
    state.trigger = true
    state.hello = opts.hello
    emitter.emit('render')
  })
}

function main (state, emit) {
  emit('trigger:create', {on: 'go', event: 'runTrigger', data: {hello: 'world'}})

  return html`<div>
    triggered? ${state.trigger}<br>
    hello, ${state.hello}
    <button onclick=${run}>send trigger!</button>
  </div>`

  function run (evt) {
    evt.preventDefault()
    emit('go')
  }
}
```

## License
Copyright © 2017 Todd Kennedy, Apache-2.0 Licensed

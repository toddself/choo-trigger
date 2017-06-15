# choo-trigger

<div align="center">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/choo-trigger">
    <img src="https://img.shields.io/npm/v/choo-trigger.svg?style=flat-square"
      alt="NPM version" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/toddself/choo-trigger">
    <img src="https://img.shields.io/travis/toddself/choo-trigger/master.svg?style=flat-square"
      alt="Build Status" />
  </a>
  <!-- Standard -->
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
</div>

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

import { toHtml, bindAll, clearChildren, append } from './utils'

class Component {
  constructor(props) {
    this.state = {}
    this.props = props || {}
    this.host = null

    bindAll(this, 'updateState', 'update')
  }

  _render() {
    const html = this.render()

    if (!html && this.host) {
      return this.host
    }

    if (typeof html === 'string') {
      return append(clearChildren(this.host), toHtml(html))
    }
    return append(clearChildren(this.host), html)
  }

  get name() {
    return this.constructor.name
  }

  // eslint-disable-next-line
  onBeforeUpdate(nextProps) {}

  // eslint-disable-next-line
  onAfterUpdate(prevProps) {}

  onBeforeUnmount() {}

  unmount() {
    this.onBeforeUnmount()
  }

  update(nextProps) {
    const prevProps = this.props

    this.onBeforeUpdate(nextProps)
    this.props = nextProps

    const rendered = this._render()

    this.onAfterUpdate(prevProps)

    return rendered
  }

  updateState(state) {
    const nextState = Object.assign({}, this.state, state)

    this.state = nextState
    this._render()

    return nextState
  }

  render() {}
}

export default Component

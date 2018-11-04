import React, { Component } from 'react';
import './monsterForm.css';

class MonsterForm extends Component {

  constructor(props) {
    super(props)
    this.sendData = this.props.sendData

    this.propLabels = ['intelligence', 'speed', 'power']
    this.submit = this.submit.bind(this)

    this.state = {
      error: false,
      props: {
        intelligence: 0,
        speed: 0,
        power: 0,
        tooMuch: false
      },
    }
  }

  submit(e) {
    const {_name, _def} = this.refs
    const {state} = this
    let nextState

    e.preventDefault()

    if (state.props.tooMuch) {
      nextState = {
        ...state,
        error: true
      }
    } else {
      nextState = {
        error: false,
        props: {
          intelligence: 0,
          speed: 0,
          power: 0,
          tooMuch: false
        },
      }
      _name.value = ""
      _def.value = ""

      this.sendData({
        name: _name.value,
        def: _def.value,
        intelligence: state.props.intelligence,
        speed: state.props.speed,
        power: state.props.power
      })
    }

    this.setState({
      ...nextState
    }) 
  }

  setError(value) {
    const {state} = this
    this.setState({
      ...state,
      error: value
    })
  }

  setProp(label, value) {
    const {state} = this
    const {props} = state

    let nextProps = {
      ...props,
      [label]: value
    }

    let count = 0
    for (let key in nextProps) {
      if (typeof nextProps[key] === 'number') count += nextProps[key]
    }

    nextProps = {
      ...nextProps,
      tooMuch: count > 11
    }

    this.setState({
      ...state,
      props: nextProps
    })
  }

  addSelectForm(label, key, length) {
    return (
      <div className="monster-form__select-holder" key={key}>
        <div className="monster-form__select-label">{label}</div>
        <select className="monster-form__select" ref={`_${label.toLowerCase()}`}>
          {new Array(length).fill(0).map((elem, i) =>
            <option value={i}
              key={i} >
                {i}
              </option>
            )
          }
        </select>
      </div>
    )
  }

  addProp(label, key, length) {
    const {props} = this.state
    return (
      <div className="monster-form__prop-holder" key={key}>
        <div className="monster-form__prop-label">{label[0].toUpperCase() + label.substring(1)}</div>
        <div className="monster-form__circles-container">
          {new Array(length).fill(0).map((elem, i) =>
            <div
              key={i}
              onClick={() => this.setProp(label, i + 1)}
              className={this.getPropClassName(label, i)} >
            </div>
            )
          }
        </div>
      </div>
    )
  }

  getPropClassName(label, i) {
    const {props} = this.state
    const {tooMuch} = props
    const value = props[label]

    let className = "monster-form__circle"
    if (i < value) {
      className += " monster-form__circle-fill"
    }
    if (tooMuch) {
      className += " monster-form__circle-error"
    }
    return className
  }

  renderTooMuchElem() {
    const {state} = this
    const {props} = state
    return (
      props.tooMuch ? <div className="monster-form__props-too-much">Too much</div> : null
    )
  }

  renderButton() {
    return (
      <button className="monster-form__button monster-form__button-add">ADD</button>
    )
  }

  renderProps() {
    return (
      <div className="monster-form__props">
        { this.propLabels.map((label, i) => this.addProp(label, i, 7)) }
      </div>
    )
  }

  renderDef() {
    return (
      <textarea ref='_def'
        className="monster-form__textarea-def"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum..."
        rows="5" required />
    )
  }

  renderName() {
    return (
      <input ref="_name"
        className="monster-form__input-name"
        type="text"
        placeholder="Monster's name..." required />
    )
  }

  renderForm() {
    return (
      <form className="monster-form" onSubmit={this.submit}>
        {this.renderName()}
        {this.renderDef()}
        {/* this.propLabels.map((label, i) => this.addSelectForm(label, i, 11)) */}
        {this.renderProps()}
        {this.renderTooMuchElem()}
        {this.renderButton()}
      </form>
    )
  }

  render() {
    console.warn(this.state)
    return (
      <div className="monster-form-container">
        <div className="monster-form-container__inner">
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default MonsterForm;
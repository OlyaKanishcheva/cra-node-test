import React, { Component } from 'react';

class MonsterForm extends Component {

  constructor(props) {
    super(props)

    this.selectLabels = ['Intelligence', 'Speed', 'Power']
    this.submit = this.submit.bind(this)

    this.state = {
      error: false
    }
  }

  submit(e) {
    const {_name, _def, _intelligence, _speed, _power} = this.refs
    e.preventDefault()
    if (_intelligence.value + _speed.value + _power.value > 15) {
      this.setError(true)
      return false
    }
    // alert(_intelligence.value)
    // alert(_speed.value)
    // alert(_power.value)
    _name.value = ''
    _def.value = 0
  }

  setError(value) {
    const {state} = this
    this.setState({
      ...state,
      error: value
    })
  }

  addSelectForm(label, key, length) {
    return (
      <div className="moster-form__select-holder" key={key}>
        <div className="moster-form__select-label">{label}</div>
        <select className="moster-form__select" ref={`_${label.toLowerCase()}`}>
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

  render() {
    console.warn(this.state)
    return (
      <div className="monster-form-container">
        <div className="monster-form-container__inner">
          <form className="moster-form" onSubmit={this.submit}>
            <input ref="_name"
              className="moster-form__input-name"
              type="text"
              placeholder="Monster's name..." required/>
            <textarea ref='_def'
              className="moster-form__textarea-def"
              cols="60"
              rows="5" required/>
            {this.selectLabels.map((label, i) => this.addSelectForm(label, i, 11))}
            <button>ADD</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MonsterForm;
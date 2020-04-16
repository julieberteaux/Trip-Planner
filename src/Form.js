import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      location: '',
      startDate: '',
      endDate: '',
    };

    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { location, startDate, endDate } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div class="columns is-vcentered">
          <div class="column is-4">
            <div class="field">
              <label class="label">Destination</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="location"
                  id="location"
                  placeholder="enter your next destination"
                  value={location}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Start</label>
              <div class="control">
                <input
                  class="input"
                  type="date"
                  name="startDate"
                  id="startDate"
                  placeholder="jj/mm/YYYY"
                  value={startDate}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">End</label>
              <div class="control">
                <input
                  class="input"
                  type="date"
                  name="endDate"
                  id="endDate"
                  placeholder="jj/mm/YYYY"
                  value={endDate}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div class="column has-text-centered is-2">
            <br />
            <div class="control">
              <button type="submit" class="button is-link">
                Add to my planning
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;

import React from 'react'
import { render } from 'react-dom'
import { Search } from './Search'
import { PhotoGrid } from './PhotoGrid'
import { Service } from './Service'
import { Alert } from 'react-bootstrap'

/** This is the main class for rendering all the components displayed on screen */
export class Main extends React.Component {

  constructor (props) {
    super(props)
    this.handleUpdatedValue = this.handleUpdatedValue.bind(this)
    this.state = { tags: '', errorOccured: false,}
    this.timeout = null
  }

  handleUpdatedValue (event) {
    const value = event.target.value;
    var validKeyword = !/[~`!#$%\^&*+=\-\[\]\\';/{}|\\":<>\?]/g.test(value);

    if(!validKeyword)
      {
        // Incase of an invalid keyword
        this.setState({errorOccured: true});
      }
      else {
    // Clear the timeout if it has already been set.
    clearTimeout(this.timeout)

    // Make a new timeout set to go off in 1 second
    this.timeout = setTimeout(() => {
      this.setState({tags: value, errorOccured: false})
    }, 1000)
  }
  }

  render () {
    let service = null;
    var errorMsg = null;
    var errorOccured = this.state.errorOccured;
    const tagsValue = this.state.tags;

    // Render service component only when a value is entered
    if (tagsValue !== '') {
      service = <Service val={tagsValue} />
    }
    

    if(errorOccured){
    errorMsg = <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
    <h4>Oh snap! You got an error!</h4>
    <p>
      Only valid keyword is allowed
    </p>
  </Alert>
}

    return (
      <div>
        <Search handleUpdatedValue={this.handleUpdatedValue} />
        {errorMsg}
        {service}
      </div>
    )
  }
}

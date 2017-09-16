import React from 'react'
import { render } from 'react-dom'
import { Well } from 'react-bootstrap'
require('./scss/style.scss');

/** This component displays the search box for user to enter their keywords*/
export class Search extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Well>
          <input
            type='text'
            name='search'
            placeholder='Search...'
            onKeyUp={this.props.handleUpdatedValue} />
        </Well>
      </div>

    )
  }
}

import React from 'react'
import { render } from 'react-dom'
import './Search.css'
import { Well } from 'react-bootstrap'

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

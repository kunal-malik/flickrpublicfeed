import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { SUFFIX_SMALL_240, SUFFIX_LARGE_1024, SUFFIX_SMALL_320, URLPART1, URLPART2, THIRTYPER, HUNDREDPER, PROXYURL } from './Constants'
import { PhotoGrid } from './PhotoGrid'
import { ProgressBar, Alert } from 'react-bootstrap'

/** This component calls the flickr public feed and displays the content */
export class Service extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      photos: [],
      keyword: '',
      errorOccured: false,
      errorDesc: ''
    }
  }

  /** Calling the api once component is mounted */
  componentDidMount () {
    this.callAPI(this.props.val)
  }

  /** This function is responsible for making flickr public feed api call and updating state as per results retrieved */
  callAPI (val) {
    
    const url = PROXYURL + URLPART1 + val + URLPART2 
    var id = 0

    axios.get(url).then(results => {
      
      if (results.data.items) {
        let updatedPhotos = results.data.items.map(item => ({
          id: ++id,
          src: item.media.m.replace(SUFFIX_SMALL_240, SUFFIX_SMALL_320),
          bigSrc: item.media.m.replace(SUFFIX_SMALL_240, SUFFIX_LARGE_1024),
          author: item.author.substring(item.author.indexOf('"') + 1, item.author.lastIndexOf('"')),
          tags: item.tags
        }))

        if (Object.keys(updatedPhotos).length > 0) {
          Array.prototype.sortBy = function (p) {
            return this.slice(0).sort(function (a, b) {
              return (a[p].length > b[p].length) ? 1 : (a[p].length < b[p].length) ? -1 : 0
            })
          }

          updatedPhotos = updatedPhotos.sortBy('tags')

          this.setState({photos: updatedPhotos, keyword: val, errorOccured: false})
        }else {
          this.setState({errorOccured: true, errorDesc: "We didn't got any matches, Please try again with another keyword"})
        }
      }else {
        this.setState({errorOccured: true, errorDesc: 'There was an issue while retrieving results, kindly clear the search and try again.'})
      }
    })
      .catch((error) => {
        this.setState({errorOccured: true, errorDesc: 'Could not connet to Flickr Public Feed.'})
      })
  }

  /** Called whenever an update is applied on this component */
  componentWillReceiveProps (nextProps) {
     if (this.props.val !== nextProps.val) {
      this.setState({photos: []})
      this.callAPI(nextProps.val)
    }
  }

  render () {
    let progress = null
    let displayGrid = null
    var errorMsg = null
    const photos = this.state.photos
    const keyword = this.state.keyword
    const errorOccured = this.state.errorOccured
    var errorDesc = this.state.errorDesc

    if (!errorOccured) {
      if (Object.keys(photos).length > 0) {
        displayGrid = <PhotoGrid photos={photos} columns={3} keyword={keyword} />
        progress = <ProgressBar now={HUNDREDPER} label={`${HUNDREDPER}%`} srOnly />
      } else {
        progress = <ProgressBar now={THIRTYPER} label={`${THIRTYPER}%`} srOnly />
      }
    } else {
      progress = <ProgressBar bsStyle='danger' now={HUNDREDPER} />
      errorMsg = <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                   <h4>Oh snap! You got an error!</h4>
                   <p>
                     {errorDesc}
                   </p>
                 </Alert>
    }
    return (
      <div>
        {progress}
        {errorMsg}
        {displayGrid}
      </div>
    )
  }
}

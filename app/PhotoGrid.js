import React from "react";
import {Label, Thumbnail} from 'react-bootstrap';
import styles from './scss/style.scss';

/** This component displays results fetched from the public feed */
export class PhotoGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullScreenImage : null,
			fullScreenImageIndex : null
        }
    }

    render() {
        return (
            <div >
                {this.getGridElements(this.props.keyword)}
                {this.getFullScreenImage(this.state.fullScreenImage)}
            </div>
        );
    }

    // It holds all the content displayed corresponding to the keyword entered in search box
    getGridElements(keyword) {
        const {photos}  = this.props;
        const classNames = [styles.imageGridItem];
        const style = {width : this.getPercentWidth() + '%'};

        return photos.map((photo, index) => (
            <div className={classNames.join(' ')}
                 style={style}
                 key={photo.id}>
                {this.getImageElement(photo, index, keyword)}
            </div>
        ));
    }

    // This function displays each image element along with tags and author details
    getImageElement = (photo, index, keyword) => {
       const classNames = [styles.imageWrapper];
        const style = {backgroundImage : `url(${photo.src})`};

        return (
            <div >
               
                <div className={classNames.join(' ')}
                     onClick={this.image_clickHandler(photo, index)}
                     style={style}>
					<a href="#">By: {photo.author}</a>
                </div>
               <LimitedTagComponent tags={photo.tags} keyword={keyword}/>
              
            </div>
        );
    };

    // To display high resolution image
    getFullScreenImage = src => {
        const classNames = src ? [styles.lightbox] : [styles.hide, styles.lightbox ];
		const {photos}  = this.props;
		return (
            <a href="#_" className={classNames.join(' ')} onClick={this.lightBox_clickHandler}>
				{photos.map((photo, index) => (
                    <div key={photo.id} >
					<img  src={photo.bigSrc} className={photo.bigSrc == src ? 'opaque' : ''}
						 onClick={photo.bigSrc == src ? this.fullScreenImage_clickHandler : null}/>
                        
                        </div>
				))}
			</a>);
    };

    // This displays high resolution image of image clicked
    image_clickHandler = (photo, index) => () => {
        this.setState({
            fullScreenImage : photo.bigSrc,
            fullScreenImageIndex : index
        })  
    };

    // Exits from full image display view if clicked outside the image
    lightBox_clickHandler = e => {
		if (e.target.tagName.toUpperCase() == 'IMG') return;
        this.setState({
            fullScreenImage : null,
			fullScreenImageIndex : null
        })
    };

    // Decides what to do once user clicks while displaying full screen image
	fullScreenImage_clickHandler = e => {
		e.stopPropagation();
		const {fullScreenImageIndex} = this.state;
		const nextPhotoIndex = this.getNextPhotoIndex(fullScreenImageIndex);
		const nextPhoto      = this.getPhoto(nextPhotoIndex);

		this.setState({
			fullScreenImage : nextPhoto ? nextPhoto.bigSrc : null,
			fullScreenImageIndex : nextPhotoIndex
		})
    };

    getPercentWidth = () => 100 / this.props.columns - 1;
    getNextPhotoIndex = currentIndex => this.props.photos.length > currentIndex + 1 ? currentIndex + 1  : 0;
    getPreviousPhotoIndex = currentIndex => currentIndex - 1 >= 0 ? currentIndex - 1  : this.props.photos.length - 1;
    getPhoto = index => this.props.photos.length > index ? this.props.photos[index] : null;
    
}

/** Limits the number of tags displayed below the image based on 'limit' parameter */
const LimitedTagComponent = ({tags=[], limit=2, keyword}) => {
    var id=0;
    var noOfTags = (tags.split(" ").length - 1);
    var list
    var useList = tags && noOfTags > limit
    if(useList){
        list = tags.split(" ").slice(0,limit)
    } else {
        list = tags.split(" ")
    }

if(!list.includes(keyword)){
    list.push(keyword);
}

    return (<div>
            {
                list.map(tag =>  <span key={++id}><TagComponent name={tag}   />&nbsp;</span>)  
            }
        </div>
        )
}

/** This is used for each tag */
const TagComponent = ({name}) => {
    if(name){
        return (       
        <Label bsStyle="info">{name}</Label>
        );
    } else {
        return false
    }
}

export default PhotoGrid
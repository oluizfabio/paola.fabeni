import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from './Image'

import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import 'react-photoswipe/lib/photoswipe.css'

export const query = graphql`
  fragment HomeGallery on MarkdownRemark {
    frontmatter {
      gallery {
        alt
        image
        title
        url
      }
    }
  }
`

export default class HomeGallery extends Component {
  state = {
    loaded: false,
    isOpen: false,
    sliderImages: [],
    index: 0
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
  }

  getImageInfo = (img, index) =>
    fetch(img.image + '-/json/')
      .then(res => res.json())
      .then(
        result => {
          const newImagesArr = [...this.state.sliderImages]
          newImagesArr[index] = {
            src: img.image,
            title: img.title,
            w: result.width,
            h: result.height
          }
          this.setState({
            sliderImages: newImagesArr
          })
          return true
        },
        error => {
          console.log(error)
          return false
        }
      )

  render() {
    const { images = [], url } = this.props
    console.log(url)
    return (
      <Fragment>
        {images && images.length > 0 && (
          <div className="Gallery">
            {images.map((image, index) => (
              <figure
                className="Gallery--Item"
                key={_kebabCase(image.alt) + '-' + index}
                onClick={() => this.isOpen(true, index)}
              >
                <div>
                  <Image
                    resolutions="small"
                    src={image.image}
                    alt={image.alt}
                  />
                </div>
                {image.title && <figcaption>{image.title}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </Fragment>
    )
  }
}

HomeGallery.propTypes = {
  images: PropTypes.array.isRequired
}

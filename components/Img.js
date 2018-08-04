/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import propTypes from 'prop-types';

class Img extends React.Component {
  static propTypes = {
    // Require the use of src and alt, only enforced by react in dev mode
    src: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired,
    alt: propTypes.string.isRequired,
    className: propTypes.string
  };

  render() {
    const { className, src, alt } = this.props;
    return <img className={className} src={src} alt={alt} />;
  }
}

export default Img;

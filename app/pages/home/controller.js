const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');

const imagesPrefix = config.assets.prefix;

/* istanbul ignore next */
exports.render = function render(req, res) {
 
/* istanbul ignore next */
  const Home = props => (
    <ImageProvider prefix={imagesPrefix}>
      <View {...props} />
    </ImageProvider> 
  )

  res.render(Home, {
    imagesPrefix
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
  });
};

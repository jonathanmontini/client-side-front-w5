/**
 * Module dependencies
 */
const React = require('react');
const View = require('./view');


exports.render = function render(req, res) {
 
  const Demo = props => <View {...props} />

  res.render(Demo, {
    
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
  });
};

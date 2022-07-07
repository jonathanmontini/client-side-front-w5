/**
 * Module dependencies
 */
const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');


const imagesPrefix = config.assets.prefix;


exports.render = function render(req, res) {

    const Demo = props => (
        <ImageProvider prefix={imagesPrefix}>
            <View {...props} />
        </ImageProvider>
    )

    res.render(Demo, {
        imagesPrefix

    });
};

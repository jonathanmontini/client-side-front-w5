require('../pages/home/styles.scss');

const React = require('react');
const hydrate = require('nordic/hydrate');
const I18n = require('nordic/i18n');
const I18nProvider = require('nordic/i18n/I18nProvider');
const ImageProvider = require('nordic/image/provider');
const HomeView = require('../pages/home/view');

const {
  imagesPrefix,
} = window.__PRELOADED_STATE__;

hydrate(
  <ImageProvider prefix={imagesPrefix}>
    <HomeView />
  </ImageProvider>,
  document.getElementById('root-app'),
);

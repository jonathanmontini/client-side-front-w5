/**
 * Styles
 */
require('../pages/home/styles.scss');

/**
 * Module dependencies
 */
const React = require('react');
const hydrate = require('nordic/hydrate');
const I18n = require('nordic/i18n');
const I18nProvider = require('nordic/i18n/I18nProvider');
const ImageProvider = require('nordic/image/provider');
const HomeView = require('../pages/home/view');

// const {
//   site,
//   translations,
//   imagesPrefix,
// } = window.__PRELOADED_STATE__;




hydrate(

      <HomeView
      />,
  document.getElementById('root-app'),
);

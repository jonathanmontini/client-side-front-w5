const React = require("react");
const ClaseView = require("../pages/clase/view");
const hydrate = require("nordic/hydrate");

const { message } = window.__PRELOADED_STATE__;

hydrate(<ClaseView message={message} />, document.getElementById("root-app"));

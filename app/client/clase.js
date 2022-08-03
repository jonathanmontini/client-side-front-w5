const React = require("react");
const ClaseView = require("../pages/clase/view");
const hydrate = require("nordic/hydrate");

hydrate(<ClaseView />, document.getElementById("root-app"));

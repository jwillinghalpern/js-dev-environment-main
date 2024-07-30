const config = require("../widget.config");

const { widgetName, insertTextFileName, insertTextVariableName, insertTextShowConfirmation, server } = config;

console.log(widgetName, insertTextFileName, '$'+insertTextVariableName,);
const open = require("open");
const path = require("path");

const insertTextFilePath = path.join(__dirname, "../", insertTextFileName + '.fmp12');
open(insertTextFilePath);

const fileUrl = `fmp://${server}/${insertTextFileName}?script=setText&param=`;

const thePath = path.join(__dirname, "../", "dist", "index.html");
const params = {
    variableName: insertTextVariableName,
    thePath,
    showConfirmation: insertTextShowConfirmation
};
const url = fileUrl + encodeURIComponent(JSON.stringify(params));

// Delay the call, so the file has time to open
setTimeout(function() {
    open(url);
}, 500);
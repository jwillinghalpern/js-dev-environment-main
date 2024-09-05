const config = require("../widget.config");
const fs = require("fs");
const child_process = require("child_process");

const { insertTextVariableName } = config;

function encodeHTMLEntities(text) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
    "\t": "&#09;",
    "\n": "&#10;",
    "\r": "&#13;",
  };

  return text.replace(/[&<>"'\t\n\r]/g, (s) => entityMap[s]);
}

const text = fs.readFileSync("dist/index.html", "utf8");

const insertTextTemplate = `
	<fmxmlsnippet type="FMObjectList">
		<Step enable="True" id="89" name="# (comment)">
			<Text>Generated ***DATE_HERE***</Text>
		</Step>
		<Step enable="True" id="61" name="Insert Text">
			<SelectAll state="True"></SelectAll>
			<Text>***TEXT_HERE***</Text>
			<Field>***VARIABLENAME_HERE***</Field>
		</Step>
	</fmxmlsnippet>`;

const varName = insertTextVariableName.startsWith("$")
  ? insertTextVariableName
  : "$" + insertTextVariableName;

const insertText = insertTextTemplate
  .replace("***DATE_HERE***", new Date().toLocaleString())
  .replace("***TEXT_HERE***", encodeHTMLEntities(text))
  .replace("***VARIABLENAME_HERE***", varName);

child_process.execSync(`echo '${insertText}' | pbcopy`);
child_process.execSync(
  `osascript -e 'set the clipboard to (do shell script "pbpaste" as «class XMSS»)'`
);

console.log(
  "\x1b[32m%s\x1b[0m",
  `🎉 The HTML text was copied to the clipboard! Go paste it into FileMaker!`
);

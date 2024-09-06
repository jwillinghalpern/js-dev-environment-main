const config = require("../widget.config");
const fs = require("fs");
const child_process = require("child_process");
const path = require("path");

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

let text;
try {
	text = fs.readFileSync("app/index.html", "utf8");
} catch (error) {
	console.error("\x1b[31m%s\x1b[0m", "❌ Error reading 'app/index.html':", error.message);
	process.exit(1); // Exit the program with a failure status code
}

const varName = insertTextVariableName.startsWith("$")
	? insertTextVariableName
	: "$" + insertTextVariableName;

const insertText = `
	<fmxmlsnippet type="FMObjectList">
		<Step enable="True" id="89" name="# (comment)">
			<Text>Generated ${new Date().toLocaleString()}</Text>
		</Step>
		<Step enable="True" id="61" name="Insert Text">
			<SelectAll state="True"></SelectAll>
			<Text>${encodeHTMLEntities(text)}</Text>
			<Field>${varName}</Field>
		</Step>
	</fmxmlsnippet>`;

// Create a temporary file path in the current working directory
const tempFilePath = path.join(process.cwd(), "temp_insert_text.txt");

try {
	fs.writeFileSync(tempFilePath, insertText);
} catch (error) {
	console.error("\x1b[31m%s\x1b[0m", "❌ Error writing to temporary file:", error.message);
	process.exit(1);
}

const escapedFilePath = tempFilePath.replace(/ /g, '\\ ');

// Read the file contents and convert the format of FM clipboard
try {
	child_process.execSync(`cat ${escapedFilePath} | pbcopy`);
	child_process.execSync(
		`osascript -e 'set the clipboard to (do shell script "pbpaste" as «class XMSS»)'`
	);

	// Remove the temp file
	fs.unlinkSync(tempFilePath);

	console.log(
		"\x1b[32m%s\x1b[0m",
		`🎉 The HTML text was copied to the clipboard and formatted for FileMaker! Go paste it into FileMaker!`
	);
} catch (error) {
	console.error("\x1b[31m%s\x1b[0m", "❌ Error copying content to clipboard or removing the file:", error.message);
	process.exit(1); // Exit the program with a failure status code
}

# JS Dev Kit for FileMaker Developers

*Develop, Render, and Deploy JavaScript for a FileMaker App*

# This Kit
## What it does
This environment allows a FileMaker developer to start coding their widget and see the results right away in a FileMaker file. Once done developing, the can be inlined and pushed to the FileMaker file for use offline.
<br/>
It's a template file, so you can use to start other projects.
## Consists of
- A repository template on Github
- A basic html / JS set up.
- package.json file for install
- A FileMaker file to show the widget rendered
- Scripts to build and upload the inlined code to FileMaker
## TO GET STARTED Using this file
1. `npm install`
2. `npm start`
3. Open the jsDev.fmp12 file.
4. Allow it to work in Dev mode.

At this point you should see the web viewer on the layout load up with the HTML and JavaScript here. Edit the JavaScript or the HTML and you'll see the render in the web viewer update.

## Use this kit
Now you're ready to use this kit to create awesome JS widgets.

## Upload Method
The JS Dev Kit allows for two methods of loading your widget code into Filemaker:

### Insert Record
The default behavior when uploading is to save the widget code into a field named `HTML` in the `HTML` table. When the widget is loaded, the code is retrieved from this field and displayed in teh WebViewer. This method works well in most situations.

### Insert Text
In certain scenarios, you may want to save the code for your widget into a FileMaker script using the `Insert Text` script step. This can be advantageous when deploying a file, as the configuration for the widget is saved with the rest of your scripts and does not require updating the configuration data after a migration. A script can then set the contents of the WebViewer from the vairable. Normaly FileMaker has a limmit of 30,000 characters for `Insert Text` script step, but JS Dev Kit has a method to bypass the character limmit in filemaker allowing any amount of code to be stored in the script step. The helper file `InsertTextHelper.fmp12` uses the free FileMaker plugin [BaseElements](https://baseelements.com) to generate the XML snippet for the script step, and is based on the excellent solution created by [DataManix](https://www.thebrainbasket.com/dm-inserttext-helper-tool/).


The method behavour can be set file `widget.config.js` by changing the property `'method: "record"` to `'method: "insertText"`.
# Fortune for Brackets
An extension for [Brackets](https://github.com/adobe/brackets/) to insert a
random fortune into the editor.

### How to Install
1. Select **Brackets > File > Extension Manager...**
2. Search for this extension.
3. Click on the **Install** button.

### How to Use Fortune
Type `fortune` then press the **Tab** key.

##### List of Current Options
**_[file]:** Defines the fortune `[file]` used to generate the random
fortune.  For example, if there is a fortune file called `zippy.txt` in the fortunes
directory, typing the command `fortune_zippy` will display a random quote from the
file.  Note that the `.txt` file extension is not included in the command.

### Roadmap
* Create an inline command line to run this program
* Add _?, _help option that displays help and options
* Add _files option that lists all of the available fortune files
* Update 'file not found' message to reference _files option
* Add _all option which picks a random fortune from a combination of all the files
* Add word wrap option

### License
MIT-licensed -- see `main.js` for details.

### Compatibility
Tested on Brackets Sprint 23 and later, Windows 7.

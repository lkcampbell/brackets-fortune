# Fortune for Brackets
An extension for [Brackets](https://github.com/adobe/brackets/) to insert a
random fortune into the editor.

### How to Install
1. Select **Brackets > File > Install Extension...**
2. Paste https://github.com/lkcampbell/brackets-fortune into Extension URL field.
3. Click on the **Install** button.
4. Reload or Restart Brackets -- normally not required but this extension
needs it.

### How to Use Fortune
Type `fortune` then press the **Tab** key.

##### List of Current Options
**_[file]:** Defines the fortune `[file]` used to generate the random
fortune.  For example, if there is a fortune file called `zippy.txt` in the fortunes
directory, typing the command `fortune_zippy` will display a random quote from the
file.  Note that the `.txt` file extension is not included in the command.

### Roadmap
* Make the installation restartless
* Add word wrap option

### License
MIT-licensed -- see `main.js` for details.

### Compatibility
Brackets Sprint 23 or later.

/*
 * The MIT License (MIT)
 * Copyright (c) 2013 Lance Campbell. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, regexp: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
    "use strict";
    
    // --- Brackets Modules ---
    var ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        KeyEvent        = brackets.getModule("utils/KeyEvent"),
        EditorManager   = brackets.getModule("editor/EditorManager");
    
    // --- Utility functions ---
    function _getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    // --- Private functions ---
    function _getFortuneCommand(editor) {
        var document    = editor.document,
            pos         = editor.getCursorPos(),
            line        = document.getLine(pos.line),
            start       = pos.ch,
            end         = pos.ch,
            command     = "";
        
        while (start > 0 && (/\S/).test(line.charAt(start - 1))) {
            --start;
        }
        
        command = document.getRange({line: pos.line, ch: start}, {line: pos.line, ch: end});
        
        return ((command.split("_")[0] === "fortune") ? command : "");
    }
    
    function _getFortuneText(fortuneFileName) {
        var fortunePath     = "",
            documentText    = "",
            fortuneText     = "",
            result          = new $.Deferred();
        
        fortunePath = ExtensionUtils.getModulePath(module, "/fortunes/");
        
        DocumentManager.getDocumentForPath(fortunePath + fortuneFileName)
            .done(function (document) {
                documentText = document.getText();
                fortuneText = _getRandomElement(documentText.split("\n%\n"));
                result.resolve(fortuneText);
            })
            .fail(function (fileError) {
                result.reject("Error: File '" + fortuneFileName + "' does not exist.");
            });
        
        return result.promise();
    }

    // --- Event handlers ---
    function _handleKeyEvent(jqEvent, editor, event) {
        var command         = "",
            commandArray    = [],
            i               = 0,
            option          = "",
            finalText       = "",
            start           = 0,
            end             = 0;
        
        
        if ((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_TAB)) {
            command = _getFortuneCommand(editor);
            if (command) {
                commandArray = command.split("_");
                
                // Parse the command string
                for (i = 1; i < commandArray.length; i++) {
                    option = commandArray[i];
                }
                
                option = option || "default";
                
                _getFortuneText(option + ".txt")
                    .done(function (fortuneText) {
                        // Get the fortune
                        finalText = fortuneText;
                    })
                    .fail(function (errorText) {
                        // Get the error message
                        finalText = errorText;
                    })
                    .always(function () {
                        // Display either the fortune or the error message
                        end = editor.getCursorPos();
                        start = {line: end.line, ch: end.ch - command.length};
                        editor.document.replaceRange("\n" + finalText, start, end);
                    });
                    
                event.preventDefault();
            }
        }
    }
    
    function _updateEditorListener(event, newEditor, oldEditor) {
        if (newEditor) {
            $(newEditor).on("keyEvent", _handleKeyEvent);
        }
        
        if (oldEditor) {
            $(oldEditor).off("keyEvent", _handleKeyEvent);
        }
    }
    
    // Update editor listeners any time the active editor changes
    $(EditorManager).on("activeEditorChange", _updateEditorListener);
});

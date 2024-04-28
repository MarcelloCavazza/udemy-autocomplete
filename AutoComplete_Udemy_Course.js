// ==UserScript==
// @name         AutoComplete Udemy Course
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Mask as done all your Udemy's classes
// @author       Marcello Cavazza
// @match        https://www.udemy.com/course/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=udemy.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var button = document.createElement('button');

    // Set the button's text content
    button.textContent = 'Complete course';
    button.style.zIndex = '99999999';
    // Apply styles to the button
    button.style.position = 'fixed';
    button.style.top = '20px'; // Adjust as needed
    button.style.left = '20px'; // Adjust as needed
    button.style.background = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Append the button to the body element
    document.body.appendChild(button);

    // Add an event listener to the button for the click event
    button.addEventListener('click', function() {
        // Perform some action when the button is clicked
        try{
            const mainContentList = document.getElementById("ct-sidebar-scroll-container");
            if(mainContentList != undefined && mainContentList.childNodes.length > 0){
                let chapters = mainContentList.children[0].children[0].childNodes;
                if(chapters != undefined) {
                    chapters.forEach((child) => {
                        const isChapterOpen = child.children[0].dataset.checked === "checked";
                        if(!isChapterOpen) {
                            child.children[1].click();
                        }//child.children[child.childNodes.length-1].children[0].children[0].childNodes[0].children[0].children[0].children[0]
                        const canIFindContentForThisChapter = child.children[child.childNodes.length-1].children[0].childNodes.length > 0;
                        if(canIFindContentForThisChapter){
                            const classesOfCurrentChapter = child.children[child.childNodes.length-1].children[0].children[0].childNodes;
                            if(classesOfCurrentChapter != undefined){
                                classesOfCurrentChapter.forEach((classOfChapter)=>{
                                    const buttonToConcludeClass = classOfChapter.children[0].children[0].children[0];
                                    const buttonLabel = buttonToConcludeClass.children[buttonToConcludeClass.childNodes.length-1].innerHTML;
                                    if(buttonLabel != undefined){
                                        const isActive = buttonLabel.indexOf("completed") != -1;
                                        if(!isActive){
                                            console.log("aa");
                                            buttonToConcludeClass.click();
                                        }
                                    }

                                });
                            }
                        }
                    });
                }
            }
        }catch(ex){
            console.error(ex);
        }
    });
    // Your code here...
})();
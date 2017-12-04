/**
 * Created by maykinayki on 8/31/17.
 */

"use strict";

const global = typeof window !== "undefined" ? window : this;
const document = global.document;

class Accordion {

    constructor(element, options = {}) {
        const self = this;

        self.defaultOptions = {
            eventName: "click", //supports all HTML DOM Events (e.g. click, dblclick, mouseover etc.)
            eventDelay: 0, // enable event delay untill given milliseconds, usefull if eventName is mouseover
            collapsible: true, // enable all accordion item can be closed at once
            multiple: false, // enable multiple accordion item open at once
            defaultOpenedIndexes: 0, // -1 for close all as default, array of indexes accepted if multiple option is true

            //slide functions with jQuery. If you don't include jQuery in your website please override these functions
            slideDuration: 200,
            slideDownFn(el, slideDuration) {
                el.style.WebkitTransitionDuration = slideDuration+ "ms";
                el.style.transitionDuration = slideDuration + "ms";

                el.style.height = "auto";
                const height = el.scrollHeight;
                el.style.height = "0";
                global.setTimeout(function() {
                    el.style.height = height + "px";
                }, 0);
            },
            slideUpFn(el, slideDuration) {
                el.style.WebkitTransitionDuration = slideDuration+ "ms";
                el.style.transitionDuration = slideDuration + "ms";
                global.setTimeout(function() {
                    el.style.height = "0";
                }, 0);
            }
        };
        self.options = Object.assign({}, self.defaultOptions, options);
        self.accordion = element;
        self.accordionItemsLength = self.accordion.childElementCount;

        if(document.readyState === "complete"){
            self.init();
        } else {
            document.addEventListener('readystatechange', function (event) {
                if (event.target.readyState === "complete") {
                    self.init();
                }
            }, false);
        }
    }

    init() {
        const self = this;

        const openedIndexes = self.options.defaultOpenedIndexes instanceof Array ? self.options.defaultOpenedIndexes : [self.options.defaultOpenedIndexes];
        for (let i = 0; i < self.accordionItemsLength; i++) {
            const accordionItem = self.accordion.children[i];
            const accordionItemHeading = accordionItem.getElementsByClassName("accordion-heading")[0];

            if (accordionItemHeading) {
                const eventFn = function (e) {
                    self.handleAccordionItemHeadingEvent(e, accordionItem, i);
                };
                if(accordionItemHeading.eventListenerAttached !== true) {
                    accordionItemHeading.addEventListener(self.options.eventName, eventFn, false);
                }
                accordionItemHeading.eventListenerAttached = true;
            }

            if (openedIndexes.indexOf(i) > -1) {
                self.openAccordionItem(accordionItem, i);
            } else {
                self.closeAccordionItem(accordionItem);
            }
        }
    };

    openAccordionItem(item, itemIndex) {
        const self = this;

        item.isOpened = true;
        item.classList.add("state-open");

        const accordionItemContent = item.getElementsByClassName("accordion-content")[0];

        if(!self.options.multiple) {
            self.closeRestAccordionItems(itemIndex);
        }

        self.options.slideDownFn(accordionItemContent, self.options.slideDuration);
    };

    openAccordionItemByIndex (itemIndex) {
        const self = this;

        const accordionItem = self.accordion.children[itemIndex];
        self.openAccordionItem(accordionItem, itemIndex);
    };

    closeAccordionItem(item) {
        const self = this;

        const accordionItemContent = item.getElementsByClassName("accordion-content")[0];
        item.isOpened = false;
        item.classList.remove("state-open");

        self.options.slideUpFn(accordionItemContent, self.options.slideDuration);
    };

    closeAccordionItemByIndex(itemIndex) {
        const self = this;

        const accordionItem = self.accordion.children[itemIndex];
        self.closeAccordionItem(accordionItem);
    };

    closeRestAccordionItems (...args) {
        const self = this;

        for(let i = 0; i < self.accordionItemsLength; i++) {
            if(args.indexOf(i) === -1) {
                const accordionItem = self.accordion.children[i];
                self.closeAccordionItem(accordionItem);
            }
        }
    };

    handleAccordionItemHeadingEvent(e, item, itemIndex) {
        const self = this;
        self.eventTimeout && window.clearTimeout(self.eventTimeout);
        self.eventTimeout = window.setTimeout(() => {
            if(item.isOpened && !self.options.multiple) {
                if(self.options.collapsible) {
                    self.closeAccordionItem(item);
                }
                self.closeRestAccordionItems(itemIndex);
            } else if(item.isOpened && self.options.multiple) {
                self.closeAccordionItem(item);
            } else {
                self.openAccordionItem(item, itemIndex);
            }
        }, self.options.eventDelay);
    }

}

global.Accordion = Accordion;

export default Accordion;

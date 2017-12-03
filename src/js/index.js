/**
 * Created by maykinayki on 8/31/17.
 */

"use strict";

const global = typeof window !== "undefined" ? window : this;
const $ = global.$ || global.jQuery; //jQuery only used for slideDown and slideUp animations. You can override it in Accordion options

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
            slideSpeed: 200,
            slideDownFn(el, slideSpeed) {
                $ && $(el).slideDown(slideSpeed);
            },
            slideUpFn(el, slideSpeed) {
                $ && $(el).slideUp(slideSpeed);
            }
        };
        self.options = Object.assign({}, self.defaultOptions, options);
        self.accordion = element;
        self.accordionItemsLength = self.accordion.childElementCount;

        self.init();
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

        self.options.slideDownFn(accordionItemContent, self.options.slideSpeed);
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

        self.options.slideUpFn(accordionItemContent, self.options.slideSpeed);
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

MN Accordion (ES6, SCSS)
============

An accordion plugin with support of ES6 and SCSS

## Demo & Examples

Live demo: [maykinayki.github.io/mn-accordion](http://maykinayki.github.io/mn-accordion/)


## Installation

Using yarn

```js
yarn add mn-accordion
```

Using npm

```js
npm install mn-accordion --save
```

You can then import plugin and its styles in your application as follows:

```js
import MNAccordion from 'mn-accordion';
import 'mn-accordion/dist/css/mn-accordion.css';
```

Using bower

```js
bower install mn-accordion --save
```

### HTML markup

By using bower or CDN you can also use the standalone UMD build by including `path/to/bower_components/mn-accordion/dist/js/mn-accordion.min.js` and `path/to/bower_components/mn-accordion/dist/css/mn-accordion.min.css` in your page.
 <br>

```html

<head>
    <link rel="stylesheet" href="path/to/bower_components/mn-accordion/dist/css/mn-accordion.min.css">
    ...
</head>
<body>

    <div class="mn-accordion" id="accordion">
    
            <!--Accordion item-->
            <div class="accordion-item">
                <div class="accordion-heading">
                    <h3>Section 1</h3>
                    <div class="icon">
                        <i class="arrow right"></i>
                    </div>
                </div>
                <div class="accordion-content">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
            <!--Accordion item-->
    
            <!--Accordion item-->
            <div class="accordion-item">
                <div class="accordion-heading">
                    <h3>Section 2</h3>
                    <div class="icon">
                        <i class="arrow right"></i>
                    </div>
                </div>
                <div class="accordion-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
            <!--Accordion item-->
    
            <!--Accordion item-->
            <div class="accordion-item">
                <div class="accordion-heading">
                    <h3>Section 3</h3>
                    <div class="icon">
                        <i class="arrow right"></i>
                    </div>
                </div>
                <div class="accordion-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
            <!--Accordion item-->
    
        </div>
    
    <script src="path/to/bower_components/mn-accordion/dist/js/mn-accordion.min.js"></script>
    
    <script>
        (function () {
            var accordion_1 = new Accordion(document.getElementById("accordion"), {
                collapsible: false
            });
        })();
    </script>
    
</body>

```

## API, events and available options:

| Parameter | Type | Value | Description |
|:---|:---|:---|:---|
| eventName | `Enum<String>` | **click**, dblclick, mouseover  | Accordion item will slide down and up based on the event. Supports all HTML DOM Events |
| eventDelay | `Number` | **0** | Delay the event untill given milliseconds, usefull if eventName is mouseover |
| collapsible | `Boolean` | **true** | Enable all accordion items can be closed at once |
| multiple | `Boolean` | **false** | Enable multiple accordion item can be opened at once |
| defaultOpenedIndexes | `Integer \| Array<Integer>` | **0** | Make accordion item default opened with given index. Pass **-1** for close all items as default. Array of indexes accepted if *multiple* option is *true*|
| slideDuration | `Integer` | **200** | Slide up and down slideDuration by ms |
| slideDownFn | `Function` | slideDownFn(el, slideDuration) {} | Slide down function. We are using css transitions |
| slideUpFn | `Function` | slideUpFn(el, slideDuration) {} | Slide up function. We are using css transitions |


# License

MIT Licensed. Copyright (c) mike 2017.
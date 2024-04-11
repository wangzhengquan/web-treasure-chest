const StringUtil = {
  trim: function(str) {
    return str.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
  },
  /**
   * 下划线样式转成驼峰样式
   * @param  {[type]} string [description]
   * @return {[type]}        [description]
   */
  toCamelCase: function (string) {
    return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
  }
};

var Dom7 = function (arr) {
  var _this = this, i = 0;
  // Create array-like object
  for (i = 0; i < arr.length; i++) {
      _this[i] = arr[i];
  }
  _this.length = arr.length;

  // _this.doc = arr.length<1 ? document: arr[0].ownerDocument || arr[0].document || arr[0];
  // _this.win  =  _this.doc.parentWindow || _this.doc.defaultView
  // Return collection with methods
  return this;
};
var dquery = function (selector, context) {
  var arr = [], i = 0;
  if (selector && !context) {
      if (selector instanceof Dom7) {
          return selector;
      }

  }
  if(context && context instanceof Dom7){
      context = context[0]
  }
  if (selector) {
      // String
      if (typeof selector === 'string') {
          var els, tempParent, html;
          selector = html = selector.trim();
          if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
              var toCreate = 'div';
              if (html.indexOf('<li') === 0) toCreate = 'ul';
              if (html.indexOf('<tr') === 0) toCreate = 'tbody';
              if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
              if (html.indexOf('<tbody') === 0) toCreate = 'table';
              if (html.indexOf('<option') === 0) toCreate = 'select';
              tempParent = document.createElement(toCreate);
              tempParent.innerHTML = html;
              for (i = 0; i < tempParent.childNodes.length; i++) {
                  arr.push(tempParent.childNodes[i]);
              }
          }
          else {
              if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                  // Pure ID selector
                  els = [document.getElementById(selector.split('#')[1])];
              }
              else {
                  // Other selectors
                  els = (context || document).querySelectorAll(selector);
              }
              for (i = 0; i < els.length; i++) {
                  if (els[i]) arr.push(els[i]);
              }
          }
      }
      // Node/element
      else if (selector.nodeType || toString.call(selector) === toString.call(window) || toString.call(selector) === toString.call(document)) {
          arr.push(selector);
      }
      //Array of elements or instance of Dom
      else if (selector.length > 0 && selector[0].nodeType) {
          for (i = 0; i < selector.length; i++) {
              arr.push(selector[i]);
          }
      }
  }
  return new Dom7(arr);
};

//methods

Dom7.prototype = {
  get: function(index) {
      return this[index]
  },
  // Classes and attriutes
  addClass: function (className) {
      if (typeof className === 'undefined') {
          return this;
      }
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i++) {
          for (var j = 0; j < this.length; j++) {
              if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
          }
      }
      return this;
  },
  removeClass: function (className) {
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i++) {
          for (var j = 0; j < this.length; j++) {
              if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
          }
      }
      return this;
  },
  hasClass: function (className) {
      if (!this[0] || !this[0].classList) return false;
      else return this[0].classList.contains(className);
  },
  toggleClass: function (className) {
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i++) {
          for (var j = 0; j < this.length; j++) {
              if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
          }
      }
      return this;
  },
  attr: function (attrs, value) {
      if (arguments.length === 1 && typeof attrs === 'string') {
          // Get attr
          if (this[0]) return this[0].getAttribute(attrs);
          else return undefined;
      }
      else {
          // Set attrs
          for (var i = 0; i < this.length; i++) {
              if (arguments.length === 2) {
                  // String
                  this[i].setAttribute(attrs, value);
              }
              else {
                  // Object
                  for (var attrName in attrs) {
                      this[i][attrName] = attrs[attrName];
                      this[i].setAttribute(attrName, attrs[attrName]);
                  }
              }
          }
          return this;
      }
  },
  removeAttr: function (attr) {
      for (var i = 0; i < this.length; i++) {
          this[i].removeAttribute(attr);
      }
      return this;
  },
  hasAttr: function(attrs){
      return  this[0] && this[0].hasAttribute(attrs)
  },
  prop: function (props, value) {
      if (arguments.length === 1 && typeof props === 'string') {
          // Get prop
          if (this[0]) return this[0][props];
          else return undefined;
      }
      else {
          // Set props
          for (var i = 0; i < this.length; i++) {
              if (arguments.length === 2) {
                  // String
                  this[i][props] = value;
              }
              else {
                  // Object
                  for (var propName in props) {
                      this[i][propName] = props[propName];
                  }
              }
          }
          return this;
      }
  },
  data: function (key, value) {
      if (typeof value === 'undefined') {
          // Get value
          if (this[0]) {
              if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) {
                  return this[0].dom7ElementDataStorage[key];
              }
              else {
                  var dataKey = this[0].getAttribute('data-' + key);    
                  if (dataKey) {
                      return dataKey;
                  }
                  else return undefined;
              }
          }
          else return undefined;
      }
      else {
          // Set value
          for (var i = 0; i < this.length; i++) {
              var el = this[i];
              if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
              el.dom7ElementDataStorage[key] = value;
          }
          return this;
      }
  },
  removeData: function(key) {
      for (var i = 0; i < this.length; i++) {
          var el = this[i];
          if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
              el.dom7ElementDataStorage[key] = null;
              delete el.dom7ElementDataStorage[key];
          }
      }
  },
  dataset: function () {
      var el = this[0];
      if (el) {
          var dataset = {};
          if (el.dataset) {
              for (var dataKey in el.dataset) {
                  dataset[dataKey] = el.dataset[dataKey];
              }
          }
          else {
              for (var i = 0; i < el.attributes.length; i++) {
                  var attr = el.attributes[i];
                  if (attr.name.indexOf('data-') >= 0) {
                      dataset[StringUtil.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                  }
              }
          }
          for (var key in dataset) {
              if (dataset[key] === 'false') dataset[key] = false;
              else if (dataset[key] === 'true') dataset[key] = true;
              else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] = dataset[key] * 1;
          }
          return dataset;
      }
      else return undefined;
  },
  val: function (value) {
      if (typeof value === 'undefined') {
          if (this[0]) return this[0].value;
          else return undefined;
      }
      else {
          for (var i = 0; i < this.length; i++) {
              this[i].value = value;
          }
          return this;
      }
  },
  // Transforms
  transform : function (transform) {
      for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
      }
      return this;
  },
  transition: function (duration) {
      if (typeof duration !== 'string') {
          duration = duration + 'ms';
      }
      for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
      }
      return this;
  },
  //Events
  on: function (eventName, targetSelector, listener, capture) {
      function handleLiveEvent(e) {
          var target = e.target;
          if (dquery(target).is(targetSelector)) listener.call(target, e);
          else {
              var parents = dquery(target).parents();
              for (var k = 0; k < parents.length; k++) {
                  if (dquery(parents[k]).is(targetSelector)) listener.call(parents[k], e);
              }
          }
      }
      var events = eventName.split(' ');
      var i, j;
      for (i = 0; i < this.length; i++) {
          if (typeof targetSelector === 'function' || targetSelector === false) {
              // Usual events
              if (typeof targetSelector === 'function') {
                  listener = arguments[1];
                  capture = arguments[2] || false;
              }
              for (j = 0; j < events.length; j++) {
                  this[i].addEventListener(events[j], listener, capture);
              }
          }
          else {
              //Live events
              for (j = 0; j < events.length; j++) {
                  if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                  this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                  this[i].addEventListener(events[j], handleLiveEvent, capture);
              }
          }
      }

      return this;
  },
  off: function (eventName, targetSelector, listener, capture) {
      var events = eventName.split(' ');
      for (var i = 0; i < events.length; i++) {
          for (var j = 0; j < this.length; j++) {
              if (typeof targetSelector === 'function' || targetSelector === false) {
                  // Usual events
                  if (typeof targetSelector === 'function') {
                      listener = arguments[1];
                      capture = arguments[2] || false;
                  }
                  this[j].removeEventListener(events[i], listener, capture);
              }
              else {
                  // Live event
                  if (this[j].dom7LiveListeners) {
                      for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                          if (this[j].dom7LiveListeners[k].listener === listener) {
                              this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                          }
                      }
                  }
              }
          }
      }
      return this;
  },
  once: function (eventName, targetSelector, listener, capture) {
      var dom = this;
      if (typeof targetSelector === 'function') {
          listener = arguments[1];
          capture = arguments[2];
          targetSelector = false;
      }
      function proxy(e) {
          listener.call(e.target, e);
          dom.off(eventName, targetSelector, proxy, capture);
      }
      return dom.on(eventName, targetSelector, proxy, capture);
  },
  trigger: function (eventName, eventData) {
      var events = eventName.split(' ');
      for (var i = 0; i < events.length; i++) {
          for (var j = 0; j < this.length; j++) {
              var evt;
              try {
                  evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
              }
              catch (e) {
                  evt = document.createEvent('Event');
                  evt.initEvent(events[i], true, true);
                  evt.detail = eventData;
              }
              this[j].dispatchEvent(evt);
          }
      }
      return this;
  },
  transitionEnd: function (callback) {
      var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
          i, j, dom = this;
      function fireCallBack(e) {
          /*jshint validthis:true */
          if (e.target !== this) return;
          callback.call(this, e);
          for (i = 0; i < events.length; i++) {
              dom.off(events[i], fireCallBack);
          }
      }
      if (callback) {
          for (i = 0; i < events.length; i++) {
              dom.on(events[i], fireCallBack);
          }
      }
      return this;
  },
  animationEnd: function (callback) {
      var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
          i, j, dom = this;
      function fireCallBack(e) {
          callback(e);
          for (i = 0; i < events.length; i++) {
              dom.off(events[i], fireCallBack);
          }
      }
      if (callback) {
          for (i = 0; i < events.length; i++) {
              dom.on(events[i], fireCallBack);
          }
      }
      return this;
  },
  // Sizing/Styles
  width: function () {
      if (this[0] === window) {
          return window.innerWidth;
      }
      else {
          if (this.length > 0) {
              return parseFloat(this.css('width'));
          }
          else {
              return null;
          }
      }
  },
  outerWidth: function (includeMargins) {
      if (this.length > 0) {
          if (includeMargins) {
              var styles = this.styles();
              return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));    
          }
          else
              return this[0].offsetWidth;
      }
      else return null;
  },
  height: function () {
      if (this[0] === window) {
          return window.innerHeight;
      }
      else {
          if (this.length > 0) {
              return parseFloat(this.css('height'));
          }
          else {
              return null;
          }
      }
  },
  outerHeight: function (includeMargins) {
      if (this.length > 0) {
          if (includeMargins) {
              var styles = this.styles();
              return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));    
          }
          else
              return this[0].offsetHeight;
      }
      else return null;
  },
  offset: function () {
      if (this.length > 0) {
          var el = this[0];
          var box = el.getBoundingClientRect();
          var body = document.body;
          var clientTop  = el.clientTop  || body.clientTop  || 0;
          var clientLeft = el.clientLeft || body.clientLeft || 0;
          var scrollTop  = window.pageYOffset || el.scrollTop;
          var scrollLeft = window.pageXOffset || el.scrollLeft;
          return {
              top: box.top  + scrollTop  - clientTop,
              left: box.left + scrollLeft - clientLeft
          };
      }
      else {
          return null;
      }
  },
  hide: function () {
      for (var i = 0; i < this.length; i++) {
          this[i].style.display = 'none';
      }
      return this;
  },
  show: function () {
      for (var i = 0; i < this.length; i++) {
          this[i].style.display = 'block';
      }
      return this;
  },
  styles: function () {
      var i, styles;
      if (this[0]) return window.getComputedStyle(this[0], null);
      else return undefined;
  },
  css: function (props, value) {
      var i;
      if (arguments.length === 1) {
          if (typeof props === 'string') {
              if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
          }
          else {
              for (i = 0; i < this.length; i++) {
                  for (var prop in props) {
                      this[i].style[prop] = props[prop];
                  }
              }
              return this;
          }
      }
      if (arguments.length === 2 && typeof props === 'string') {
          for (i = 0; i < this.length; i++) {
              this[i].style[props] = value;
          }
          return this;
      }
      return this;
  },

  //Dom manipulation
  each: function (callback) {
      for (var i = 0; i < this.length; i++) {
          callback.call(this[i], i, this[i]);
      }
      return this;
  },
  filter: function (callback) {
      var matchedItems = [];
      var dom = this;
      for (var i = 0; i < dom.length; i++) {
          if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
      }
      return new Dom7(matchedItems);
  },
  html: function (html) {
      if (typeof html === 'undefined') {
          return this[0] ? this[0].innerHTML : undefined;
      }
      else {
          for (var i = 0; i < this.length; i++) {
              this[i].innerHTML = html;
          }
          return this;
      }
  },
  text: function (text) {
      if (typeof text === 'undefined') {
          if (this[0]) {
              return this[0].textContent.trim();
          }
          else return null;
      }
      else {
          for (var i = 0; i < this.length; i++) {
              this[i].textContent = text;
          }
          return this;
      }
  },
  is: function (selector) {
      if (!this[0] || typeof selector === 'undefined') return false;
      var compareWith, i;
      if (typeof selector === 'string') {
          var el = this[0];
          if (el === document) return selector === document;
          if (el === window) return selector === window;

          if (el.matches) return el.matches(selector);
          else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
          else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
          else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
          else {
              compareWith = dquery(selector);
              for (i = 0; i < compareWith.length; i++) {
                  if (compareWith[i] === this[0]) return true;
              }
              return false;
          }
      }
      else if (selector === document) return this[0] === document;
      else if (selector === window) return this[0] === window;
      else {
          if (selector.nodeType || selector instanceof Dom7) {
              compareWith = selector.nodeType ? [selector] : selector;
              for (i = 0; i < compareWith.length; i++) {
                  if (compareWith[i] === this[0]) return true;
              }
              return false;
          }
          return false;
      }

  },
  indexOf: function (el) {
      for (var i = 0; i < this.length; i++) {
          if (this[i] === el) return i;
      }
  },
  index: function () {
      if (this[0]) {
          var child = this[0];
          var i = 0;
          while ((child = child.previousSibling) !== null) {
              if (child.nodeType === 1) i++;
          }
          return i;
      }
      else return undefined;
  },
  eq: function (index) {
      if (typeof index === 'undefined') return this;
      var length = this.length;
      var returnIndex;
      if (index > length - 1) {
          return new Dom7([]);
      }
      if (index < 0) {
          returnIndex = length + index;
          if (returnIndex < 0) return new Dom7([]);
          else return new Dom7([this[returnIndex]]);
      }
      return new Dom7([this[index]]);
  },
  append: function (newChild) {
      var i, j;
      for (i = 0; i < this.length; i++) {
          if (typeof newChild === 'string') {
              var tempDiv = document.createElement('div');
              tempDiv.innerHTML = newChild;
              while (tempDiv.firstChild) {
                  this[i].appendChild(tempDiv.firstChild);
              }
          }
          else if (newChild instanceof Dom7) {
              for (j = 0; j < newChild.length; j++) {
                  this[i].appendChild(newChild[j]);
              }
          }
          else {
              this[i].appendChild(newChild);
          }
      }
      return this;
  },
  appendTo: function (parent) {
      dquery(parent).append(this);
      return this;
  },
  prepend: function (newChild) {
      var i, j;
      for (i = 0; i < this.length; i++) {
          if (typeof newChild === 'string') {
              var tempDiv = document.createElement('div');
              tempDiv.innerHTML = newChild;
              for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                  this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
              }
          }
          else if (newChild instanceof Dom7) {
              for (j = 0; j < newChild.length; j++) {
                  this[i].insertBefore(newChild[j], this[i].childNodes[0]);
              }
          }
          else {
              this[i].insertBefore(newChild, this[i].childNodes[0]);
          }
      }
      return this;
  },
  prependTo: function (parent) {
      dquery(parent).prepend(this);
      return this;
  },
   
  insertBefore: function (selector) {
      var before = dquery(selector);
      for (var i = 0; i < this.length; i++) {
          if (before.length === 1) {
              before[0].parentNode.insertBefore(this[i], before[0]);
          }
          else if (before.length > 1) {
              for (var j = 0; j < before.length; j++) {
                  before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
              }
          }
      }
      return this;
  },
  insertAfter: function (selector) {
      var after = dquery(selector);
      for (var i = 0; i < this.length; i++) {
          if (after.length === 1) {
              after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
          }
          else if (after.length > 1) {
              for (var j = 0; j < after.length; j++) {
                  after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
              }
          }
      }
      return this;
  },
  next: function (selector) {
      if (this.length > 0) {
          if (selector) {
              if (this[0].nextElementSibling && dquery(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
              else return new Dom7([]);
          }
          else {
              if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
              else return new Dom7([]);
          }
      }
      else return new Dom7([]);
  },
  nextAll: function (selector) {
      var nextEls = [];
      var el = this[0];
      if (!el) return new Dom7([]);
      while (el.nextElementSibling) {
          var next = el.nextElementSibling;
          if (selector) {
              if(dquery(next).is(selector)) nextEls.push(next);
          }
          else nextEls.push(next);
          el = next;
      }
      return new Dom7(nextEls);
  },
  prev: function (selector) {
      if (this.length > 0) {
          if (selector) {
              if (this[0].previousElementSibling && dquery(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
              else return new Dom7([]);
          }
          else {
              if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
              else return new Dom7([]);
          }
      }
      else return new Dom7([]);
  },
  prevAll: function (selector) {
      var prevEls = [];
      var el = this[0];
      if (!el) return new Dom7([]);
      while (el.previousElementSibling) {
          var prev = el.previousElementSibling;
          if (selector) {
              if(dquery(prev).is(selector)) prevEls.push(prev);
          }
          else prevEls.push(prev);
          el = prev;
      }
      return new Dom7(prevEls);
  },
  parent: function (selector) {
      // var parents = [];
      const parents = new Set();
      for (var i = 0; i < this.length; i++) {
          if (this[i].parentNode !== null) {
              if (selector) {
                  if (dquery(this[i].parentNode).is(selector)) parents.add(this[i].parentNode);
              }
              else {
                 parents.add(this[i].parentNode);
              }
          }
      }
      return dquery(Array.from(parents));
  },
  parents: function (selector) {
    const parents = new Set();
      for (var i = 0; i < this.length; i++) {
          var parent = this[i].parentNode;
          while (parent) {
              if (selector) {
                  if (dquery(parent).is(selector)) parents.add(parent);
              }
              else {
                  parents.add(parent);
              }
              parent = parent.parentNode;
          }
      }
      return dquery(Array.from(parents));
  },
  closest: function (selector) {
      var closest = this;
      if (typeof selector === 'undefined') {
          return new Dom7([]);
      }
      if (!closest.is(selector)) {
          closest = closest.parents(selector).eq(0);
      }
      return closest;
  },
  find : function (selector) {
      var foundElements = [];
      for (var i = 0; i < this.length; i++) {
          if(this[i].nodeType === Node.TEXT_NODE) continue;
          var found = this[i].querySelectorAll(selector);
          for (var j = 0; j < found.length; j++) {
              foundElements.push(found[j]);
          }
      }
      return new Dom7(foundElements);
  },
  children: function (selector) {
      var children = new Set();
      for (var i = 0; i < this.length; i++) {
          var childNodes = this[i].childNodes;

          for (var j = 0; j < childNodes.length; j++) {
              if (!selector) {
                  if (childNodes[j].nodeType === 1) children.add(childNodes[j]);
              }
              else {
                  if (childNodes[j].nodeType === 1 && dquery(childNodes[j]).is(selector)) children.add(childNodes[j]);
              }
          }
      }
      return new Dom7(Array.from(children));
  },
  remove: function () {
      for (var i = 0; i < this.length; i++) {
          if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }
      return this;
  },
  detach: function () {
      return this.remove();
  },
  add: function () {
      var dom = this;
      var i, j;
      for (i = 0; i < arguments.length; i++) {
          var toAdd = dquery(arguments[i]);
          for (j = 0; j < toAdd.length; j++) {
              dom[dom.length] = toAdd[j];
              dom.length++;
          }
      }
      return dom;
  }
};


dquery.getTranslate = function (el, axis) {
  var matrix, curTransform, curStyle, transformMatrix;

  // automatic axis detection
  if (typeof axis === 'undefined') {
      axis = 'x';
  }

  curStyle = window.getComputedStyle(el, null);
  if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function(a){
              return a.replace(',','.');
          }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  }
  else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
  }

  if (axis === 'x') {
      //Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
          curTransform = transformMatrix.m41;
      //Crazy IE10 Matrix
      else if (matrix.length === 16)
          curTransform = parseFloat(matrix[12]);
      //Normal Browsers
      else
          curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
      //Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
          curTransform = transformMatrix.m42;
      //Crazy IE10 Matrix
      else if (matrix.length === 16)
          curTransform = parseFloat(matrix[13]);
      //Normal Browsers
      else
          curTransform = parseFloat(matrix[5]);
  }
  
  return curTransform || 0;
};

dquery.requestAnimationFrame = function (callback) {
  if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
  else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
  else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
  else {
      return window.setTimeout(callback, 1000 / 60);
  }
};
dquery.cancelAnimationFrame = function (id) {
  if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
  else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
  else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
  else {
      return window.clearTimeout(id);
  }  
};

// dquery.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);


// Link to prototype
dquery.fn = Dom7.prototype;

// Plugins
dquery.fn.scrollTo = function (left, top, duration, easing, callback) {
  if (arguments.length === 4 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
  }
  return this.each(function () {
      var el = this;
      var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
      var animateTop = top > 0 || top === 0;
      var animateLeft = left > 0 || left === 0;
      if (typeof easing === 'undefined') {
          easing = 'swing';
      }
      if (animateTop) {
          currentTop = el.scrollTop;
          if (!duration) {
              el.scrollTop = top;
          }
      }
      if (animateLeft) {
          currentLeft = el.scrollLeft;
          if (!duration) {
              el.scrollLeft = left;
          }
      }
      if (!duration) return;
      if (animateTop) {
          maxTop = el.scrollHeight - el.offsetHeight;
          newTop = Math.max(Math.min(top, maxTop), 0);
      }
      if (animateLeft) {
          maxLeft = el.scrollWidth - el.offsetWidth;
          newLeft = Math.max(Math.min(left, maxLeft), 0);
      }
      var startTime = null;
      if (animateTop && newTop === currentTop) animateTop = false;
      if (animateLeft && newLeft === currentLeft) animateLeft = false;
      function render(time) {
          if (time === undefined) {
              time = new Date().getTime();
          }
          if (startTime === null) {
              startTime = time;
          }
          var doneLeft, doneTop, done;
          var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
          var easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos( progress * Math.PI ) / 2);
          if (animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
          if (animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
          if (animateTop && newTop > currentTop && scrollTop >= newTop)  {
              el.scrollTop = newTop;
              done = true;
          }
          if (animateTop && newTop < currentTop && scrollTop <= newTop)  {
              el.scrollTop = newTop;
              done = true;
          }

          if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft)  {
              el.scrollLeft = newLeft;
              done = true;
          }
          if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft)  {
              el.scrollLeft = newLeft;
              done = true;
          }

          if (done) {
              if (callback) callback();
              return;
          }
          if (animateTop) el.scrollTop = scrollTop;
          if (animateLeft) el.scrollLeft = scrollLeft;
          dquery.requestAnimationFrame(render);
      }
      dquery.requestAnimationFrame(render);
  });
};


dquery.fn.scrollTop = function (top, duration, easing, callback) {
  if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
  }
  var dom = this;
  if (typeof top === 'undefined') {
      if (dom.length > 0) return dom[0].scrollTop;
      else return null;
  }
  return dom.scrollTo(undefined, top, duration, easing, callback);
};
dquery.fn.scrollLeft = function (left, duration, easing, callback) {
  if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
  }
  var dom = this;
  if (typeof left === 'undefined') {
      if (dom.length > 0) return dom[0].scrollLeft;
      else return null;
  }
  return dom.scrollTo(left, undefined, duration, easing, callback);
};

// Shortcuts
(function () {
  var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll contextmenu').split(' ');
  var notTrigger = ('resize scroll').split(' ');
  function createMethod(name) {
      Dom7.prototype[name] = function (targetSelector, listener, capture) {
          var i;
          if (typeof targetSelector === 'undefined') {
              for (i = 0; i < this.length; i++) {
                  if (notTrigger.indexOf(name) < 0) {
                      if (name in this[i]) this[i][name]();
                      else {
                          dquery(this[i]).trigger(name);
                      }
                  }
              }
              return this;
          }
          else {
              return this.on(name, targetSelector, listener, capture);
          }
      };
  }
  for (var i = 0; i < shortcuts.length; i++) {
      createMethod(shortcuts[i]);
  }
})();
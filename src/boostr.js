(function () {

    this.boostr = function () {
        this.preConnectUrls = [];
        this.preFetchUrls = [];
        this.preRenderUrls = [];

        // Define option defaults
        var defaults = {
            preConnectDelay: 0,
            preConnectWidth: 0,
            preConnectAttr: 'data-preconnect',
            preConnectAll: true,
            preFetchDelay: 1000,
            preFetchWidth: 1024,
            preFetchAttr: 'data-prefetch',
            preRenderDelay: 3000,
            preRenderWidth: 1024,
            preRenderAttr: 'data-prerender'
        };

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            console.log('applying custom settings');
            this.options = extendDefaults(defaults, arguments[0]);
        } else{
            console.log('applying default settings');
            this.options = defaults;
        }
    };

    // publicly callable functions
    boostr.prototype.preConnect = function (url) {
        pushPreConnect.call(this, url);
    };

    boostr.prototype.preFetch = function (url) {
        pushPreFetch.call(this, url);
    };

    boostr.prototype.preRender = function (url) {
        pushPreRender.call(this, url);
    };

    boostr.prototype.start = function () {
        init.call(this);
    };

    function preConnect(url, instance) {
        if (window.innerWidth > instance.options.preConnectWidth && !isInArray(url, instance.preConnectUrls)) {
            setTimeout(function () {
                console.log('preconnecting ' + url);
                createLink('preconnect', url);
            }, instance.options.preConnectDelay);
            instance.preConnectUrls.push(url);
        }
    }

    function preFetch(url, instance) {
        if (window.innerWidth > instance.options.preFetchWidth && !isInArray(url, instance.preFetchUrls)) {
            setTimeout(function () {
                console.log('prefetching ' + url);
                createLink('prefetch', url);
            }, instance.options.preFetchDelay);
            instance.preFetchUrls.push(url);
        }
    }

    function preRender(url, instance) {
        if (window.innerWidth > instance.options.preRenderWidth && !isInArray(url, instance.preRenderUrls)) {
            setTimeout(function () {
                console.log('prerendering ' + url);
                createLink('prerender', url);
            }, instance.options.preRenderDelay);
            instance.preRenderUrls.push(url);
        }
    }

    function createLink(rel, url) {
        var link = document.createElement("link");
        link.rel = rel;
        link.href = url;
        document.head.appendChild(link);
    }

    function pushPreConnect(url) {
        preConnect(url, this);
    }

    function pushPreFetch(url) {
        preFetch(url, this);
    }

    function pushPreRender(url) {
        preRender(url, this);
    }

    function init() {
        console.log('starting');
        startAllTheThings(this);
    }

    function startAllTheThings(instance) {
        if (instance.options.preConnectAll) {
            initAllHrefs(instance);
        }
        initPreConnet(instance);
        initPreFetch(instance);
        initPreRender(instance);
        console.log('running');
    }

    function initAllHrefs(instance) {
        console.log('searching for a[href]');
        var elements = document.querySelectorAll('a[href]:not([data-preconnect]):not([data-prefetch]):not([data-prerender])');
        console.log('found ' + elements.length + ' hrefs');
        for (var i = 0; i < elements.length; ++i) {
            preConnect(elements[i].getAttribute('href'), instance);
        }
    }

    function initPreConnet(instance) {
        console.log('searching for [' + instance.options.preConnectAttr + ']');
        var elements = document.querySelectorAll('[' + instance.options.preConnectAttr + ']');
        console.log('found ' + elements.length + ' preconnects');
        for (var i = 0; i < elements.length; ++i) {
            preConnect(getElementUrl(elements[i], instance.options.preConnectAttr), instance);
        }
    }

    function initPreFetch(instance) {
        console.log('searching for [' + instance.options.preFetchAttr + ']');
        var elements = document.querySelectorAll('[' + instance.options.preFetchAttr + ']');
        console.log('found ' + elements.length + ' prefetches');
        for (var i = 0; i < elements.length; ++i) {
            preFetch(getElementUrl(elements[i], instance.options.preFetchAttr), instance);
        }
    }

    function initPreRender(instance) {
        console.log('searching for [' + instance.options.preRenderAttr + ']');
        var elements = document.querySelectorAll('[' + instance.options.preRenderAttr + ']');
        console.log('found ' + elements.length + ' prerenders');
        for (var i = 0; i < elements.length; ++i) {
            preRender(getElementUrl(elements[i], instance.options.preRenderAttr), instance);
        }
    }

    function getElementUrl(element, attribute) {
        var attributeValue = element.getAttribute(attribute);
        if (typeof attributeValue === 'string' && attributeValue !== '') {
            return attributeValue;
        } else if (typeof element.getAttribute('href') === 'string') {
            return element.getAttribute('href');
        } else {
            return '';
        }
    }

    function isInArray(string, array) {
        if (typeof string === 'string' && array.length > 0) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === string) {
                    return true;
                }
            }
        }
        return false;
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        console.log('applying settings');
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}());

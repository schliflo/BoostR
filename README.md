# BoostR

[![Greenkeeper badge](https://badges.greenkeeper.io/schliflo/BoostR.svg)](https://greenkeeper.io/)

a javascript utility for preconnect, preload and prerender, that helps you speed up your website's experience


## Features

* Lightweight (2,4kb)
* Dependency free
* Very easy to use
* Native support for timed pre-rendering, -fetching & -connecting
* Native support for mobile breakpoints


## Usage

include boostr.min.js

    <script src="your-js-dir/boostr.min.js"></script>
    
start up BoostR

    <script>
        var boostr = new boostr();
        boostr.start();
    </script>


this will create a new BoostR instance with default settings:
    
|option             |descrition                                         |default            |
|-------------------|---------------------------------------------------|-------------------|
|preConnectDelay    |delay before preconnect elements are added to dom  |0                  |
|preConnectWidth    |min device width for preconnecting                 |0                  |
|preConnectAttr     |html attribute for preconnect links                |'data-preconnect'  |
|preConnectAll      |creates preconnects for each href in the dom       |true               |
|preFetchDelay      |delay before prefetch elements are added to dom    |1000               |
|preFetchWidth      |min device width for prefetching                   |1024               |
|preFetchAttr       |html attribute for prefetch links                  |'data-prefetch'    |
|preRenderDelay     |delay before prerender elements are added to dom   |3000               |
|preRenderWidth     |min device width for prerendering                  |1024               |
|preRenderAttr      |html attribute for prerender links                 |'data-prerender'   |


you can load BoostR with your custom settings, by passing them on initialization:

    <script>
        var boostr = new boostr({
            preConnectAll: false,
            preFetchDelay: 0,
            preRenderDelay: 5000,
        });
        boostr.start();
    </script>
    
    
you can even manually trigger booster with javascript like this:

    <script>
        var boostr = new boostr();
        boostr.start();
        boostr.preConnect('http://domain-c.com');
        boostr.preFetch('http://domain-x.com/img.png');
        boostr.preRender('http://domain-a.com');
        boostr.preRender('http://domain-d.com');
    </script>


## License

Copyright (c) 2015 "schliflo" Florian Schlittenbauer

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
let width, height, jscd;

(function (window) {
  {
    const unknown = '-';

    // screen
    var screenSize = '';
    if (screen.width) {
      width = screen.width ? screen.width : '';
      height = screen.height ? screen.height : '';
      screenSize += `${width} x ${height}`;
    }

    // browser
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = `${parseFloat(navigator.appVersion)}`;
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset;
    let verOffset;
    let ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if (
      (nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt(`${version}`, 10);
    if (isNaN(majorVersion)) {
      version = `${parseFloat(navigator.appVersion)}`;
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = !!navigator.cookieEnabled;

    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = document.cookie.indexOf('testcookie') != -1;
    }

    // system
    var os = unknown;
    const clientStrings = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
      { s: 'Windows Vista', r: /Windows NT 6.0/ },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
      { s: 'Windows 98', r: /(Windows 98|Win98)/ },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
      { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: 'Windows CE', r: /Windows CE/ },
      { s: 'Windows 3.11', r: /Win16/ },
      { s: 'Android', r: /Android/ },
      { s: 'Open BSD', r: /OpenBSD/ },
      { s: 'Sun OS', r: /SunOS/ },
      { s: 'Linux', r: /(Linux|X11)/ },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
      { s: 'Mac OS X', r: /Mac OS X/ },
      { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: 'QNX', r: /QNX/ },
      { s: 'UNIX', r: /UNIX/ },
      { s: 'BeOS', r: /BeOS/ },
      { s: 'OS/2', r: /OS\/2/ },
      {
        s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    for (const id in clientStrings) {
      const cs = parseInt(clientStrings[id]);
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
    }

    switch (os) {
      case 'Mac OS X':
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion = `${osVersion[1]}.${osVersion[2]}.${osVersion[3] | 0}`;
        break;
    }

    var flashVersion = 'no check';
    let d;
    let fv = [];
    if (
      typeof navigator.plugins !== 'undefined' &&
      typeof navigator.plugins['Shockwave Flash'] === 'object'
    ) {
      d = navigator.plugins['Shockwave Flash'].description;
      if (
        d &&
        !(
          typeof navigator.mimeTypes !== 'undefined' &&
          navigator.mimeTypes['application/x-shockwave-flash'] &&
          !navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin
        )
      ) {
        // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
        d = d.replace(/^.*\s+(\S+\s+\S+$)/, '$1');
        fv[0] = parseInt(d.replace(/^(.*)\..*$/, '$1'), 10);
        fv[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, '$1'), 10);
        fv[2] = /[a-zA-Z]/.test(d)
          ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10)
          : 0;
      }
    } else if (typeof window.ActiveXObject !== 'undefined') {
      try {
        const a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (a) {
          // a will return null when ActiveX is disabled
          d = a.GetVariable('$version');
          if (d) {
            d = d.split(' ')[1].split(',');
            fv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
          }
        }
      } catch (e) {}
    }
    if (fv.length) {
      flashVersion = `${fv[0]}.${fv[1]} r${fv[2]}`;
    }
  }

  window.jscd = {
    screen: screenSize,
    browser,
    browserVersion: version,
    mobile,
    os,
    osVersion,
    cookies: cookieEnabled,
    flashVersion,
  };
})(this);


(async function() {
   // your page initialization code here
   // the DOM will be available here
  // console.log('window.navigator', window.navigator);
  // console.log('window.navigator', window.navigator);
  // console.log('window.navigator', window.navigator);

  const newData = getBrowserInfo();

  console.log('newData', newData);

  const curruntIp = await getIp();
  console.log('curruntIp', curruntIp);
  const constIp = await getIpinfo(curruntIp);
   console.log('constIp', constIp);

})();

async function getInfoAndStore() {
  const { osVersion } = jscd;
  const nVer = navigator.appVersion;
  const nAgt = navigator.userAgent;
  let browserName = navigator.appName;
  let fullVersion = `${parseFloat(navigator.appVersion)}`;
  let majorVersion = parseInt(navigator.appVersion, 10);
  let nameOffset;
  let verOffset;
  let ix;
  let curruntIp = false;
  curruntIp = null;
  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browserName = 'Opera';
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf('Version')) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browserName = 'Microsoft Internet Explorer';
    fullVersion = nAgt.substring(verOffset + 5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browserName = 'Chrome';
    fullVersion = nAgt.substring(verOffset + 7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browserName = 'Safari';
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browserName = 'Firefox';
    fullVersion = nAgt.substring(verOffset + 8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if (
    (nameOffset = nAgt.lastIndexOf(' ') + 1) <
    (verOffset = nAgt.lastIndexOf('/'))
  ) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  if ((ix = fullVersion.indexOf(';')) != -1)
    fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(' ')) != -1)
    fullVersion = fullVersion.substring(0, ix);

  majorVersion = parseInt(`${fullVersion}`, 10);
  if (isNaN(majorVersion)) {
    fullVersion = `${parseFloat(navigator.appVersion)}`;
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  let OSName = 'Unknown OS';
  if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
  if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS';
  if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX';
  if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux';
  const currentLocation = window.location;

  const isMobile = window.matchMedia('(pointer:coarse)').matches;
  // const ipData = await resolveAfter2Seconds();
  const userAgentInfo = {
    isMobile: isMobile,
    browser_name: browserName,
    version: fullVersion,
    major_version: majorVersion,
    app_name: navigator.appName,
    user_agent: navigator.userAgent,
    os_name: OSName,
    url_hash: currentLocation.hash,
    url_host: currentLocation.host,
    url_hostname: currentLocation.hostname,
    url_href: currentLocation.href,
    url_origin: currentLocation.origin,
    url_pathname: currentLocation.pathname,
    url_port: currentLocation.port,
    url_protocol: currentLocation.protocol,
    url_search: currentLocation.search,
    // campaign_id: idParameter,
    osVersion,
    ip: curruntIp,
    pixelDensity: window.devicePixelRatio,
    colorDepth: screen.colorDepth,
    screenWidth: screen.width,
    screenHeight: screen.height,
    language: navigator.language,
    product: navigator.product,
  };

  console.log('userAgentInfo', userAgentInfo);
  // getPinNumber(userAgentInfo);
}

function getIp() {
  return new Promise((resolve) => {
    // document.addEventListener('DOMContentLoaded', function() {
        // Fetch the IP address from the API
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
            resolve(data.ip);
            // Display the IP address on the screen
            document.getElementById('ip-address').textContent = data.ip;
          })
          .catch(error => {
            console.error('Error fetching IP address:', error);
            resolve(null);
          });
      // });
    });
}

function getIpinfo(ip){
  return new Promise((resolve) => {
    // document.addEventListener('DOMContentLoaded', function() {
        // Fetch the IP address from the API

    const response = fetch(`http://localhost:3000/api/get-ip-info?ip=${ip}`, {
      method: "POST",
      body: JSON.stringify({ ipData: ip }),
    }).then(response => response.json())
          .then(data => {
            resolve(data);
            // Display the IP address on the screen
            // document.getElementById('ip-address').textContent = data.ip;
          })
          .catch(error => {
            console.error('Error fetching IP address:', error);
            resolve(null);
          });
      // });
    });
}

function getBrowserInfo(){

  getInfoAndStore();
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    screenHeight : screen.height,
    screenWidth : screen.width,
    screenAvailWidth : screen.availWidth,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    href: window.location.href,
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    protocol: window.location.protocol,
    language: navigator.language,
    onLine: navigator.onLine,
    appName: navigator.appName,
    appCodeName: navigator.appCodeName,
    product: navigator.product,
  }
}
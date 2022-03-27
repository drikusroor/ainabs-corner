---
title: "Customizable javascript cookie banner"
date: "2021-12-29"
categories: 
  - "notebook"
tags: 
  - "gdrp"
  - "javascript"
---

```js
class CookieBanner {

  dropCookie = true; // false disables the Cookie, allowing you to style the banner
  cookieDuration = 14; // Number of days before the cookie expires, and the banner reappears
  cookieName = 'complianceCookie'; // Name of our cookie
  cookieValue = 'on'; // Value of cookie
  initialBodyPaddingTop = 0;
  message = 'Our website uses cookies. By continuing we assume your permission to deploy cookies, as detailed in our {{privacyPolicy}}.'; // Message displayed on banner
  privacyPolicy = 'privacy policy'; // Privacy policy page text
  privacyPolicyPage = '/privacy-policy/'; // Privacy policy page URL
  closeText = "Close X";
  bodytag;
  background = '#fff';
  fontColor = '#000';
  fontSize = '13px';
  boxShadow = '0 3px 0 0 rgba(0,0,0,0.1)'

  constructor(dto = {}) {

    Object.assign(this, dto);

    window.onload = () => {
      this.bodytag = document.getElementsByTagName('body')[0];
      this.initialBodyPaddingTop = this.bodytag.style.paddingTop;

      if (this.checkCookie(this.cookieName) != this.cookieValue) {
        this.createDiv();
      }
    }
  }

  createDiv() {
    const div = document.createElement('div');
    div.setAttribute('id', 'cookie-law');
    div.style.background = this.background;
    div.style.color = this.fontColor;
    div.style.fontSize = this.fontSize;
    div.style.padding = '.5em';
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.width = '100%';
    div.style.zIndex = "1";
    div.style.boxShadow = this.boxShadow;
    let innerHTML = `
      <p>${this.message}
        <a id="cookieBannerClose" class="close-cookie-banner" href="javascript:void(0);"">
          <span>${this.closeText}</span>
        </a>
      </p>
    `
    innerHTML = innerHTML.replace('{{privacyPolicy}}', `<a href="${this.privacyPolicyPage}" title=${this.privacyPolicy} rel="nofollow" target="_blank">${this.privacyPolicy}</a>`);
    div.innerHTML = innerHTML;
    this.bodytag.insertBefore(div, this.bodytag.firstChild); // Adds the Cookie Law Banner just after the opening <body> tag

    document.getElementById('cookieBannerClose').addEventListener('click', () => {
      this.removeMe();
    });

    const bannerHeight = document.getElementById('cookie-law').offsetHeight;
    this.bodytag.style.paddingTop = `${bannerHeight}px`;

    document.getElementsByTagName('body')[0].className += ' cookiebanner'; //Adds a class tothe <body> tag when the banner is visible
  }

  createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    if (this.dropCookie) {
      document.cookie = name + "=" + value + expires + "; path=/";
    }
  }

  checkCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie(name) {
    this.createCookie(name, "", -1);
  }

  removeMe() {
    var element = document.getElementById('cookie-law');
    element.parentNode.removeChild(element);
    this.bodytag.style.paddingTop = this.initialBodyPaddingTop;

    this.createCookie(this.cookieName, this.cookieValue, this.cookieDuration); // Create the cookie
  }
}

const cookieBanner = new CookieBanner({
  dropCookie: true,
  cookieDuration: 14,
  message: 'Our website uses cookies. By continuing we assume your permission to deploy cookies, as detailed in our {{privacyPolicy}}.',
  privacyPolicy: 'privacy policy',
  privacyPolicyPage: '/privacy-policy/',
  closeText: "Close X",
  background: '#fff',
  fontColor: '#000',
  fontSize: '16px',
  boxShadow: '0 3px 0 0 rgba(0,0,0,0.1)'
});
```

[Source](https://gist.github.com/drikusroor/4b186e0c5e3d015efe5e0575f8641863)

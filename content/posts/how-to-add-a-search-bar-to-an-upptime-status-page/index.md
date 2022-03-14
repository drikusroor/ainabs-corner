---
title: "How to add a search bar to an Upptime status page"
date: "2021-09-23"
categories: 
  - "problems-solutions"
tags: 
  - "github"
  - "upptime"
coverImage: "Screenshot-2021-09-22-232046.png"
---

[Upptime](https://upptime.js.org/) is a very neat tool that allows you to track the status of your websites and creates Github issues whenever a site has downtime. The extra neat aspect of Upptime is that it works entirely on Github. No hosting or cloud provider is necessary whatsoever, it all runs using Github Actions and Github Pages.

Upptime is not perfect (yet) though. It misses some features that would make it perfect for me. One feature would be to group sites together according to my liking. For example, group the APIs and group the front end websites.

Another feature I miss, is a search bar. I have an instance of Upptime running that tracks the status of 30+ websites and I do not particularly like spending time and cognitive energy looking for the status of a specific website.

Luckily, Upptime allows the [injection of custom Javascript](https://upptime.js.org/docs/configuration/#custom-javascript). It is therefore possible to write a script that adds a search bar. And it is also exactly what I did.

Simply edit your `.upptimerc.yml` and add the following line under `status-websites`:

```yaml
status-website:
  js: "class SearchBar { searchInput = null; constructor() { window.addEventListener('load', this.init.bind(this)); } init() { this.setupElements(); this.addEventListeners(); } setupElements() { this.searchInput = this.createSearchBar(); this.updateSites(); } updateSites() { this.sites = document.querySelectorAll('section.live-status article.link'); } addEventListeners() { this.searchInput.addEventListener( 'input', this.handleSearchInputChange.bind(this) ); } handleSearchInputChange(e) { this.updateSites(); const value = e.target.value; this.sites.forEach((siteEl) => { let match = false; const headingEl = siteEl.querySelector('h4 a'); const heading = headingEl.innerHTML; const href = headingEl.getAttribute('href'); if (!value) { match = true; } else { if (heading.toLowerCase().includes(value.toLowerCase())) { match = true; } else if ( href && href.toLowerCase().includes(value && value.toLowerCase()) ) { match = true; } } if (match) { siteEl.style.display = 'block'; } else { siteEl.style.display = 'none'; } }); } createSearchBar() { const listItem = document.createElement('li'); const searchInput = document.createElement('input'); searchInput.setAttribute('type', 'search'); searchInput.setAttribute('placeholder', 'Search'); searchInput.classList.add('search-bar'); searchInput.style.padding = '.5em'; const navItems = document.querySelector('nav ul'); listItem.appendChild(searchInput); navItems.appendChild(listItem); return searchInput; } } new SearchBar();"
```

You can check the (more readable) source code [here](https://gist.github.com/drikusroor/7bf8bc8153495ac5a033d2b6aab9ca78).

Lastly, I am not 100% satisfied about the code. For example, I do not really like querying the site elements every time the user provides new input. In this case, I deemed it necessary because - I think - I cannot control the moment of execution of this inline custom script. And when I do not re-query after input, the initial query happens before Upptime creates the site elements, thereby breaking the search function.

Another nice addition might be to add some debounce on the input. I have not yet tested the performance of this script, but I can imagine some slowdown with a large number of sites.

Please let me know what you think in the comments and don't forget to like the video and subscribe to my channel.

😂

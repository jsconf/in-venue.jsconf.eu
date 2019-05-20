Content in this repo will be shown on the in-venue screens of JSConf/CSSconf EU 2019.

- Each screen and Rasperry Pi has a number.
- See [index.html](https://github.com/jsconf/in-venue.jsconf.eu/blob/gh-pages/index.html) for how the number maps to a particular screen.
- The $number.html file is automatically loaded onto the Rasperry Pi in fullscreen on startup.
- Edit the appropriate $number.html to redirect to the URL that you'd like to show on the screen.

## Updating content

- For bipocit-space and community-lounge there are stub files in the respective directories.
- Content auto-updates when you commit updates GitHub within about 1 minute.
- If you changed JavaScript, update the `version` attribute on the `<html>` element, and the page will reload.

## Local dev

- `npm install`
- `npm run server`
- Go to http://127.0.0.1:9876 in browser.
## JSConf and CSSconf EU digital signage screens

Content in this repo will be shown on the in-venue screens of JSConf/CSSconf EU 2019.

- Each screen and Rasperry Pi has a number.
- See [index.html](https://github.com/jsconf/in-venue.jsconf.eu/blob/gh-pages/index.html) for how the number maps to a particular screen.
- The `r/$number.html` file is automatically loaded onto the Rasperry Pi in fullscreen on startup.
- Edit the appropriate `r/$number.html` to redirect to the URL that you'd like to show on the screen.
- If you change a redirect, restart the respective Raspi.
- Content on a given URL updates automatically.
- You should never need to manually control a Raspi with a mouse or keyboard.

## Stage manager updates

- When ever your track goes into a break, edit [track-control.json](https://github.com/jsconf/in-venue.jsconf.eu/blob/gh-pages/track-control.json) and enter the time of the next session in your track.

## Design

- The screen resolution is 1920x1080 (aka 1080p)
- No need to be responsive, those are the exact pixels. Not more, not less (well except possible overscan at the edges).
- Make sure all desired content actually fits that area since content cannot be scrolled.

## Updating content

- Content auto-updates when you commit updates GitHub within about 1 minute.
- If you changed JavaScript, update the `version` attribute on the `<html>` element, and the page will reload.

## Local dev

- `npm install`
- `npm run server`
- Go to http://127.0.0.1:9876 in browser.

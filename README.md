# equipped

Peer-to-peer tool and equipment rental prototype. No backend — everything runs in the browser.

**Live demo:** https://possiblyphilip.github.io/equipped/

## Run

Needs Node 18+.

```bash
npm install
npm run dev
```

Then open the printed URL on this machine, or the LAN URL on a phone on the same Wi-Fi.

Production build:

```bash
npm run build
npm run preview
```

On iPhone: Share → Add to Home Screen. On Android: menu → Install app.

Desktop shows the app in a phone frame. Phones go full screen.

Listing photos are bundled under `public/images/`. Map tiles come from OpenStreetMap when the network allows; the list still works if they fail.

Reset the demo from Profile.

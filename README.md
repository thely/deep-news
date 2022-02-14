## Basics

Folder structure:

```
- assets/ (*)
- max/: the max patch
- dn-server/: the connecting server between computers
  |- assets (link to *)
- dn-client/: what the user interacts with
  |- src/: JS files for editing
  |- dist/: bundled JS files, for website loading
    |- assets (link to *)
- node_modules/: most/all of the dependencies for dn-server and dn-client go here

```

`/assets` has/will have all the static video files in it. `/client/web/assets/` and `/server/assets` are just links to that folder, so we don't need the same video files in all three places. (The Max patch is set up to reach up 2 folders to access the `/assets` folder.)

## Installation/Basic use

1. [Install Node.](https://nodejs.org/en/download/)
2. Run `node -v` on the command line. Make sure you get something like v14.x.x.
3. Open the base folder (`deep-news`) on the command line.
4. Run `npm install`. This will install everything you need in a `node_modules` folder.
5. Run `npm run watch`. This should start the server, and watch for any updates you make to the JS files, rebuild the bundled JS file, and restart the server as needed.
6. In a browser, go to `localhost:8000`. If you open the patch in `/client/max/`, you should be able to communicate between the two.

## Terminal commands

* `pwd`: what folder am I in? (stands for: print write directory)
* `ls`: what files are in this folder?
* `cd [xx]`: change directory to [xx].
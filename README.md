> :warning: **DEVELOPMENT STOPPED** :warning:
>
> No more development will occure on this project

<p>&nbsp;</p>

# Granity Engine 
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

A [React-Three-Fiber](https://github.com/pmndrs/react-three-fiber) widgets based game engine build with NodeJs as back-end.

![Current State of The Project](https://i.imgur.com/MSxFChH.png)

## Basic Concept
When you create a [React-Three-Fiber](https://github.com/pmndrs/react-three-fiber) project it can be difficult to place your 3D objects on the scene. You don't have any visual support to help you doing that. Well, this project was originally about solving this issue, but evolved in something bigger with the time.

The base idea is to create individuals widgets (that are [React-Three-Fiber](https://github.com/pmndrs/react-three-fiber) components), place them wherever you want on the scene and they will interact between them without any intervention from you (a bit like [Unity](https://unity.com/)).

You can add fields on each widgets that'll be displayed in the editor that you'll be able to get the value from in your React props. 

The goal is to provide you all the tools preset for you so you can focus on what is really important, your game !!

## Key Features

* Create and place programmable widgets on the scene
* Access widgets informations
* Transform widgets on the scene
* Delete widgets
* Copy widgets
* Multiple cameras support
* Key bindings (only with keyboard for now)
* Save your scene
 
## Roadmap
The roadmap elements below are classed in order, but are may subject to change.

### 0.1.0
- [x] Create and place programmable widgets on the scene
- [x] Access widgets informations
- [x] Transform widgets on the scene
- [x] Delete widgets
- [x] Copy widgets
- [x] Multiple cameras support
- [x] Key bindings (only with keyboard for now)
- [x] Save your scene
- [x] Add a history system
- [x] Add a npx command line to setup a clean project
- [x] Switch from a CRA environment to a Vite environment
- [x] Manage multiple scenes
- [x] Auto import widgets
- [x] UI widget type
- [x] Make a flappy bird clone (Flappy poop)

### 0.2.0
- [x] Implement unit testing
- [x] Adding the possibility to change widget name within the scene
- [x] Refactor project in monorepo
- [x] Extract App folder into its own package
- [x] Having a site for the admin and the game separatly
- [x] Remake the UI
- [x] Having multiple themes (one for the game, another for the editor)
- [x] Control Lights by widget instead of hardcoded default ones
- [x] Be able to manipulate the widgets through the UI


### 0.3.0
- [x] Add a basic setup of a dashboard to control some settings such as key bindings


### 0.4.0
- [ ] File system (images, 3D models, etc)
- [ ] Make shortcuts actions available from UI
- [ ] Implement integration test for @granity/engine
- [ ] Some optimisation (code split)
- [ ] Make the app deployable

### 0.5.0
- [ ] Select multiple widgets at the time
- [ ] Group widgets together
- [ ] Support multiplayer

### In a near future
- [ ] A lot of enhancements (there are too much to list them here)
- [ ] Add more field types
- [ ] Add more keyboard shortcuts
- [ ] Fix bugs along the way
- [ ] Refactor the back-end architecture


### Documentation
- [ ] Project installation
- [ ] How it works
- [ ] Document functions in the base code
- [ ] Examples

**And more...**
 
## Documentation

Coming soon...


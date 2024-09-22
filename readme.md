# CommitArt

Transform the Github Contributions Graph to something amazing, fun and beautiful (if you want).

## Introduction

This repository is the `painter` and will add commits inside an other one. So you need to create a `canvas` repository, public or private it doesnt matter. Just make sure to show your private contributions if you choose to have a private canvas repository.

The advantage of using a separate `canvas` repository is that you don't need to delete this one if you want to delete your drawing, but just the canvas.

## Motivations

I saw back in the days a famous Github contributor who wrote "I <3 DevTools" on his contribution board and I was really hyped by it. I thought about it and I wanted to give this tool to the community to make your own contribution board more custom and fun. Let's draw something now !

## Installation

Node >= 20

Run `npm run install`

If you want to start your drawing in the past you will need to have `Docker` and run `docker compose up -d` to launch the VM. We need a VM here because we need to manipulate the date on the machine to trick the commit dates. See below for the detailed instructions to start to draw in the past.

## Requirements

- [Fork this repository](https://github.com/dlepaux/commit-art/fork) to have it in your namespace.
- [Create new repository](https://github.com/new). You can name it: `commit-art-canvas`.
  - Add deploy keys to the canvas repository (with **Allow write access**). I suggest you to follow [this guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) and create the ssh keys inside the VM and save them.

## Configuration

### Environnement Variables
You need to create a `.env` file from the `.env-exemple` and fill the variables.

You also need to create and fill the same variables as Repository Secrets on Github to run the daily drawing check with Github Actions.

**Notes about the configuration**

We need to have your minimal github information to make the commits, if not git will not permits to make some.

We need to have a ssh key to allow the read/write access to the canvas repository to make commits properly.

### Local configuration

See the `config.ts` at the root of the project directory. You have couple of important things to setup before continuing ! Once done you can come back here.

## Instructions

Obviously the first thing you need here is to have your drawing done. See below for detailed information about how it works behind the hood.

### Draw in the past

You need to start docker and execute the `docker compose up -d`. Then go to the terminal and simply execute `npm run setup`. This command will set the date of the VM to a past date and continue doing that until the drawing is finished.

### Draw everyday

You just need to set your drawing in the `config.ts` file, and that's it. The Github Action will run everyday automatically.

## How it works ?

Well, there is couple of things to note here.

First we actually do one fake commit on empty space because it normalize the "background" of the "canvas" on the Github contribution board. And when we need to actually draw a "pixel" we do 100 commits. If you make even more than that in a day, you might need to increase this to avoid having different "opacities".

The principle of drawing things is pretty simple. We use a matrice of 7 "pixels" height max (because we have 7 days in a week, right ?).

So we have something like that:

```
[
  [0,0,0,0,0,1,1,1,1,1],
  [1,0,0,0,0,1,0,1,1,1],
  [1,1,0,0,0,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,0,1,0,0],
  [0,0,1,0,1,0,0,0,0,0],
]
```

A `0` means no pixel, a `1` means... a pixel ! And so we can draw almost anything ! Here is the Chrome Dinosaur.

The tool currently have the latin alphabet with lower and upper cases. Some ponctuation characters as well. Feel free to make a Pull Requests with your set or for any improvements !

## Tests

To test your beautiful drawing just run `npm run print`, and you would typically see something like that:

<div>
  <p align="center">
    <img src="docs/dino.jpg" style="width: auto; height: auto;">
  </p>
</div>

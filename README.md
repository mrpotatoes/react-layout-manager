<!-- npx markdown-toc-gen insert README.md -->
<!-- toc -->

- [Preamble](#preamble)
  - [Do you know about Atomic Design?](#do-you-know-about-atomic-design)
  - [Definitions](#definitions)
  - [What does this matter?](#what-does-this-matter)
- [Problem Space](#problem-space)
- [What I'm hoping to achieve](#what-im-hoping-to-achieve)
  - [To build a suite of layouts & tiles](#to-build-a-suite-of-layouts--tiles)
    - [What](#what)
    - [Why](#why)
  - [Autowire your layouts and tiles](#autowire-your-layouts-and-tiles)
    - [What](#what-1)
    - [Why](#why-1)
  - [Use configuration @ runtime](#use-configuration--runtime)
    - [What](#what-2)
    - [Why](#why-2)
- [Terminology](#terminology)
  - [A brief detour into `State`](#a-brief-detour-into-state)
    - [What](#what-3)
    - [Why](#why-3)
- [The `@mrpotatoes/react-layout-manager` apparatus](#the-mrpotatoesreact-layout-manager-apparatus)
    - [Tile & layout registry](#tile--layout-registry)
    - [IoC container (ish)](#ioc-container-ish)
    - [Dependencies Autowiring](#dependencies-autowiring)
- [What I am NOT doing](#what-i-am-not-doing)
  - [Making a babel/webpack plugin](#making-a-babelwebpack-plugin)
  - [Creating a an Micro-Frontend Framework](#creating-a-an-micro-frontend-framework)
- [Requirements](#requirements)
  - [Components](#components)
  - [Instrumentation](#instrumentation)
- [Proposed API](#proposed-api)
  - [A few functions?](#a-few-functions)
  - [Layouts](#layouts)
  - [Tiles](#tiles)
  - [Are just components](#are-just-components)
- [Configuration](#configuration)
  - [Manual](#manual)
  - [Autowiring](#autowiring)
- [Best Practices](#best-practices)
  - [Tiles (`Features`)](#tiles-features)
    - [Example index.js → `./src/tiles/tile/index.js`](#example-indexjs--srctilestileindexjs)
  - [Layouts](#layouts-1)
- [Footnotes](#footnotes)

<!-- tocstop -->

![screenshot of running demo app](./docs/assets/screenie.png)

## Preamble
### Do you know about Atomic Design? 
![Atomic design diagram → https://snowball.digital/blog/intro-to-atomic-design](./docs/assets/atomic-design-1.png)

### Definitions
| Part | Explained |
|---|---|
| `Atom` | Atoms act as the foundational piece in any design system. eg: Color, typography, and the spacing system. But they can also include HTML elements. eg: Buttons, input fields, or icons. |
| `Molecule` | Items built with `Atom`s. eg: A filter component built with accordions, checkboxes & buttons |
| `Organism` | Bigger than `Atom`s. eg: Headers, footers, pagination |
| `Templates` | Basically a `Page` without content. May contain `Molecules` & `Organisms`. Think "Blueprint for pages" |
| `Pages` | Think: Template with content. This is abstract and not concrete as it's the "end product." |

From: [Intro to Atomic Design](https://snowball.digital/blog/intro-to-atomic-design) - Joona Miettinen

### What does this matter?
I, essentially, want to focus on the `Template` and the resulting `Page` stages. This is where I see some strife in code bases when it comes to writing configurable pages/layouts.

## Problem Space
Look, you're a multi-tenant SaaS provider and every client shares the same database and codebase. Your SaaS product is a news platform with all the bells and whistles. You have a ton of backend endpoints and they are beautiful beyond belief. You can't even imagine it. Your SaaS platform completely API driven. Thing is that now you've decided that you actually need to provide an Admin UI since most of your customers said that it is too expensive and time consuming to build an admin UI themselves.

The only thing is that they want a solution that will not only allow them to add their own content to their websites but also allow for crowd sourced news content.

I bet you're thinking "Simple enough" and it is but your POs & Architects want you to develop 1 codebase but make it configurable and deploy a single UI. So now you're thinking "Let's make this configurable" which is great. That is exactly what we want to do. 

So the Epic would be:
> As a company we want to allow clients to choose their layouts and the tiles that show up on any given page. 

Your questions would likely be

1. How configurable is it? (A: The layout, tiles and styles/theme)
1. The content that shows up in these tiles, how do they work? (A: That comes in via API calls)
1. Where are these configurations going to live? (A: Pushed up on deploy, in JSON "somewhere" or API)
1. Does this need to be async or synchronous? (A: sync)
1. Can layouts have layouts and can tiles have tiles? (A: Tiles yes, Layouts no)
1. Are the tiles their own app ala a Micro-frontend Framework? (A: No)

These are the questions I want to solve in this blog post. I even created a package to handle this work but it wouldn't be production ready as this is just a thought experiment on my part and something that I wanted to play with. Something that I feel would be a really good pattern for others to use. That package would be called `@mrpotatoes/react-layout-manager`. 

## What I'm hoping to achieve
I want a way to loosely couple layouts from components and the data therein. While I'm focusing on layouts this could easily be used with *ANY* `React` component. I'm looking for a way to not only loosely couple these two components but also so that they can be configured with data (where `Tiles` show up, when, their state and props).

### To build a suite of layouts & tiles
<!-- To build a suite of layouts (structure) & tiles (state[ful] components) -->

#### What
The `layout` concept is just a simple stateless component that is just structure. Preferably something that manages no styles of its own and if you were to look at it w/o any components injected into it would be just a bunch of rectangles.

For example consider this image I found on the internet
![blank layout](./docs/assets/readme-layout-example.jpg)

What the layout itself should be concerned with is simply the structure of its regions, how many tiles each region can house, the responsiveness and the like. Maybe even extra metadata like widths, heights and potentially allowed colours but none of this is logic, this is ONLY descriptive of itself.

For instance in the image above in the regions `Image 1` and `Image 2` would be regions that would only house 1 component each (tile) and within each of these regions it would only allow image tiles. 

#### Why
This is important. When we write `React` components we end up doing a lot of hard wiring of components just so that there is interactions between them but what if, instead, you can build all your components in complete isolation? Not at all having to worry about how they will be used in other components nor your layouts. Granted you'll still need to worry about styling but that is not a solution I'm looking to solve here (possibly an update to this tool in the future?) but the fact that your structure and your other components have no coupling together is enormous.

Think of it this way. The layouts and tiles know nothing of each other. They are forced to work with each other via some ruling body (`@mrpotatoes/react-layout-manager`) that tells them where to go and how to behave together. The two types of components (layouts, tiles) only have 2 responsibilities.

1. Their own presentation & state
1. Describing themselves so that they can be properly placed/used and injected (with or into)

### Autowire your layouts and tiles
#### What
Each component has two responsibilities and of those two the self-describing responsibility is used for `Autowire`ing the registry. To put it more succinctly:

> Autowiring is a way for components to be auto registered into the layout manager registry so the engineers do not need to manage this themselves.

#### Why
I don't know about you but I'm tired of writing configuration twice or even once. I would rather describe the component in some way so that I don't need to tell the management system (wherever that lives) where my code lives, how it works, where it goes etc. As a matter of fact I would rather the code itself to describe the component ala static-time compilation (note to self: find right term for this).

### Use configuration @ runtime
#### What
#### Why
To allow you to write configuration for your SaaS websites w/o having to hand write your layouts for each SaaS client.

## Terminology
Some of the terms I'm using correlate to `Atomic Design` but I'm using different terms so that it isn't Atomic focused. Meaning, that while what I'm discussing here is influenced by `Atomic Design` it is a flavor of it for engineers so different terms will be useful. Also, while they are similar I do not believe they are a 1:1 mapping to `Atomic Design`. Lastly, as I noted above that this is _inspired_ by `Atomic Design` this blog post/series only cares about the last two stages of `Atomic Design`.

| Library Term | Principle/Definition | `Atomic Design` Alias |
|:-:|:-|:-|
| `Tile` | Any `React` component that can be injected into a layout. Whereas `Atomic Design` differentiates between the bottom 3 stages in this library there is no consideration made for these types of components. While I believe this is a good idea to do in your own platforms for here it doesn't matter. A component should maintain its own state, actions and behaviors. A tile is a combination of any/every stage previous to `Template` in `Atomic Design` | `Molecule` / `Organism` |
| `Layout` | The layout in which we can further inject components | Template |
| `Region` | A section within a `Layout` where a tile can be placed | `N/A` |
| `Page` | The end result that is rendered to the page for an end user to interact with. The page would also contain components that pull in state |  `N/A` |

### A brief detour into `State`
`Layouts` do not manage or maintain state. They are dumb. Your `Tiles` should maintain their own state and how they operate with others. That is up to you on how to do that but I do, of course, have an example of how that can work with the library/idea that I'm proposing.

#### What
#### Why

## The `@mrpotatoes/react-layout-manager` apparatus

#### Tile & layout registry
A simple object that holds the React Components for later use and allows for easy retrieval. Works with the new React Context and provides hooks to pull components when required. It also allows for conditions to store different components with the same key and some other cute features that I found in `react-registry` that I am forking for this project.

#### IoC container (ish)
Some components will need state, some will need props and others will need other components to be passed in. That would be the purpose of the IoC container. Which would work in conjunction with the registry.

#### Dependencies Autowiring
I don't know about you but I don't like writing configuration nor do I like having to configure, well, anything. I like things to work "out of the box" and I'm willing to buy into an eco system to do just that as everyone's time is limited if I'm going to have stress hooking up someone else's poorly put together library is not very high on my list of things to do. Never mind "well built" libraries or frameworks where I still have issues getting some things to run for various reasons. 

So, if I have to describe my components much like I would need to with TypeScript then I'd rather that and let some daemon running in the background to pick it up and do whatever is a preferred option. Basically convention over configuration with the option to configure when I need to. Chef's kiss.

Mind you I'd rather not have to do even that. I would prefer the computer instinctively know but we aren't there yet. Unless you use Haskell then you're there. No more types is baller if you ask anyone that is named Andric LibreSinn and they are often correct about things.

## What I am NOT doing
### Making a babel/webpack plugin
To statically build these pages for end-user runtime performance. While I feel like this would be an amazing addition to this blog post I'm not looking to write a plugin for either of those monsters. Esp when I'd have to consider the different languages that I'd have to support in order to get it to work. Though, at the end of the day, I think it's the right thing to do but it would have to be some sort of macro, I believe, if it were to be able to inject the code in the right place.

Although, it would be trivial to find this component and replace it using `Webpack` or `Babeljs`
```jsx
<Registry region="SimpleBody::header" />
```

### Creating a an Micro-Frontend Framework
There are plenty of these that exist and they do them very well. While I'm a big fan of MFEs I am not going to write another one. Also, even if these layouts are built at runtime it would still work within an MFE and work very well. Even more flexibility in the end.

## Requirements
As I've been writing this I've been pulling requirements and I'll be putting them here

Note: This is all still up in the air and I'm trying to pull out the requirements but this, I don't think at least now, is the best format. Will revisit.

### Components
| Layout Prop | Requirement |
|---|---|
| `size` | The tile sizes allowed in this region |
| `types` | The tile types allowed |
| `region` | Region name |
| `visible` | Visible when loaded (is stateful and managed elsewhere and will be hidden as required) |
| `lazy` | Lazy load the tiles in this region? Useful when things are below the fold |
| `async` | false default, if true then this region is will be loaded eventually |
| `skeleton` | Show as skeleton state when loading? |

| Tiles | Requirement |
|---|---|
| Describe layout | Size, allowed types, region size |

### Instrumentation
| Autowire | Requirement |
|---|---|
| Describe layout | Size, allowed types, region size |

## Proposed API

### A few functions?
These functions are to map your existing components with in order to give them some extra "good ness" but really it's so that they can be more easily managed by the layout library.

| Function | Explain |
|---|---|
| `withLayout` | Wrap a component in this to give it the state that the library will provide. It will also allow for describing the layout. |
| `withTile` | Wrap a component in this to give it the state that the library will provide. It will also allow for describing the tile. |

### Layouts
A layout is a simple component with "no styles" where its primary purpose is to be a structure for the content that will be provided to it. Now, this isn't realistic because a layout is going to require a grid regardless so to that I say that the layout component itself should not have embedded styles. It's best if that component is basically bare. Take this example for instance

```jsx
/**
 * A layout that supports
 *   - Header
 *   - Body section
 *   - Footer
 */
export const SimpleBody = () => (
  <div>
    <Container fluid>
      {/* Primary header */}
      <Row sz={sizes.large} >
        <Col>
          {registry('SimpleBody::header')}
          {/* Or alternatively */}
          <Registry region="SimpleBody::header" />
        </Col>
      </Row>

      {/*Wide body*/}
      <Row sz={sizes.full} >
        <Col>
          {registry('SimpleBody::body')}
          {/* Or alternatively */}
          <Registry region="SimpleBody::body" />
        </Col>
      </Row>

      {/*Fat footer*/}
      <Row sz={sizes.mega} >
        <Col>
          {registry('SimpleBody::footer')}
          {/* Or alternatively */}
          <Registry region="SimpleBody::footer" />
        </Col>
      </Row>
    </Container>
  </div>
)
```

Sure, these components most likely have their own styles and this could determine it's sizes (`sz={sizes.large} >`) or even how it looks when shrunk down but the layout itself should be just the structure. Remember, layouts don't care nor should they know about state. Keep state strictly out of the layout code. They should be the dumbest of components. It's your **tiles** that carry, maintain and update state.

When this is written expect something similar to this:

```jsx
export default layout('SimpleBody', ({ registry }) => (
  <Row>
    <Col>
      {registry('body')}
      {/* Or alternatively */}
      <Registry region="body" />
    </Col>
  </Row>
))
```

Notice the `{registry('SimpleBody::footer')}`. This would pull in all the tiles that are registered to both the `SimpleBody` layout and `footer` region. This would not only render them all but it will configure everything for that component and will inject any props/components into those tiles that are required.

If state is required for any of the tiles those will also be injected. Currently all state management will be done using `@reduxjs` and specifically the `@reduxjs/toolkit` abstraction to make life a bit easier (less boilerplate).

### Tiles
### Are just components
But wrapped.

A `Tile` is just a wrapped component that comes with some extra fancy details.

I want to go over the `withTile` enhancer function. When putting together a component 

```jsx
const about = {
  type: '',
  size: {
    height: 4,
    width: 2,
  },
}

const deps = {
  onChange: '',
  title: '',
  component: '',
}

const SomeComponent = withTile('key', ({ onChange, title, component }) => {
  return (
    <div onClick=(clicky_clicky>
      Component with state
    </div>
  )
}, deps, about)
```

## Configuration
### Manual
### Autowiring

## Best Practices
### Tiles (`Features`)
I suggest writing everything together as a `feature` much like you'd see in a project that uses `@redux/toolkit`. It is not "A given" that a `tile` will contain state or complex behavior that would need to be hooked up with other `tile`s and components but it is a given that they will be more complex than a simple button or typography component.

In this case I suggest putting all your tiles into a `./features` or `./tiles` like directory wherein you'd find a similar folder structure:

```
/path/to/application/or/library
  /src
    /components
    /tiles
      /carousel
        index.js // The tile entry point
        hooks.js // The hooks your tile provides, if any
        tile.js // The configuration for your tile
        state.js // Redux Toolkit code (reducer, selectors, etc)
        types.ts // If you were writing TS all types required by your feature
      /card
        index.js // The tile entry point
        hooks.js // The hooks your tile provides, if any
        tile.js // The configuration for your tile
        state.js // Redux Toolkit code (reducer, selectors, etc)
        types.ts // If you were writing TS all types required by your feature
    /layouts
    /store
    index.js
```

What you'll see is that in each tile directory contains everything that the tile requires. It lives in isolation because it's written as if it were it's own publishable package[^tile-directory]. Remember that since your `./tiles/tile/index.js` is the entrypoint that all important exports go in here as well. Look below for a short example.

#### Example index.js → `./src/tiles/tile/index.js`
```jsx
import * as TileTypes from './types'
import state from './state'
import { useSomething } from './hooks'

const SomeComponent = ({ _clicky }) => (
  <div onClick=(clicky_clicky>
    Component with state
  </div>
)

export SomeComponent;
export state;
export useSomething;
```

### Layouts


---
A note on dependency injection. I've always disliked how "Object Oriented" focused the term is and doesn't get into why it's actually useful outside of OOP. OOP isn't the only methodology an honestly it's kind of gross when you can use functional and do things in ways that make so much more sense and is overall cleaner. It's harder to explain it though when everyone's basis is the '`new`' keyword.

You want to inject deps because sometimes you need to swap things out. It's simple as that.

Tests are a great example of this. Let's take this code for example. If you wanted to _unit_ test this you couldn't and so your best bet is to do full regression every time manually.

```js
const main = async () => {
  // Business logic 1
  const someData = await fetch('/some/url')
  logger.info(someData)

  // Business logic 2
  const someOtherData = await fetch('/some/other/url')
  logger.info(someOtherData)

  // Business logic 3
  const results = await db('SELECT * FROM my_table')
  logger.info(results)
}
```

The next best bet is to not do this at all and instead your function signature could be something similar to the following code. This allows your test to inject the function your testing with a `logger` (so it doesn't pollute the test output) and your `db` so you aren't doing actual DB calls. Easy peasy.

```js
const main = async (logger, db) => { }
```

There. That's dependency injection. Sorted.

Well, not really but it's the best example/reasoning imo. You can use it to do more on your runtime applications but I prefer to keep it as minimal as possible. The more interweaving dependancies and code that you're running the more complex and fragile your end-application will be.


--- 
# TODO
* Don't forget to us `peer-dependencies` when creating the new `react-registry`

--- 
# References, Footnotes & Bibliography

## Footnotes
[^tile-directory]: Granted this isn't super accurate as your `tile` would still import code from the rest of this application think of it more like each `tile` directory is a package that is published and it only exposes the API that would allow you to use it properly. So your `index.js` file would contain the exports for the other files as well if they are required for the use of this particular `tile`.


<!-- 

TODO
  - Fix state to ignore service worker stuff
  - Start cleaning up react-registry
  - Keep ./api directory as I will most likely use it for API request stuff.
  - Turn this into a monorepo as it's getting out of hand now

-->
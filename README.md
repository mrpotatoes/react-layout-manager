<!-- npx markdown-toc-gen insert README.md -->
<!-- toc -->

- [Problem Space](#problem-space)
- [What I'm hoping to achieve](#what-im-hoping-to-achieve)
  - [The `@mrpotatoes/react-layout-manager` apparatus](#the-mrpotatoesreact-layout-manager-apparatus)
    - [Tile & layout registry](#tile--layout-registry)
    - [IoC container (ish)](#ioc-container-ish)
    - [Dependencies Autowiring](#dependencies-autowiring)
- [What I am NOT doing](#what-i-am-not-doing)
  - [Making a babel/webpack plugin](#making-a-babelwebpack-plugin)
  - [Creating a an Micro-Frontend Framework](#creating-a-an-micro-frontend-framework)
- [Proposed API](#proposed-api)
  - [Layouts](#layouts)
  - [Tiles](#tiles)
  - [Just components](#just-components)
- [Configuration](#configuration)
    - [Manual](#manual)
    - [Autowiring](#autowiring)

<!-- tocstop -->

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
1. Are the tiles their own app ala a Microfrontend Framework? (A: No)

These are the questions I want to solve in this blog post. I even created a package to handle this work but it wouldn't be production ready as this is just a thought experiment on my part and something that I wanted to play with. Something that I feel would be a really good pattern for others to use. That package would be called `@mrpotatoes/react-layout-manager`. 

## What I'm hoping to achieve
I want a way to handle configurable layouts

1. To allow you to build a suite of layouts (structure) and tiles (components that show up within the layouts)
1. To allow you to autowire your layouts and tiles
1. To allow you to write configuration for your SaaS websites w/o having to hand write your layouts for each SaaS client.

### The `@mrpotatoes/react-layout-manager` apparatus

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
To statically build these pages for end-user runtime performance. While I feel like this would be an amazing addition to this blog post I'm not looking to write a plugin for either of those monsters. Esp when I"d have to consider the different languages that I'd have to support in order to get it to work. Though, at the end of the day, I think it's the right thing to do but it would have to be some sort of macro, I believe, if it were to be able to inject the code in the right place.

### Creating a an Micro-Frontend Framework
There are plenty of these that exist and they do them very well. While I'm a big fan of MFEs I am not going to write another one. Also, even if these layouts are built at runtime it would still work within an MFE and work very well. Even more flexibility in the end.

## Proposed API
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
        </Col>
      </Row>

      {/*Wide body*/}
      <Row sz={sizes.full} >
        <Col>
          {registry('SimpleBody::body')}
        </Col>
      </Row>

      {/*Fat footer*/}
      <Row sz={sizes.mega} >
        <Col>
          {registry('SimpleBody::footer')}
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
    </Col>
  </Row>
))
```

Notice the `{registry('SimpleBody::footer')}`. This would pull in all the tiles that are registered to both the `SimpleBody` layout and `footer` region. This would not only render them all but it will configure everything for that component and will inject any props/components into those tiles that are required.

If state is required for any of the tiles those will also be injected. Currently all state management will be done using `@reduxjs` and specifically the `@reduxjs/toolkit` abstraction to make life a bit easier (less boilerplate).

### Tiles
### Just components

## Configuration
#### Manual
#### Autowiring

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

The next best bet is to not do this at all and instead your function signature could be something similar to the following code. This allows your test to inject the function you're testing with a `logger` (so it doesn't pollute the test output) and your `db` so you aren't doing actual DB calls. Easy peasy.

```js
const main = async (logger, db) => { }
```

There. That's dependency injection. Sorted.

Well, not really but it's the best example/reasoning imo. You can use it to do more on your runtime applications but I prefer to keep it as minimal as possible. The more interweaving dependancies and code that you're running the more complex and fragile your end-application will be.
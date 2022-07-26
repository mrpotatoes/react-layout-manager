## Layout manager
I have had an idea to create layouts in such a fashion where they are injectable with components and parameters so that one can focus on "tiles" or "blocks" in a `Drupal` context. Where they are placed is managed by data (yaml/json file) and can be stored as configuration. This allows loosely coupling layout from onscreen components and it's data.

The exact method for this is still unknown to me but that is what this repo is for.

### Development Process
1. Finding an injector (or writing my own fast one) is focus #1.
1. Integrating with `React.Context` and `React.Provider`
1. The config setup for building it up
1. Writing a `Babel` plugin (and/or TypeScript's equivalent) to compile these pages into full JSX to save on runtime performace.

## DI containers
### What
These are just to look at and see how to use within `React`. Some of these sound really interesting so I may or may not write my own that would better suit the needs of the layout manager. I need something SIMPLE and small.

### Reasoning
I plan to do this specifically for this layout manager test and do not plan to pubish it (blog post at most) and 

### Requirements
* `register` →  method/function. Params
  * `string` → Key for the value/function to retrieve
  * `any` → The value to retrieve
  * `<T>` → Parameters to pass to the second param
    * Can be a static value or an existing dep
* `retrieve`/`tiles` → A way to get something based on key
* `factory` → Saw this earlier, might be useful to have a place to create new instances of things with default params. Still researching
* `async` handling?
- Factories?
- Autowire-ing → https://github.com/zazoomauro/node-dependency-injection ([this file](https://github.com/zazoomauro/node-dependency-injection/blob/master/lib/Autowire.js) & [this documentation](https://github.com/zazoomauro/node-dependency-injection/wiki/Autowire))
- Conditional keys
- How to get data/props (hooks up with `redux`?)
- 
- 
- 


### References
* https://github.com/fjorgemota/jimple
* ~~https://github.com/tests-always-included/dizzy~~
* ~~https://github.com/zazoomauro/node-dependency-injection~~
* ~~https://github.com/ssnau/injecting~~
* ~~https://github.com/andrewmunsell/needlepoint~~
* ~~https://github.com/zhang740/power-di~~
* ~~https://github.com/inversify/InversifyJS~~
* ~~https://github.com/tsgautier/node-majic~~
* ~~https://github.com/angie-framework/angie-injector~~
* ~~https://github.com/jeffijoe/awilix~~

```
layout manager
  routes
    -> generic page component
      -> layout components
        -> configuration
```

---
## Current view
Component registry
```yml
# A layout registry and their sections.
layouts:
  SomeLayout
    navigation
    sidebar::left
    sidebar::right
    footer
  AnotherLayout
  BlogListing
  BlogPost
  AlbumImage
  GalleryImage
  Gallery
  AlbumListing
  Recipe

# A component registry with required params/props to be used. 
# Don't know if/how state would be used.
tiles
  navigationTile
    prop1
    prop2
    prop3
  footer
    prop1
    prop2
    prop3
  sidebars
    prop1
    prop2
    prop3
  rss
  aboutus
```

Layout configuration
```yml
# The configurations for the layouts
layout-config
  SomeLayout
    navigation
      navigationTile
    sidebar::left
      sidebars1
    sidebar::right
    footer
      rss
      aboutus
```

Layout component
```jsx
RLM.layout('SomeLayout') // Set the layout you want to retrieve from
const SomeLayout = () => (
  <div>
    <div>
      {RLM.retrieve('navigation', params)}
    </div>
    <div>
      {RLM.tiles('sidebar::left', params)}
    </div>
    <div>
      {RLM.tiles('sidebar::right', params)}
    </div>
    <div>
      {RLM.retrieve('footer', params)}
    </div>
  </div>
)
```

---
## Glossary
| Term/Thing | Definition |
|---|---|
| `RLM` | `react-layout-manager` |
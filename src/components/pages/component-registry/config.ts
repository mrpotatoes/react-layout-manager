/* eslint-disable import/no-anonymous-default-export */
import { Card } from '../../../features/card'
import { CardReverse } from '../../../features/card-reverse'
import { HeroImage } from '../../../features/heroimage'

// Layouts and tiles are the configurations that must exist in code as they are React components.
export const layouts = { }

// Layouts and tiles are the configurations that must exist in code as they are React components.
export const tiles = {
  card: Card,
  cardReverse: CardReverse,
  heroimage: HeroImage,
}

export const variants = {
  '1': {
    short: 'Basic variant',
    desc: 'The simplest variant that we could use. All the components are static and don\'t require props. There is no difference between this and manually adding components into another component.',

    // A nested thingy of components where each set of tiles is an array. This doesn't make sense, just look
    regions: {
      region1: {
        tiles: [{
          key: 'card',
          tile: Card,
        }, {
          key: 'cardReverse',
          tile: CardReverse,
        }, {
          key: 'heroimage',
          tile: HeroImage,
        }],
      },
      region2: [],
      region3: [],
      region4: [],
      region5: [],
      region6: [],
    },
  },
  '2': {
    short: 'Component w/props',
    desc: 'Some components will require props. These props can be any primative, object, functions or another component (bad practice]). These props are automatically injected once configured.',
    components: [],
  },
  '3': {
    short: 'Nested components',
    desc: 'Components that require other components. What if we have components that require other components? Here I will explain if that is possible, how they are automatically injected and all setup.',
    components: [],
  },
  '4': {
    short: 'Async Components',
    desc: 'Good lord just use an MFE framework. The fuck do you expect from me? Get outta here. Jeez',
    components: [],
  },
}

Previous owner: Joe Esposito <joe@devnet.io>

I am taking this library that they put together and

1. Update it to newest `React`
    - This means that I will need to update the context functionality
    - Convert all the classes stuff to functions (most of it is static anyway)
    - Remove things that aren't component specific
1. Clean out the comments so that they are accurate again (apply `tsdoc`)
1. Formatting
    - No more 4 space tabs
    - anon functions
1. Rename all the functions/types
1. Extract the DI from it
1. If there is any IoC then extract that too
1. Convert `./src/Registered.tsx` into a functional component
1. Move ALL `I*` types to a `./src/types.ts` file
    - Might just remove as these are primarily `class` interfaces and I won't be using classes for this
1. Make `ComponentEntry` a simple object factory function (not curried, just returns an object)
1. Convert `dictionary.ts` to `dictionary.yml`
    - Must use this plugin -> https://parceljs.org/languages/yaml/
1. Logger can stay as a class 

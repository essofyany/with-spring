# Comments & Thoughts

- **Why I didn’t use CSS for animation?**

  From the first look at the video that demonstrate what the final result should look like, I decided to not use pure CSS or any CSS framework or CSS preprocessor for animation. and that related to that this is a react project so animating components in some stages in a component lifecycle (mount, unmount) will be hard to achieve and keep overall code maintainable. In addition using CSS keyframes or just plain animation properties isn’t a good idea and its not scalable.

- **Why react-spring?**

  Simply react-spring is a animation library that works perfectly with react and meant for solving the problems listed above. This is the first time I use react-spring, I usually use framer-motion for complex animation, I always wanted to try react-spring and this test was perfect for it. react-spring has a great and simple api that is flexible enough to cover you at all stages of your components lifecycle.

- **Why Zustand for state management?**
  At the beginning I heavily used hooks like useState, useRefs, and useEffect all across the test, which makes tracking states harder due to some components aren’t at the same level and share the same state. Because of that I choose Zustand which is a simple and light weight library for state management, by using it there will be one single source of truth and all components became more isolated and independent of other components, and this makes the code more maintainable and scalable.

- **Why I didn't test all components?**
  I've spent the majority of time at react-pring docs so lack of time is one reason, the second reason is that testing components with a lot of animations doesn't make any sense especially with unit testing, e2e testing with UI snapshot comparaison will be a great choice.  

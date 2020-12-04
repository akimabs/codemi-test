## React Native - Codemi Test

## Feature

- Typescript (Type safe)
- Hooks (React state and lifecycle)
- Redux (State management)

## How to run

```bash
# running by local

git clone https://github.com/akimabs/codemi-test

yarn / npm install

react-native run-android / ios
```

## Project structure

```bash
.
├── assets                                # assets for this app
│   ├── fonts.                            # customable font
│   ├── images                            # all image for this app
├── assets                                # download app here
│   ├── codemi-test.apk                   # all image for this app
├── src
│   ├── components                        # customable component
│   │   ├── buttton
│   │   ├── text
│   │   ├── textinput
│   │   ├── toast
│   ├── routes                            # all routing apps in here
│   │   ├── index.tsx
│   ├── screens                           # screeen apps
│   │   ├── auth
│   │   ├── home
│   │   ├── qr-scan
│   ├── store                             # handling redux
│   │   ├── _actions
│   │   ├── _reducers
│   │   ├── store.ts
│   ├── themes                            # for design system
│   │   ├── index.ts
│   ├── utils                             # helper data
├── App.tsx                               # contain all wrapper to run project
└── README.md                             # you read this file
```

- Author - [Abdul Hakim](https://linkedin.com/in/ahakimdul/)

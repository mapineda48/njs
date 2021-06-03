# mapineda-cra

Minimal overwrite react-scripts config without eject.

## Before Installation

Before use it you should do bootstrapping with [Create React App](https://github.com/facebook/create-react-app).

## Installation

`$ yarn add mapineda48-cra`

## Usage

### Configurations

set on `package.json`

```json
{
  "react-scripts": {
    "main": {
      "entry": "my/custom/path/entry.js",
      "output": "my/custom/path/build.js",
      "url": "my/custom/url"
    },
    "default": "main"
  }
}
```

### start

configuration default entry

```shell
yarn mapineda --start
```

argument entry

```shell
yarn mapineda --start my/path/entry.js
```

argument entry alias

```shell
yarn mapineda --start main
```

### build

configuration default entry

```shell
yarn mapineda --build
```

argument alias

```shell
yarn mapineda --build main
```

argument entry and argument build

```shell
yarn mapineda --build my/entry.jsx --output my/build
```

## License

MIT

**Free Software, Hell Yeah!**

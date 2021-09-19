# mapineda-cra

Minimal overwrite react-scripts config without eject.

## Before Installation

Before use it you should do bootstrapping with [Create React App](https://github.com/facebook/create-react-app).

## Installation

`$ yarn add mapineda48-cra`

## Usage

### Configurations

set in `react.json` on root project.

```json
{
  "app": {
    "foo": {
      "entry": "my/custom/path/entry.js",
      "output": "my/custom/path/build.js",
      "url": "my/custom/url"
    },
    "bar": {
      "entry": "my/custom/path/entry.js",
      "output": "my/custom/path/build.js",
      "url": "my/custom/url"
    }
  },
  "main": "foo"
}
```

### start

configuration default entry

```shell
yarn mp
```

argument entry

```shell
yarn mp my/path/entry.js
```

argument entry alias

```shell
yarn mp foo
```

### build

configuration default entry

```shell
yarn mp --build
```

argument alias

```shell
yarn mp --build main
```

argument entry and argument build

```shell
yarn mp --build --output my/path/build my/entry.jsx
```

## License

MIT

**Free Software, Hell Yeah!**

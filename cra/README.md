# mapineda-cra

Minimal overwrite react-scripts config without eject.

## Before Installation

Before bootstrapping with [Create React App](https://github.com/facebook/create-react-app).

## Installation

`$ yarn add mp48-cra`

## Usage

### Configurations

set in `cra.json` on root project.

```json
{
  "app": {
    "foo": {
      "entry": "my/custom/path/entry.js"
    },
    "bar": {
      "entry": "my/custom/path/entry.js",
      "template": "public/my/custom/path/index.html"
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

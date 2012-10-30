## MapMaker for Node.js

### Installation

```shell
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev
npm install
```

### Usage

The app is run in the following form:

```shell
./map.js <map-file> [tilesheet-size] [tile-size]
```

If `tilesheet-size` is not specified it defaults to `1024`.
If `tile-size` is not specified it defaults to `16`.
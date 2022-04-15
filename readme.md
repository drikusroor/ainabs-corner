# Ainab's corner &middot; [![CI](https://github.com/drikusroor/ainabs-corner/actions/workflows/main.yml/badge.svg)](https://github.com/drikusroor/ainabs-corner/actions/workflows/main.yml)

Ainab's blog, made possible using Hugo static site generator.

## How to use

First, install [Hugo](https://gohugo.io/)

#### Clone this repo

```sh
git@github.com:drikusroor/ainabs-corner.git
```

#### Get git submodule

```sh
git submodule update --init
```

#### Build website

```sh
./build.sh
# or
hugo --config config.toml,config.production.toml -D
```

#### Develop website

```sh
# watch mode
hugo server -D -w

# poll mode (every 1s)
hugo server -D --poll 1000
```

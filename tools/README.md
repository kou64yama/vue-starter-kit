# Build Automation Tools

### `yarn start` (`start.ts`)

- Cleans up the output `/build` directory (`clean.ts`)
- Copies static files to the output folder (`copy.ts`)
- Launches [Webpack](https://webpack.github.io/) compiler in a watch mode (via
  [webpack-middleware](https://github.com/kriasoft/webpack-middleware))
- Launches Node.js server from the compiled output folder (`runServer.ts`)
- Launches [Browsersync](https://browsersync.io/) and
  [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement)

### `yarn run build` (`build.ts`)

- Cleans up the output `/build` folder (`clean.ts`)
- Copies static files to the output folder (`copy.ts`)
- Creates application bundles with Webpack (`bundle.ts`, `webpack.config.ts`)

### `yarn run deploy` (`deploy.ts`)

- Builds the project from source files (`build.ts`)
- Pushes the contents of the `/build` folder to a remote server with Git

## Options

| Flag        | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `--release` | Minimizes and optimizes the compiled output                                         |
| `--verbose` | Prints detailed information to the console                                          |
| `--analyze` | Launches [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer) |
| `--static`  | Renders [specified routes](./render.ts#L15) as static html files                    |
| `--docker`  | Build an image from a Dockerfile                                                    |
| `--silent`  | Do not open the default browser                                                     |

For example:

```sh
$ yarn run build --release --verbose      # Build the app in production mode
```

or

```sh
$ yarn start --release                    # Launch dev server in production mode
```

## Misc

- `webpack.config.ts` - Webpack configuration for both client-side and
  server-side bundles
- `postcss.config.js` - PostCSS configuration for transforming styles with JS
  plugins
- `run.ts` - Helps to launch other scripts with `ts-node` (e.g. `ts-node tools/run build`)

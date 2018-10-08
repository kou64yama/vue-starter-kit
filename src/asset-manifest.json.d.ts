interface AssetManifest {
  'client.js': string;
  'vendors.js': string;
}

declare const assets: AssetManifest;

export = assets;

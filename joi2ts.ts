import { convertFromDirectory } from 'joi-to-typescript';

convertFromDirectory({
  schemaDirectory: './src/helpers/joi',
  typeOutputDirectory: './src/types',
  debug: true,
  useLabelAsInterfaceName: true,
  omitIndexFiles: true,
  treatDefaultedOptionalAsRequired: false,
  defaultToRequired: true,
  supplyDefaultsInType: false,
  sortPropertiesByName: false,
  fileHeader: "import * as ENUMS from './enums';\nimport { Errors } from './Errors';",
  ignoreFiles: ['joiGeneric.ts'],
  // TODO remove requestObjects.ts, responseObjects.ts, joiValidator.ts
});

import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../dbconfig.js');

const sequelize = new Sequelize(config.db);

export default sequelize;

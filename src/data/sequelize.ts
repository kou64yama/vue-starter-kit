/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import Sequelize, { Op } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.databaseUrl, {
  operatorsAliases: Op as any,
  define: {
    freezeTableName: true,
  },
});

export default sequelize;

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import DataType, { Instance } from 'sequelize';
import Model from '../sequelize';

interface UserLogin {
  name: string;
  key: string;
}

const UserLogin = Model.define<Instance<UserLogin> & UserLogin, UserLogin>(
  'UserLogin',
  {
    name: {
      type: DataType.STRING(50),
      primaryKey: true,
    },

    key: {
      type: DataType.STRING(100),
      primaryKey: true,
    },
  },
);

export default UserLogin;

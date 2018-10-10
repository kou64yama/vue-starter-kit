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

interface UserClaim {
  type: string;
  value: string;
}

const UserClaim = Model.define<Instance<UserClaim> & UserClaim, UserClaim>(
  'UserClaim',
  {
    type: {
      type: DataType.STRING,
    },

    value: {
      type: DataType.STRING,
    },
  },
);

export default UserClaim;

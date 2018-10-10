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
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';

interface User {
  id?: string;
  email: string;
  emailConfirmed?: boolean;
  logins?: UserLogin[];
  claims?: UserClaim[];
  profile?: UserProfile;
}

const User = Model.define<Instance<User> & User, User>(
  'User',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },

    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

export default User;

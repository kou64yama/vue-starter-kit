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

interface UserProfile {
  userId?: string;
  displayName?: string;
  picture?: string;
  gender?: string;
  location?: string;
  website?: string;
}

const UserProfile = Model.define<
  Instance<UserProfile> & UserProfile,
  UserProfile
>('UserProfile', {
  userId: {
    type: DataType.UUID,
    primaryKey: true,
  },

  displayName: {
    type: DataType.STRING(100),
  },

  picture: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.STRING(50),
  },

  location: {
    type: DataType.STRING(100),
  },

  website: {
    type: DataType.STRING(255),
  },
});

export default UserProfile;

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import { GraphQLFieldConfig } from 'graphql';
import { Request } from 'express';
import UserType from '../types/UserType';

interface Source {
  request: Request;
}

const me: GraphQLFieldConfig<Source, any, {}> = {
  type: UserType,
  resolve: ({ request }) =>
    request.user && {
      id: request.user.id,
      email: request.user.email,
    },
};

export default me;

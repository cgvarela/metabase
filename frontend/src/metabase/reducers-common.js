/* @flow */

// Reducers shared between "main" and "public" apps

import auth from "metabase/auth/auth";

/* ducks */
import app from "metabase/redux/app";
import requests from "metabase/redux/requests";
import settings from "metabase/redux/settings";
import undo from "metabase/redux/undo";
// eslint-disable-next-line import/no-named-as-default
import entities from "metabase/redux/entities";

/* user */
import { currentUser } from "metabase/redux/user";

export default {
  // global reducers
  app,
  auth,
  currentUser,
  requests,
  settings,
  undo,
  entities,
};

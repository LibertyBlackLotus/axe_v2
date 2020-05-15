import { combineReducers } from 'redux';

import user from './user';
import ax from './ax';
import read from './read';
import praise from './praise';
import comment from './comment';
import userFollows from './userFollows';
import collection from './collection';

export default combineReducers({
	user,
	ax,
	read,
	praise,
	comment,
	userFollows,
	collection,
});
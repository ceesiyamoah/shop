import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ShopNavigator from './navigation/ShopNavigator';
import productReducer from './store/reducer/productReducer';

const rootReducer = combineReducers({
	products: productReducer,
});
const store = createStore(rootReducer);

export default function App() {
	return (
		<Provider store={store}>
			<ShopNavigator />
		</Provider>
	);
}

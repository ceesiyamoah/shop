import PRODUCTS from '../../data/dummy';

const initialState = {
	availableProducts: [...PRODUCTS],
	userProducts: PRODUCTS.filter((product) => product.userOwner === 'u1'),
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 1:
			return { ...state, ...payload };

		default:
			return state;
	}
};

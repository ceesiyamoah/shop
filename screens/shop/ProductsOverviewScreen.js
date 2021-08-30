import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
const ProductsOverviewScreen = ({ products }) => {
	console.log(products);
	return (
		<View style={styles.screen}>
			<FlatList
				data={products}
				renderItem={({ item }) => (
					<View>
						<Text>{item.title}</Text>
						<Text>{item.price}</Text>
						<Text>{item.description}</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

ProductsOverviewScreen.navigationOptions = () => {
	return {
		headerTitle: 'All Products',
	};
};

const mapStateToProps = (state) => ({
	products: state.products.availableProducts,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsOverviewScreen);

import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import keys from '../../.env/keys';

const WelcomeScreen = () => {
	const [nasaAPODimage, setNasaAPODimage] = useState(null);
	useEffect(() => {
		async function fetchNasaImage() {
			console.log('sending request');
			/*TODOs:
			 *extract api call
			 *save response to asyncLocal storage
			 *check date and make request if data is outdated
			 */
			try {
				//keys.nasaAPODapiKey
				fetch(
					`https://api.nasa.gov/planetary/apod?api_key=${keys.nasaAPODapiKey}`
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.error) {
							console.error(data.error);
						}
						console.log(data);
						setNasaAPODimage(data);
					});
			} catch (error) {
				console.error(`error while fetching data from NASA API: ${error}`);
			}
		}
		console.log('useEffect');
		fetchNasaImage();
	}, []);

	return (
		<SafeAreaView>
			<ScrollView>
				{nasaAPODimage && (
					<View style={styles.screen}>
						<Image style={styles.image} source={{ uri: nasaAPODimage.hdurl }} />
						<View style={styles.imageTitle}>
							<Text style={styles.text}>
								снимка на деня от NASA : {nasaAPODimage.title}
							</Text>
						</View>
						<View style={styles.textContainer}>
							<Text>{nasaAPODimage.explanation}</Text>
						</View>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	image: {
		width: 350,
		height: 300,
		borderRadius: 10,
	},
	imageTitle: {
		padding: 15,
	},
	textContainer: {
		alignContent: 'flex-start',
		justifyContent: 'space-around',
		padding: 15,
	},
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'blue',
	},
});

export default WelcomeScreen;

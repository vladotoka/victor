import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
				fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
					.then((res) => res.json())
					.then((data) => {
                        if(data.error) {console.error(data.error)}
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
			{nasaAPODimage && (
				<View style={styles.screen}>
					<Image style={styles.image} source={{ uri: nasaAPODimage.hdurl }} />
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							снимка на NASA на деня: {nasaAPODimage.title}
						</Text>
						<Text>{nasaAPODimage.explanation}</Text>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	image: {
		width: 350,
		height: 300,
	},
	textContainer: {
		alignContent: 'flex-start',
        justifyContent: 'space-around',
        padding: 15
	},
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'blue',
	},
});

export default WelcomeScreen;

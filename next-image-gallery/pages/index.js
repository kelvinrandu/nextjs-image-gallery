import React,{ useState} from "react"
import Head from "next/head";
import { Box, Container, Text } from "@chakra-ui/react";
import { getCuratedPhotos } from "../lib/api";

export default function Home({ data }) {
	const [photos,setPhotos] = usestate(data);
	return (
		<>
			<Head>
				<title> NextJS Image Gallery</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box
				overflow="hidden"
				bgGradient="linear(to-r, green.200, pink.500)"
				minH="100vh"
			>
				<Container>
					<Text
						color="pink.900"
						fontWeight="bold"
						mb="1rem"
						textAlign="center"
						textDecoration="none"
						fontSize={["4xl", "4xl", "5xl", "5xl"]}
					>
						NextJS Image Gallery
					</Text>
				</Container>
			</Box>
		</>
	);
}
export async function getServerSideProps() {
	const data = await getCuratedPhotos();
	return {
		props: {
			data,
		},
	};
}

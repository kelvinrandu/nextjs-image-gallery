import React, { useState } from "react";
import Head from "next/head";
import {
	Box,
	Container,
	Text,
	Wrap,
	WrapItem,
	Input,
	IconButton,
	InputRightElement,
	InputGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import { getCuratedPhotos, getQueryPhotos } from "../lib/api";
import { SearchIcon } from "@chakra-ui/icons";

export default function Home({ data }) {
	const [photos, setPhotos] = useState(data);
	const [query, setQuery] = useState("");

	const handleSubmit = async (e) => {
		await e.preventDefault();
		const res = await getQueryPhotos(query);
		await setPhotos(res);
		await setQuery("");
	};
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
					<form onSubmit={handleSubmit}>
						<InputGroup pb="1rem">
							<Input
								color="black"
								placeholder="Search for Apple"
								variant="ghost"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>

							<InputRightElement
								children={
									<IconButton
										aria-label="Search"
										icon={<SearchIcon />}
										onClick={handleSubmit}
										bg="pink.100"
										color="black"
									/>
								}
							/>
						</InputGroup>
					</form>
				</Container>
				<Wrap px="1rem" spacing={4} justify="center">
					{photos.map((photo) => (
						<WrapItem
							key={photo.id}
							boxShadow="base"
							rounded="20px"
							overflow="hidden"
							bg="white"
							lineHeight="0"
							_hover={{ boxShadow: "dark-lg" }}
						>
							<Image
								src={photo.src.portrait}
								height={600}
								width={400}
								alt={photo.url}
							/>
						</WrapItem>
					))}
				</Wrap>
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

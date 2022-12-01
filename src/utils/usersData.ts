import fetchNode from 'node-fetch';
async function getUserData(): Promise<any> {
	try {
		const resp = await fetchNode(process.env.API_KEY as string);
		const data = await resp.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export default getUserData;

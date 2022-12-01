import fetchNode from 'node-fetch';
async function getUserData(): Promise<any> {
	try {
		return await (await fetchNode(process.env.API_KEY as string)).json();
	} catch (error) {
		console.log(error);
	}
}

export default getUserData;

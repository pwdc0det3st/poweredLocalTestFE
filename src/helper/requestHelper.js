const apiResources = require('../module/globalApiResources/apiResources');
class Request {

	static requestWithBody = async (url, method, data, token) => {
		console.log('Request: ' + method + ' ' + url + ' with data = ' + data);
		let fetchRequest = await fetch(url, {
			method: method,
			headers: apiResources.headers,
			body: JSON.stringify(data)
		});

		console.log(fetchRequest)

		return  fetchRequest.json();
	}

	static requestWithoutBody = async (url, method, token) => {
		console.log('Request: ' + method + ' ' + url);
		
		let fetchRequest = await fetch(url, {
			method: method,
			headers: apiResources.headers,
		});

		console.log(fetchRequest)

		return fetchRequest.json();
	}
}

export default Request;
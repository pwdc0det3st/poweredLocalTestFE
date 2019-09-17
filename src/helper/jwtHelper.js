import privatekey from '../config/privatekey';
import publickey from '../config/publickey';
import ReactNativeRsa from 'react-native-rsa';

const constant_resources = require('../config/res');

const rsa = new ReactNativeRsa();

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = privatekey();
var publicKEY = publickey();

rsa.setPublicString(publicKEY);
rsa.setPrivateString(privateKEY);

export default class JwtHelper {
	sign = (payload, $Options) => {
	console.log('hello4')

		/*
		 sOptions = {
		  issuer: "Authorization/Resource/This server",
		  subject: "iam@user.me", 
		  audience: "Client_Identity" // this should be provided by client
		 }
		*/
		// Token signing options
		var signOptions = {
			// issuer: $Options.issuer,
			// subject: $Options.subject,
			// audience: $Options.audience,
			// expiresIn: "30d",    // 30 days validity
			algorithm: constant_resources.jwtEncryptionAlgo
		};
		// console.log('hello5')
		return rsa.encrypt(payload);
		// console.log('hello6')
		// return 'abc';
	}
	verify = (token, $Option) => {
		/*
		 vOption = {
		  issuer: "Authorization/Resource/This server",
		  subject: "iam@user.me", 
		  audience: "Client_Identity" // this should be provided by client
		 }  
		*/
		var verifyOptions = {
			// issuer: $Option.issuer,
			// subject: $Option.subject,
			// audience: $Option.audience,
			// expiresIn: "30d",
			algorithm: constant_resources.jwtEncryptionAlgo
		};
		try {
			return jwt.verify(token, privateKEY, verifyOptions);
		} catch (err) {
			return false;
		}
	}
	decode = (token) => {
		return jwt.decode(token, { complete: true });
		//returns null if token is invalid
	}
}
module.exports = {
	db: 'mongodb://katanhich:catanhi@ds031952.mongolab.com:31952/testnode',
	port: 3000,
	facebook: {
		clientID: '844420158945521',
		clientSecret: '238fbcf3c2f03775a164cad5de5dc0b3',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	google: {
		clientID: '85833505718-368pve69ea8jq415nnisisuam31chnv5.apps.googleusercontent.com',
		clientSecret: 'EA2_YCMIyhamFihmIZ1WCrWE',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
}

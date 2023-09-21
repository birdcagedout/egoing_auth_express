module.exports = {
	isLogged: function(req) {
		return req.session.isLogged;
	},
	
	getNickname: function(req) {
		return req.session.nickname;
	}
};
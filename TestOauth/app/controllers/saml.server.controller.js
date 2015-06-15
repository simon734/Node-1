/**
 * @author Cao Hong Phuoc
 */
'use strict';

module.exports.redirectAfterLogin = function (req, res) {
	var url = req.session.redirect + '?client_id=' + req.session.client_id +
		'&redirect_uri=' + req.session.redirect_uri;
	res.redirect(url);
};

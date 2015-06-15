/**
 * @author Cao Hong Phuoc
 */

module.exports.renderAuthorizePage = function (req, res, next) {

	req.session.redirect = req.path;
	req.session.client_id = req.query.client_id;
	req.session.redirect_uri = req.query.redirect_uri;

  	if (!req.user) {
    	return res.redirect('/login');
  	}

  	res.render('authorise', {
  		client_id: req.query.client_id,
	    redirect_uri: req.query.redirect_uri
	});
};

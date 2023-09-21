const express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');
// const url = require('url');
// const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template');


const authData = {
	email: 'muzom97@naver.com',
	password: '1111',
	nickname: 'muzom97'
};



// 로그인(login)
router.get('/login', (req, res) => {
	// console.log('/login 페이지 진입');

	var title = 'WEB - Login';

	var list = template.list(req.list);
	var html = template.html(title, list, 
		`
		<form action="/auth/login_process" method="post">
			<p>
				<input type="text" name="email" placeholder="email">
			</p>
			<p>
				<input type="password" name="password" placeholder="password">
			</p>
			<p>
				<input type="submit" value="Login">
			</p>
		</form>
	`, 
	'');

	res.send(html);
});




// 로그인 처리(login_process)
router.post('/login_process', (req, res) => {
	// console.log('/login_process 진입');

	var post = req.body;
	var email = post.email.trim();
	var password = post.password.trim();
	// console.log(`email: ${email}, password: ${password}`);

	if(email === authData.email && password === authData.password) {
		// 세션 정보 추가
		req.session.isLogged = true;
		req.session.nickname = authData.nickname;

		// 로그인 세션정보(추가된 속성 포함)는 아직 메모리에 있다 ==> store를 파일로 정했다면 시간이 걸린다 
		// 따라서 redirection 전에 세션이 파일에 저장되었음을 확실히 해두어야 한다
		req.session.save( (err) => {
			if(err) throw err;
			// console.log(req.session);
			res.redirect('/');
		});
	} else {
		res.send('Who?');
	}
});


// 세션을 destroy할 때 redirection 전에 cookie를 지워주어야 한다.
// https://github.com/valery-barysok/session-file-store/issues/26
const options = require('../main');

// 로그아웃(logout)
router.get('/logout', (req, res) => {
	req.session.destroy(
		(err) => {
			if(err) throw err;
			res.clearCookie(options.name); 
			res.status(302).redirect('/');
		}
	);
});



module.exports = router;

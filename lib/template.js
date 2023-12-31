// 모듈로 분리


// 전체 HTML
var template = {
	html: function (title, list, body, control, isLogged=false, nickname='') {
		var logTag = (isLogged === true) 
			? `${nickname}님 반갑습니다. | <a href="/auth/logout">Logout</a>` 
			: `<a href="/auth/login">Login</a>`;

		return `
		<!doctype html>
		<html>
		<head>
			<title>WEB - ${title}</title>
			<meta charset="utf-8">
		</head>
		<body>
			${logTag}
			<h1><a href="/">WEB</a></h1>
			${list}
			${control}
			${body}
		</body>
		</html>`;
	},

	// 글 목록(item)
	list: function (fileList) {
		var list = '<ul>';
		for(let i=0; i < fileList.length; i++) {
			list += `<li><a href="/topic/${fileList[i]}">${fileList[i]}</a></li>`;
		}
		list += '</ul>';
		return list;
	}
};

module.exports = template;		// 외부에서 사용하도록
const {
	getAllMovies,
	getSingleMovie,
	createMovie,
	updateMovie,
	deleteMovie,
} = require('../../controllers/movies');

describe('Test Handlers', function () {
	test('responds to /', () => {
		const req = {};

		const res = {
			text: '',
			statusCode: 0,
			status: function (codeStatus) {
				this.statusCode = codeStatus;
			},
			send: function (input) {
				this.text = input;
			},
		};
		console.log('🚀 ~ test ~ res:', res);
		const response = getAllMovies(req, res);

		expect(res.statusCode).toEqual(200);
	});
});

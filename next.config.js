const withFonts = require("next-fonts");
module.exports = withFonts({
	webpack(config, options) {
		return config;
	},
});

// require("dotenv").config();

// module.exports = {
// 	env: {
// 		OWM_API_KEY: process.env.OWM_API_KEY,
// 	},
// };

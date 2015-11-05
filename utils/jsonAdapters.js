
var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

var reviveDates = function(key, value){
	var match;
	if (typeof value === "string" && (match = value.match(regexIso8601))) {
		var milliseconds = Date.parse(match[0]);
		if (!isNaN(milliseconds)) {
			return new Date(milliseconds);
		}
	}
	return value;
};

module.exports = {
	reviveDates
}
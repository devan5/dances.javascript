/*_______
with dances

	called: nativeExtend

	version: 1.0

	firstDate: 2013.06.18

	lastDate: 2013.06.18

	require: [
		""
	],

	effect: [
		+. {effects},
		+. {effects}
	],

	log: {
		"v1.0": [
			+. {logs},
			+. {logs}
		]
	}

_______*/

(function(dances){
	var _ = {};

	_.forEach = "function" === typeof Array.forEach ?
		Array.forEach :
		function(arr, fn){
			var len,
				i,
				fHas
				;

			fHas = Object.prototype.hasOwnProperty;

			for(i = 0, len = arr.length; i < len; i++){
				fHas.call(arr, i) && fn(arr[i], i, arr);
			}

		}
	;

	dances && window.define && define.amd && define.amd.dancesNative && define(function(){
		dances._ = _;
		return _;
	});

})(window.dances);
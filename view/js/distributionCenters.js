function DistributionCenters() {

	var buildEntity = function(distributionCenterDetails){
		return {
			name: distributionCenterDetails.down('.name input').getValue(),
			calendar: calendars.buildEntity(distributionCenterDetails),
			prepareDuration: distributionCenterDetails.down('.prepareDuration input').getValue(),
			routePoint: JSON.parse(distributionCenterDetails.down('.address .routePoint').getValue()),
			externalCode: {
				externalCode: distributionCenterDetails.down('.externalCode').getValue(),
				origin: distributionCenterDetails.down('.origin').getValue()
			}
		};
	};

	return {
		buildEntity: buildEntity
	};

};

var distributionCenters = new DistributionCenters();

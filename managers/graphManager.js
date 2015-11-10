var mongoose = require('mongoose');
var e = require('../entities');

var scheduleGraphUpdate = function(routePoints){
		boolean needUpdate = false;

    var initialPoints = [].concat(points);
    var finalPoints = [].concat(points);

    var directionLegs = getDirectionLegs(points);
    for (var initialPoint : initialPoints) {

        for (var finalPoint : finalPoints) {
            var isUpdated = isUpdated(directionLegs, initialPoint, finalPoint);
            if (isUpdated == null) {

                var newLeg = new e.DirectionLeg();
                newLeg.initialPoint = initialPoint;
                newLeg.finalPoint = finalPoint;
                newLeg.markedToUpdate = new Date();
                newLeg.save();
                needUpdate = true;

            } else if (!isUpdated) {

                var directionLeg = getDirectionLeg(directionLegs, initialPoint, finalPoint);
                if (!directionLeg.markedToUpdate) {
                    directionLeg.lastTimeMarkedToUpdate = new Date();
                    directionLeg.save();
                    needUpdate = true;
                }
            }
        }
    }
    return needUpdate;
}

var getNextBatchToUpdate = function() {
	// Pega todos initialPoints dos DirectionLegs e faz um ranking de mais aclamados
	// Pra cada initialPoint, monta um lista de finalPoints

	e.DirectionLeg.agregate([
		{$match: {markedToUpdate:  true}},
		{$group: {_id: '$initialPoint', total: {$sum: '1'}}},
		{$sort: {total: 1}},
		{$limit: 25}
	], function(err, initialPoints){
		console.log('aa');

		//var ids = [];
		//initialPoints.each(function(item){ids.push(item.id)});

		//e.DirectionLeg.find({markedToUpdate: true})
		//.populate({ path: 'initialPoint', match: {_id: initialPoint}})
		//.populate('finalPoint')
		//.select('finalPoint')
		//.exec(function(err, finalPoints){

		});
	});
}

var getDirectionLeg = function(directionLegs, initialPoint, finalPoint) {
    for (var directionLeg : directionLegs) {
        var sameInitialPoint = initialPoint.equals(directionLeg.getInitialPoint());
        var sameFinalPoint = finalPoint.equals(directionLeg.getFinalPoint());
        if (sameInitialPoint && sameFinalPoint) {
            return directionLeg;
        }
    }
    return null;
}

var getDirectionLegs = function(points) {
	e.DirectionLeg.find()
        String queryString =
                new StringBuilder() //
        			.append("select leg from") //
        			.append(DirectionLeg.class.getName()) //
        			.append(" leg ") //
                    .append(" where leg.initialPoint in (:points) and leg.finalPoint in (:points) ") //
                    .toString();

        Query query = this.em.createQuery(queryString);
        query.setParameter("points", points);
        query.setHint("org.hibernate.cacheable", true);
        return Sets.newHashSet(query.getResultList());
    }

    private DirectionLeg getDirectionLeg(DeliveryPoint initialPoint, DeliveryPoint finalPoint) {
        String queryString =
                new StringBuilder().append("select leg from") //
                .append(DirectionLeg.class.getName()) //
                .append(" leg ") //
                .append(" where leg.initialPoint =:initialPoint and leg.finalPoint=:finalPoint ") //
                .toString();

        Query query = this.em.createQuery(queryString);
        query.setParameter("initialPoint", initialPoint);
        query.setParameter("finalPoint", finalPoint);
        query.setHint("org.hibernate.cacheable", true);
        return (DirectionLeg) query.getSingleResult();
    }

    /**
     * Returns true if there is a {@link DirectionLeg} and it's updated.
     * Returns false if there is a {@link DirectionLeg} but it's out of date.
     * Returns null if there isn't a {@link DirectionLeg}
     */
    var isUpdated = function(directionLegs, initialPoint, finalPoint) {
			if(!directionLegs || !initialPoint || !finalPoint){
				return null;
			}

			var result = null;
			directionLegs.each(function(directionLeg){

			});

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -1);
        Date oneMonthAgo = cal.getTime();

        // verifica se existe uma leg com tais pontos e se essa leg esta na validade
        for (DirectionLeg directionLeg : directionLegs) {
            Boolean sameInitialPoint = initialPoint.equals(directionLeg.getInitialPoint());
            Boolean sameFinalPoint = finalPoint.equals(directionLeg.getFinalPoint());
            if (sameInitialPoint && sameFinalPoint) {
                if (directionLeg.getLastTimeUpdate().before(oneMonthAgo)) {
                    return false;
                }
                return true;
            }
        }
        return null;
    }

    private void createOrUpdateLegs(Set<DirectionLeg> directionLegs) {
        Date now = new Date();
        // pra cada leg do parametro: verifica se ja existe no banco, se existir, atualiza. Caso contrario, cria.
        for (DirectionLeg directionLeg : directionLegs) {
            DirectionLeg attachedLeg = this.em.find(DirectionLeg.class, directionLeg.getId());
            if (attachedLeg != null) {
                attachedLeg.setDistance(directionLeg.getDistance());
                attachedLeg.setDuration(directionLeg.getDuration());
                attachedLeg.setLastTimeUpdate(now);
                this.em.merge(attachedLeg);
            }
            this.em.persist(directionLeg);
        }
    }

	@Override
	public Set<Tuple<RoutePoint, RoutePoint, Double>> getCostMatrix(
			DistributionCenter distributionCenter, List<Order> freeOrders) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Tuple<RoutePoint, RoutePoint, Double>> getTimeMatrix(
			DistributionCenter distributionCenter, List<Order> freeOrders) {
		// TODO Auto-generated method stub
		return null;
	}
}

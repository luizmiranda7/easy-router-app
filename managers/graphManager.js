var mongoose = require('mongoose');
var e = require('../entities');

var scheduleGraphUpdate = function(routePoints){
	boolean needUpdate = false;
	
    var initialPoints = [].concat(points);
    var finalPoints = [].concat(points);

    var directionLegs = getDirectionLegs(points);
    for (var initialPoint : initialPoints) {

        for (var finalPoint : finalPoints) {
            var isUpdated = this.isUpdated(directionLegs, initialPoint, finalPoint);
            if (isUpdated == null) {

                var newLeg = new e.DirectionLeg();
                newLeg.initialPoint = initialPoint;
                newLeg.finalPoint = finalPoint;
                newLeg.markedToUpdate = new Date();
                newLeg.save();
                needUpdate = true;

            } else if (!isUpdated) {

                DirectionLeg directionLeg = this.getDirectionLeg(directionLegs, initialPoint, finalPoint);
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

    @Override
    public MapAPIRequest getNextBatchToUpdate() {
        StringBuilder initialPointSb =
                new StringBuilder(
                        "select new MutablePair<RoutePoint, Integer>(initialPoint, count(initialPoint)) as count from ");
        initialPointSb.append(DirectionLeg.class.getName());
        initialPointSb.append(" as directionLeg ");
        initialPointSb.append(" join directionLeg.initialPoint as initialPoint ");
        initialPointSb.append(" where directionLeg.markedToUpdate > directionLeg.lastUpdateTime ");
        initialPointSb.append(" group by initialPoint ");
        initialPointSb.append(" order by count(initialPoint) desc ");

        Query initialPointQuery = this.em.createQuery(initialPointSb.toString());
        initialPointQuery.setMaxResults(25);
        List<Pair<RoutePoint, Integer>> initialPointResult = initialPointQuery.getResultList();

        Set<RoutePoint> finalPoints = Sets.newHashSet();
        for (Pair<RoutePoint, Integer> pair : initialPointResult) {
            RoutePoint initialPoint = pair.getKey();

            StringBuilder finalPointSb = new StringBuilder("select finalPoint from ");
            finalPointSb.append(DirectionLeg.class.getName());
            finalPointSb.append(" as directionLeg ");
            finalPointSb.append(" join directionLeg.finalPoint as finalPoint ");
            finalPointSb.append(" where directionLeg.markedToUpdate > directionLeg.lastUpdateTime ");
            finalPointSb.append(" and initialPoint=:initialPoint ");
            finalPointSb.append(" order by directionLeg.markedToUpdate desc ");
            Query finalPointQuery = this.em.createQuery(finalPointSb.toString());
            finalPointQuery.setParameter("initialPoint", initialPoint);
            finalPoints.addAll(finalPointQuery.getResultList());
        }

        StringBuilder finalPointSb =
                new StringBuilder(
                        " select new MutablePair<DirectionLeg, Integer>(directionLeg, count(directionLeg)) as count from ");
        finalPointSb.append(DirectionLeg.class.getName());
        finalPointSb.append(" as directionLeg ");
        finalPointSb.append(" join directionLeg.finalPoint as finalPoint ");
        finalPointSb.append(" where directionLeg.markedToUpdate > directionLeg.lastUpdateTime ");
        finalPointSb.append(" and finalPoint in (:finalPoints) ");
        finalPointSb.append(" group by directionLeg ");
        finalPointSb.append(" order by count(directionLeg) desc ");
        Query finalPointQuery = this.em.createQuery(finalPointSb.toString());
        finalPointQuery.setParameter("finalPoint", finalPoints);
        finalPointQuery.setMaxResults(25);
        List<Pair<DirectionLeg, Integer>> finalPointResult = initialPointQuery.getResultList();

        // verificar se final point + initial point = 100 em combinação
        Integer finalPointSize = finalPointResult.size();
        Integer initialPointSize = initialPointResult.size();
        Integer totalCombination = finalPointSize * initialPointSize;
        while (totalCombination > 100) {
            finalPointSize = finalPointSize > 10 ? finalPointSize-- : finalPointSize;
            initialPointSize = initialPointSize > 10 ? initialPointSize-- : initialPointSize;
            totalCombination = initialPointSize * finalPointSize;
        }

        finalPointResult = finalPointResult.subList(0, finalPointSize);
        initialPointResult = initialPointResult.subList(0, initialPointSize);

        List<RoutePointDTO> finalFinalPoints = Lists.newArrayList();
        List<RoutePointDTO> finalInitialPoints = Lists.newArrayList();
        for (Pair<DirectionLeg, Integer> pair : finalPointResult) {
            finalFinalPoints.add(pair.getKey().getFinalPoint().toDTO());
        }
        for (Pair<RoutePoint, Integer> pair : initialPointResult) {
            finalInitialPoints.add(pair.getKey().toDTO());
        }

        return new MapAPIRequest(finalInitialPoints, finalFinalPoints);
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
     *
     * @param directionLegs
     * @param initialPoint
     * @param finalPoint
     * @return
     */
    private Boolean isUpdated(Set<DirectionLeg> directionLegs, RoutePoint initialPoint, RoutePoint finalPoint) {
        Preconditions.checkNotNull(initialPoint);
        Preconditions.checkNotNull(finalPoint);

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

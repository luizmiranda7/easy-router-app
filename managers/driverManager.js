var entities = require('../entities');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

var findAbleDrivers = function(DistributionCenter distributionCenter){
	return sequelize.query('SELECT * FROM easy_drivers driver '
		+ ' join easy_orders order on order.driver_id = driver '
		+ ' where order.delivered = true ', { model: Driver })
	.then(function(drivers){
  		return drivers;
	});
}


package br.com.luizmiranda.easyrouter.manager.impl;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.google.common.collect.Sets;

import br.com.luizmiranda.easyrouter.entity.DistributionCenter;
import br.com.luizmiranda.easyrouter.entity.Driver;
import br.com.luizmiranda.easyrouter.entity.Route;
import br.com.luizmiranda.easyrouter.manager.DriverManager;

public class DriverManagerBean implements DriverManager {

	private static final long serialVersionUID = -2653652312447158739L;
	
	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Set<Driver> findAbleDrivers(DistributionCenter distributionCenter) {
		StringBuilder sb = new StringBuilder(" select driver from ");
		sb.append(Driver.class.getName());
		sb.append(" driver ");
		sb.append(" left join ");
		sb.append(Route.class.getName());
		sb.append(" route on route.driver = driver");
		sb.append(" where driver.currentDistributionCenter=:distributionCenter ");
		sb.append(" and route.executed = true ");
		
		Query query = this.em.createQuery(sb.toString());
		query.setParameter("distributionCenter", distributionCenter);
		List<Driver> drivers = query.getResultList();
		return Sets.newHashSet(drivers);
	}

}

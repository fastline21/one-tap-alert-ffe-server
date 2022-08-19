const { Router } = require('express');
const serviceFactory = require('./serviceFactory');
const expressWrapper = require('../utilities/expressWrapper');

const getWhere = ({ where, primary, parent, req } = {}) => {
	const primaryConstraint = getConstraint(primary, req);
	const parentalConstraint = getConstraint(parent, req);
	return { ...where, ...primaryConstraint, ...parentalConstraint };
};

const getConstraint = ({ key, param, target }, req) => {
	const constraint = {};
	if (key && req.params[param]) {
		constraint[key] = req.params[param];
	}
	if (target) {
		return { ...constraint, ...target };
	}
	return constraint;
};

module.exports = (
	model,
	path = '',
	primary = { key: '_id', param: 'id' },
	parent = {}
) => {
	const baseRouter = new Router();
	const baseService = new serviceFactory(model);

	// Fetch All
	baseRouter.get(
		`/${path}`,
		expressWrapper((req) =>
			baseService.fetchAll({ where: getWhere({ primary, parent, req }) })
		)
	);

	// Fetch One
	baseRouter.get(
		`/${path}:${primary.param}`,
		expressWrapper((req) =>
			baseService.fetch({ where: getWhere({ primary, parent, req }) })
		)
	);

	// Create
	baseRouter.post(
		`/${path}`,
		expressWrapper((req) =>
			baseService.create({
				entry: { ...req.body, ...getConstraint(parent, req) },
			})
		)
	);

	// Put
	baseRouter.put(
		`/${path}`,
		expressWrapper((req) =>
			baseService.put({
				collection: req.body,
				primaryKey: primary.key,
				constraint: getConstraint(parent, req),
			})
		)
	);

	// Patch
	baseRouter.patch(
		`/${path}:${primary.param}`,
		expressWrapper((req) =>
			baseService.update({
				where: getWhere({ primary, parent, req }),
				body: req.body,
			})
		)
	);

	// Delete
	baseRouter.delete(
		`/${path}:${primary.param}`,
		expressWrapper((req) =>
			baseService.delete({ where: getWhere({ primary, parent, req }) })
		)
	);

	//Search
	baseRouter.post(
		`/${path}search`,
		expressWrapper((req) =>
			baseService.search({
				where: req.body,
			})
		)
	);

	return baseRouter;
};

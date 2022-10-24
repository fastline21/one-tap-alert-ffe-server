const db = require('../../config/initConnection');

module.exports = class serviceFactory {
  constructor(model) {
    this.model = model;
  }

  async fetch({ where, attributes, include, order, raw }) {
    const sequelize = await db();

    if (!attributes) {
      attributes = { exclude: ['date_added', 'date_modified', 'date_deleted'] };
    }

    const result = await sequelize.models[this.model].findOne({
      where,
      attributes,
      include,
      order,
      raw,
    });

    if (!result) {
      throw Error(`Entry Not Found`);
    }

    return result;
  }

  async fetchAll({ where, attributes, include, order, limit, raw }) {
    const sequelize = await db();

    if (!attributes) {
      attributes = { exclude: ['date_added', 'date_modified', 'date_deleted'] };
    }

    return await sequelize.models[this.model].findAll({
      where,
      attributes,
      include,
      order,
      limit,
      raw,
    });
  }

  async create({ entry, raw }) {
    const sequelize = await db();

    const result = await sequelize.models[this.model].create(entry);

    return raw ? result.toJSON() : result;
  }

  async put({ collection, primaryKey, constraint }) {
    if (!Object.keys(constraint).length) {
      throw Error(`Unable to perform PUT on a core resource`);
    }

    const existing = await this.fetchAll({ where: constraint });

    for (const entry of collection) {
      if (!entry[primaryKey]) {
        await this.create({ entry: { ...entry, ...constraint } });
        continue;
      }

      for (const record of existing) {
        if (record[primaryKey] === entry[primaryKey]) {
          await this.update({
            where: {
              [primaryKey]: record[primaryKey],
              ...constraint,
            },
            body: entry,
          });
          break;
        }
      }
    }

    for (const record of existing) {
      if (
        !collection.some((entry) => entry[primaryKey] === record[primaryKey])
      ) {
        await this.delete({
          where: { [primaryKey]: record[primaryKey], ...constraint },
        });
      }
    }

    return await this.fetchAll({ where: constraint });
  }

  async update({ where, body }) {
    const entry = await this.fetch({ where });
    if (!entry) {
      console.error(`Entry Not Found`);
      return;
    }

    return await entry.update(body);
  }

  async delete({ where }) {
    try {
      const entry = await this.fetch({ where });
      if (!entry) {
        throw Error(`Entry Not Found`);
      }

      return await entry.destroy();
    } catch (error) {
      console.error(error);
    }
  }
};

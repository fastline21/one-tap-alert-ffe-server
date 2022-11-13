module.exports = (sequelize) => {
  const { models } = sequelize;

  models.users.hasOne(models.user_types, {
    foreignKey: 'id',
    sourceKey: 'user_type_id',
  });

  models.users.hasOne(models.user_types, {
    foreignKey: 'id',
    sourceKey: 'user_type_id',
  });

  models.emergencies.hasOne(models.users, {
    foreignKey: 'id',
    sourceKey: 'user_id',
    as: 'user',
  });

  models.emergencies.hasOne(models.users, {
    foreignKey: 'id',
    sourceKey: 'responder_id',
    as: 'responder',
  });

  models.emergencies.hasOne(models.emergency_types, {
    foreignKey: 'id',
    sourceKey: 'emergency_type_id',
  });

  models.emergencies.hasOne(models.emergency_statuses, {
    foreignKey: 'id',
    sourceKey: 'emergency_status_id',
  });

  models.emergencies.hasOne(models.emergency_proofs, {
    foreignKey: 'emergency_id',
    sourceKey: 'id',
  });

  models.users.hasOne(models.barangays, {
    foreignKey: 'id',
    sourceKey: 'barangay_id',
  });

  models.users.hasOne(models.contact_persons, {
    foreignKey: 'user_id',
    sourceKey: 'id',
  });

  models.users.hasOne(models.user_statuses, {
    foreignKey: 'id',
    sourceKey: 'user_status_id',
  });
};

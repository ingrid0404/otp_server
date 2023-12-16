module.exports = function(sequelize, DataTypes) {
    return sequelize.define('OTP', {
        id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4,},
        otp: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        expiration_time:{type: DataTypes.DATE},
        verified:{type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true},
        created_at:{type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn('now')},
        updated_at:{type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn('now')}},
        {tableName: 'OTP'}
    );
};
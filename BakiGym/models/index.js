const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos
const User = require('./User'); // Importa el modelo User
const Feedback = require('./Feedback'); // Importa el modelo Feedback
const Trainer = require('./Trainer'); // Importa el modelo Trainer
const Class = require('./Class'); // Importa el modelo Class
const Reservation = require('./Reservation'); // Importa el modelo Reservation
const Plan = require('./Plan'); // Importa el modelo Plan
const Payment = require('./Payment'); // Importa el modelo Payment
const Equipment = require('./Equipment'); // Importa el modelo Equipment

// Definir asociaciones entre los modelos

// Asociaciones del modelo User
User.hasMany(Payment, { foreignKey: 'user_id', as: 'Payments' }); // Un usuario tiene muchos pagos
User.hasMany(Feedback, { foreignKey: 'user_id', as: 'UserFeedbacks' }); // Un usuario tiene muchos feedbacks
User.hasMany(Reservation, { foreignKey: 'user_id', as: 'UserReservations' }); // Un usuario tiene muchas reservas
Feedback.belongsTo(User, { foreignKey: 'user_id', as: 'FeedbackAuthor' }); // Un feedback pertenece a un usuario
Reservation.belongsTo(User, { foreignKey: 'user_id', as: 'ReservationUser' }); // Una reserva pertenece a un usuario
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'PaymentUser' }); // Un pago pertenece a un usuario

// Asociaciones del modelo Plan
Plan.hasMany(Payment, { foreignKey: 'plan_id', as: 'PlanPayments' }); // Un plan tiene muchos pagos
Payment.belongsTo(Plan, { foreignKey: 'plan_id', as: 'PaymentPlan' }); // Un pago pertenece a un plan

// Asociaciones del modelo Trainer
Trainer.hasMany(Class, { foreignKey: 'trainer_id', as: 'TrainerClasses' }); // Un entrenador tiene muchas clases
Class.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'ClassTrainer' }); // Una clase pertenece a un entrenador

// Asociaciones del modelo Class
Class.hasMany(Reservation, { foreignKey: 'class_id', as: 'ClassReservations' }); // Una clase tiene muchas reservas
Reservation.belongsTo(Class, { foreignKey: 'class_id', as: 'ReservationClass' }); // Una reserva pertenece a una clase

// Exporta los modelos y sequelize para usarlos en otros módulos
module.exports = {
    sequelize, // Exporta sequelize para poder usarlo en otros modelos si es necesario
    User,
    Feedback,
    Trainer,
    Class,
    Reservation,
    Plan,
    Payment,
    Equipment
};

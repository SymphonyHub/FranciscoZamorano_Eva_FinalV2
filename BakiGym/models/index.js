const User = require('./User');
const Feedback = require('./Feedback');
const Trainer = require('./Trainer');
const Class = require('./Class');
const Reservation = require('./Reservation');
const Plan = require('./Plan');
const Payment = require('./Payment');
const Equipment = require('./Equipment');

// Definir asociaciones entre los modelos

// User associations
User.hasMany(Payment, { foreignKey: 'user_id', as: 'Payments' });
User.hasMany(Feedback, { foreignKey: 'user_id', as: 'UserFeedbacks' });
User.hasMany(Reservation, { foreignKey: 'user_id', as: 'UserReservations' });
Feedback.belongsTo(User, { foreignKey: 'user_id', as: 'FeedbackAuthor' });
Reservation.belongsTo(User, { foreignKey: 'user_id', as: 'ReservationUser' });
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'PaymentUser' });

// Plan associations
Plan.hasMany(Payment, { foreignKey: 'plan_id', as: 'PlanPayments' });
Payment.belongsTo(Plan, { foreignKey: 'plan_id', as: 'PaymentPlan' });

// Trainer associations
Trainer.hasMany(Class, { foreignKey: 'trainer_id', as: 'TrainerClasses' });
Class.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'ClassTrainer' });

// Class associations
Class.hasMany(Reservation, { foreignKey: 'class_id', as: 'ClassReservations' });
Reservation.belongsTo(Class, { foreignKey: 'class_id', as: 'ReservationClass' });

module.exports = {
    User,
    Feedback,
    Trainer,
    Class,
    Reservation,
    Plan,
    Payment,
    Equipment
};

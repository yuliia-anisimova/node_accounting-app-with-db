'use strict';

const { Expense } = require('../models/expense');
const { Op } = require('sequelize');

const getFilteredExpenses = (data) => {
  const {
    userId,
    categories,
    from,
    to,
  } = data;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: categories,
    };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({ where });
};

const findById = (expenseId) => Expense.findByPk(expenseId);

const create = (data) => Expense.create({ ...data });

const remove = (expenseId) => {
  return Expense.destroy({
    where: { id: expenseId },
  });
};

const update = ({ id, ...data }) => {
  return Expense.update({ ...data }, {
    where: { id },
  });
};

module.exports = {
  getFilteredExpenses,
  findById,
  create,
  update,
  remove,
};
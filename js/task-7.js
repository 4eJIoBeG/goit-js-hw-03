/*Напиши скрипт управления личным кабинетом интернет банка. Есть объект `account`
в котором необходимо реализовать методы для работы с балансом и историей
транзакций.*/

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

/*
 * генератор случайных ID взято: https://developer.mozilla.org/en-US/docs/Web/API/crypto_property
 */
const transactionId = function () {
  return crypto.getRandomValues(new Uint32Array(1))[0];
};

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    const transaction = this.transactions.push({
      id: transactionId(),
      amount: amount,
      type: type,
    });
    return transaction;
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    this.balance += amount;
    this.createTransaction(amount, Transaction.DEPOSIT);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (amount > this.balance) {
      console.log('Снятие такой суммы не возможно, недостаточно средств!');
    } else {
      this.balance -= amount;
      this.createTransaction(amount, Transaction.WITHDRAW);
    }
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return `Текущий баланс счета: ${this.balance}`;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      if (transaction.id === id) {
        return transaction;
      }
      console.log(`Не найдено транзакций по такому ID: ${id}`);
    }
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let transactionsTotal = 0;
    for (const transaction of this.transactions) {
      if (transaction.type === type) {
        transactionsTotal += transaction.amount;
      }
    }
    return `Общее количество средств по операции ${type} составляет: ${transactionsTotal}`;
  },
};

console.log(account.getBalance());

account.deposit(100);
account.deposit(100);
account.deposit(100);

account.withdraw(100);
account.withdraw(100);

console.log(account.getTransactionTotal('deposit'));
console.log(account.getTransactionTotal('withdraw'));

console.log(account.getBalance());

console.log(account);

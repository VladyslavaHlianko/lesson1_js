const ITCompany = {
  id: 12332129,
  companyName: 'Playtika',
  type: 'product',
  vacancies: [
    {
      frontEnd: {
        salary: 1200
      },
    },
    {
      backEnd: {
        salary: 1500
      },
    },
    {
      scramMaster: {
        salary: 500
      },
    },
    {
      tester: {
        salary: 600
      },
    }
  ]
};

class Worker {
  constructor(userName, positionName, userSalary) {
    this.userName = userName;
    this.positionName = positionName;
    this.userSalary = userSalary;
  }

  greeting() {
    document.write(`hello my name is ${this.userName}, im ${this.positionName} in ${this.companyName}`);
  }
}

function createWorker() {
  const userName = prompt('Введите Ваше имя');
  const positionName = prompt('Введите Вашу позицию. В наличии backEnd, frontEnd, scramMaster, tester');
  const userSalary = prompt('Введите Вашу зарплату');

  let success = false;
  ITCompany.vacancies.forEach(vacancy => {
    const vacancyKeys = Object.keys(vacancy);
    if (vacancyKeys[0].toLowerCase() === positionName.toLowerCase()) {
      const salary = vacancy[vacancyKeys[0]].salary;
      if (Number(salary) >= Number(userSalary)) {
        success = true;
      }
    }
  });
  if (success) {
    const newWorker = new Worker(userName, positionName, userSalary);
    Object.setPrototypeOf(newWorker, Object.assign(Worker.prototype, ITCompany));
    newWorker.greeting();
  } else {
    document.write(`${userName}, you have significant skills at ${positionName}, but we hired another developer. Let's keep in contact!`);
  }
}

createWorker();
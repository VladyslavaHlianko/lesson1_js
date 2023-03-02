const ITCompany = {
  id: 12332129,
  сompanyName: 'Playtika',
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

function worker() {
  const userName = prompt('Введіть Ваше і`мя');
  const positionName = prompt('Введіть Вашу позицію. В наявності backEnd, frontEnd, scramMaster, tester');
  const userSalary = prompt('Введіть Вашу зарплатню');
  let success = false;

  ITCompany.vacancies.forEach((vacancy) => {
    const vacancyKeys = Object.keys(vacancy);
    if (vacancyKeys[0].toLowerCase() === positionName.toLowerCase()){
      const salary = vacancy[vacancyKeys[0]].salary;
      if (Number(salary) >= Number(userSalary)) {
        success = true;
      }
    }
  });

  const newWorker = Object.create(ITCompany);
  function greeting() {
    if (success) {
      this.workerName = userName;
      this.position = positionName;
      this.salary = userSalary;
      document.write(`hello my name is ${this.workerName}, im ${positionName} in ${this.сompanyName}`);
    } else {
      document.write(`${userName}, you have significant skills at ${positionName}, but we hired another developer. Let's keep in contact!`);
    }
  }

  greeting.call(newWorker);
  console.log(newWorker);
}

worker();
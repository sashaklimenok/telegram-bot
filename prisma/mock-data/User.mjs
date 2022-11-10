export class User {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}

const names = [
  'Aaren',
  'Aarika',
  'Abagael',
  'Abagail',
  'Abbe',
  'Abbey',
  'Abbi',
  'Abbie',
  'Abby',
  'Abbye',
  'Abigael',
  'Abigail',
  'Abigale',
  'Abra',
  'Ada',
  'Adah',
  'Adaline',
  'Adan',
  'Adara',
  'Adda',
  'Addi',
  'Addia',
  'Addie',
  'Addy',
  'Adel',
  'Adela',
  'Adelaida',
  'Adelaide',
  'Adele',
  'Adelheid',
  'Adelice',
  'Adelina',
  'Adelind',
  'Adeline',
];

export const fakeUser = names.map(
  (name, i) =>
    new User({
      name,
      email: `${name}@mail.com`,
      password: `${name}-${i}`,
    }),
);

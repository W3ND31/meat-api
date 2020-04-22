import User from "./user";

const users: User[] = [
  new User("1", "Peter Parker", "peter.parker@gmail.com"),
  new User("2", "Bruce Wayne", "bruce.wayne@hotmail.com"),
  { id: "3", name: "teste", email: "teste" },
];

export class Users {
  static findAll(): Promise<any> {
    return Promise.resolve(users);
  }

  static findById(id: string): Promise<any> {
    return new Promise((resolve) => {
      const filtered = users.filter((user) => user.id === id);
      let user: Users;
      if (filtered.length > 0) {
        user = filtered[0];
      }
      resolve(user);
    });
  }
}

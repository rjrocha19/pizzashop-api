import { faker } from "@faker-js/faker";
import { restaurants, users } from "./schema";
import { db } from "./connection";
import chalk from "chalk";

/**
 * Reset database
 */
await db.delete(users);
await db.delete(restaurants);

console.log(chalk.yellowBright("✔️ Database reset!"));

/**
 * Create customers
 */
const [customer1, customer2] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: "customer",
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: "customer",
    },
  ])
  .returning();

console.log(chalk.yellowBright("✔️ Created customers!"));

/**
 * Create manager
 */
const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: "admin@admin.com",
      role: "manager",
    },
  ])
  .returning({
    id: users.id,
  });

console.log(chalk.yellowBright("✔️ Created manager!"));

/**
 * Create restaurant
 */
const [restaurant] = await db
  .insert(restaurants)
  .values([
    {
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      managerId: manager.id,
    },
  ])
  .returning();

console.log(chalk.yellowBright("✔️ Created restaurant!"));

function generateProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    restaurantId: restaurant.id,
    priceInCents: Number(faker.commerce.price({ min: 190, max: 490, dec: 0 })),
  };
}

console.log(chalk.greenBright("Database seeded successfully!"));

process.exit(0);

import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthorResolver {
  @Query(() => String) // Вказуємо, що він повертає String
  async hello() {
    return 'Hello from Nest.js & GraphQL!';
  }
}

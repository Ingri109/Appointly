import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// ЗМІНА ТУТ: Замість 'import * as request' використовуємо просто 'import request'
import request from 'supertest'; 
import { AppModule } from './../src/app.module';

describe('AppResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should accept graphql queries', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ __schema { types { name } } }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('__schema');
      });
  });
});
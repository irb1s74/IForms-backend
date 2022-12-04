import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { User } from './user/model/User.model';
import { Forms } from './forms/model/Forms.model';
import { FormsModule } from './forms/forms.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { QuestionsModule } from './questions/questions.module';
import { Questions } from './questions/model/Questions.model';
import { VariantModule } from './variant/variant.module';
import { Variant } from './variant/model/Variant.model';
import { AnswersModule } from './answers/answers.module';
import { Answers } from './answers/model/Answers.model';
import { resolve } from 'path';
import { Reply } from './answers/model/Reply.model';
import { SubdivisionModule } from './subdivision/subdivision.module';
import { Subdivision } from './subdivision/model/Subdivision.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Forms, Questions, Variant, Answers, Reply, Subdivision],
      autoLoadModels: true,
    }),
    UserModule,
    FormsModule,
    AuthModule,
    FileModule,
    QuestionsModule,
    VariantModule,
    AnswersModule,
    SubdivisionModule,
  ],
})
export class AppModule {}
console.log('ALE:::::::::::::::::::::::', process.env.POSTGRES_HOST);

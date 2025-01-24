import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkModule } from './work/work.module';
import { UserModule } from './user/user.module';
import { PdfreportModule } from './pdfreport/pdfreport.module';
import { EndProcesModule } from './end-proces/end-proces.module';

@Module({
  imports: [
    WorkModule,
    UserModule,
    PdfreportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    EndProcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

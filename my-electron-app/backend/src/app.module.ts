import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkModule } from './work/work.module';
import { UserModule } from './user/user.module';
import { PdfreportModule } from './pdfreport/pdfreport.module';

@Module({
  imports: [WorkModule, UserModule, PdfreportModule, ConfigModule.forRoot({isGlobal:true}), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST', 'localhost'), 
      port: parseInt(configService.get<string>('DB_PORT', '5432'), 10), 
      username: configService.get<string>('DB_USERNAME', 'postgres'),
      password: configService.get<string>('DB_PASSWORD', '123Mama456'),
      database: configService.get<string>('DB_NAME', 'test'),
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: false, 
      autoLoadEntities: true,
   }),
    inject: [ConfigService],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

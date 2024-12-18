import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],  // Expose UserService to other modules
})
export class UserModule {}

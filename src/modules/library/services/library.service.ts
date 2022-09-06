import { IEmailService } from '@modules/communication/services';
import {
  CreateLibraryDomainModel,
  LibraryDomainModel,
} from '@modules/library/domain.types/library';
import { ILibraryService } from '@modules/library/services/library.service.interface';
import { IUserService } from '@modules/user/services/user.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/////////////////////////////////////////////////////

@Injectable()
export class LibraryService implements ILibraryService {
  /**
   *
   */
  constructor(
    private jwtService: JwtService,

    @Inject(IUserService)
    private readonly userService: IUserService,

    @Inject(IEmailService)
    private readonly emailService: IEmailService,
  ) {
    //
  }

  createLibrary(model: CreateLibraryDomainModel): Promise<LibraryDomainModel> {
    throw new Error('Method not implemented.');
  }
}

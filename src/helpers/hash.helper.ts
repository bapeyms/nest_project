import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HashHelper {
    private readonly _salt = 10;
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this._salt);
    }

    async isValidPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
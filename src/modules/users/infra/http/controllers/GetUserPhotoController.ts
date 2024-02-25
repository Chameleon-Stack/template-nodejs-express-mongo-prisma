import { Request, Response } from 'express';
import path from 'path';

export class GetUserPhotoController {
  public handle(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      const { file } = request.params;

      const _path = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        'upload',
        file,
      );

      response.sendFile(_path, err => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
}

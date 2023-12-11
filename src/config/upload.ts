import multer from 'multer'
import { resolve } from 'node:path'
import crypto from 'node:crypto'

export default {
  // folder vai ser o dest do multer
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          // sobreescrevendo o filename
          const fileHash = crypto.randomBytes(16).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`


          return callback(null, fileName)
        },
      }),
    }
  },
}

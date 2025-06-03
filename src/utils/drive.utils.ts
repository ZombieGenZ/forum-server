import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

const credentials = {
  type: process.env.GOOGLE_DRIVE_TYPE as string,
  project_id: process.env.GOOGLE_DRIVE_PROJECT_ID as string,
  private_key_id: process.env.GOOGLE_DRIVE_PRIVATE_KEY_ID as string,
  private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL as string,
  client_id: process.env.GOOGLE_DRIVE_CLIENT_ID as string,
  auth_uri: process.env.GOOGLE_DRIVE_AUTH_URI as string,
  token_uri: process.env.GOOGLE_DRIVE_TOKEN_URI as string,
  auth_provider_x509_cert_url: process.env.GOOGLE_DRIVE_AUTH_PROVIDER_X509_CERT_URL as string,
  client_x509_cert_url: process.env.GOOGLE_DRIVE_CLIENT_X509_CERT_URL as string
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({
  version: 'v3',
  auth
})

const getAllFiles = (dirPath: string, baseDir: string = dirPath): string[] => {
  const files: string[] = []
  const items = fs.readdirSync(dirPath)

  for (const item of items) {
    const fullPath = path.join(dirPath, item)
    const relativePath = path.relative(baseDir, fullPath)
    const stats = fs.lstatSync(fullPath)

    if (stats.isFile()) {
      files.push(relativePath)
    } else if (stats.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir))
    }
  }

  return files
}

const createFolder = async (folderName: string, parentId: string): Promise<string> => {
  const response = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents`,
    fields: 'files(id)'
  })

  if (response.data.files?.length) {
    return response.data.files[0].id!
  }

  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId]
    },
    fields: 'id'
  })

  return folder.data.id!
}

export const uploadAllToDrive = async () => {
  try {
    const sourceDir = path.join(__dirname, '../../public/images')
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID as string

    await drive.files.get({
      fileId: rootFolderId,
      fields: 'id,name'
    })

    const response = await drive.files.list({
      q: `'${rootFolderId}' in parents`,
      fields: 'files(id)'
    })

    const files = response.data.files || []
    for (const file of files) {
      await drive.files.delete({ fileId: file.id! })
    }

    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Thư mục nguồn không tồn tại: ${sourceDir}`)
    }

    const filePaths = getAllFiles(sourceDir)

    const folderCache: { [key: string]: string } = { '': rootFolderId }

    for (const filePath of filePaths) {
      const parsedPath = path.parse(filePath)
      const dirParts = parsedPath.dir ? parsedPath.dir.split(path.sep) : []
      let currentParentId = rootFolderId

      for (let i = 0; i < dirParts.length; i++) {
        const folderPath = dirParts.slice(0, i + 1).join(path.sep)
        if (!folderCache[folderPath]) {
          currentParentId = await createFolder(dirParts[i], currentParentId)
          folderCache[folderPath] = currentParentId
        } else {
          currentParentId = folderCache[folderPath]
        }
      }

      const fullFilePath = path.join(sourceDir, filePath)
      await drive.files.create({
        requestBody: {
          name: parsedPath.base,
          parents: [currentParentId]
        },
        media: {
          body: fs.createReadStream(fullFilePath)
        },
        fields: 'id'
      })
    }
  } catch (error) {
    throw new Error(`Lỗi khi upload file lên Google Drive: ${error}`)
  }
}

const downloadFolder = async (folderId: string, destinationPath: string, relativePath: string = '') => {
  const response = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType)'
  })

  const files = response.data.files || []

  for (const file of files) {
    const filePath = path.join(destinationPath, relativePath, file.name!)
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      fs.mkdirSync(filePath, { recursive: true })
      await downloadFolder(file.id!, destinationPath, path.join(relativePath, file.name!))
    } else {
      const dest = fs.createWriteStream(filePath)
      const responseDownload = await drive.files.get({ fileId: file.id!, alt: 'media' }, { responseType: 'stream' })

      await new Promise((resolve, reject) => {
        responseDownload.data
          .on('end', () => resolve(null))
          .on('error', (err) => reject(err))
          .pipe(dest)
      })
    }
  }
}

export const downloadAllFromDrive = async () => {
  try {
    const destinationPath = path.join(__dirname, '../../public/images')
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID as string

    await drive.files.get({
      fileId: folderId,
      fields: 'id,name'
    })

    if (fs.existsSync(destinationPath)) {
      const existingFiles = fs.readdirSync(destinationPath)
      for (const file of existingFiles) {
        const filePath = path.join(destinationPath, file)
        const stats = fs.lstatSync(filePath)
        if (stats.isFile()) {
          fs.unlinkSync(filePath)
        } else if (stats.isDirectory()) {
          fs.rmSync(filePath, { recursive: true })
        }
      }
    } else {
      fs.mkdirSync(destinationPath, { recursive: true })
    }

    await downloadFolder(folderId, destinationPath)
  } catch (error) {
    throw new Error(`Lỗi khi tải file từ Google Drive: ${error}`)
  }
}

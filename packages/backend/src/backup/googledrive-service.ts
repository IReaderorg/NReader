import { GoogleDriveAuth } from './googledrive-auth.js'

const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files'
const DRIVE_URL = 'https://www.googleapis.com/drive/v3/files'

export interface DriveFile {
  id: string
  name: string
  size: string
  createdTime: string
  modifiedTime: string
}

export class GoogleDriveService {
  constructor(private auth: GoogleDriveAuth) {}

  async upload(buffer: Uint8Array, fileName: string): Promise<DriveFile> {
    const token = await this.auth.getValidToken()

    // 1. Create file metadata — get resumable session URL
    const metadataRes = await fetch(`${DRIVE_UPLOAD_URL}?uploadType=resumable`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': 'application/octet-stream',
      },
      body: JSON.stringify({ name: fileName, parents: ['appDataFolder'] }),
    })
    if (!metadataRes.ok) {
      const body = await metadataRes.text()
      throw new Error(`Drive upload init failed: ${metadataRes.status} ${body}`)
    }

    const uploadUrl = metadataRes.headers.get('Location')
    if (!uploadUrl) throw new Error('No upload URL returned')

    // 2. Upload binary content
    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: buffer.buffer as ArrayBuffer,
    })
    if (!uploadRes.ok) {
      const body = await uploadRes.text()
      throw new Error(`Drive upload failed: ${uploadRes.status} ${body}`)
    }

    return uploadRes.json() as Promise<DriveFile>
  }

  async list(): Promise<DriveFile[]> {
    const token = await this.auth.getValidToken()
    const url = new URL(DRIVE_URL)
    url.searchParams.set('spaces', 'appDataFolder')
    url.searchParams.set('orderBy', 'createdTime desc')
    url.searchParams.set('pageSize', '50')
    url.searchParams.set('fields', 'files(id,name,size,createdTime,modifiedTime)')

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Drive list failed: ${res.status} ${body}`)
    }
    const data = await res.json() as { files: DriveFile[] }
    return data.files ?? []
  }

  async download(fileId: string): Promise<ArrayBuffer> {
    const token = await this.auth.getValidToken()
    const res = await fetch(`${DRIVE_URL}/${encodeURIComponent(fileId)}?alt=media`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Drive download failed: ${res.status} ${body}`)
    }
    return res.arrayBuffer()
  }

  async delete(fileId: string): Promise<void> {
    const token = await this.auth.getValidToken()
    const res = await fetch(`${DRIVE_URL}/${encodeURIComponent(fileId)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Drive delete failed: ${res.status} ${body}`)
    }
  }
}

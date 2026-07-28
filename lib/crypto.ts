import crypto from 'node:crypto'

// AES-256-GCM at-rest encryption for sensitive strings (Meta read-only tokens).
// Key derived from AUDIT_ENC_KEY env (any length; hashed to 32 bytes).
// Stored format: v1:<iv b64>:<tag b64>:<ciphertext b64>

function getKey(): Buffer | null {
  const secret = process.env.AUDIT_ENC_KEY
  if (!secret) return null
  return crypto.createHash('sha256').update(secret).digest()
}

export function encryptSecret(plain: string): string | null {
  const key = getKey()
  if (!key || !plain) return null
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return `v1:${iv.toString('base64')}:${tag.toString('base64')}:${ct.toString('base64')}`
}

export function decryptSecret(payload: string): string | null {
  const key = getKey()
  if (!key || !payload) return null
  try {
    const [v, ivB, tagB, ctB] = payload.split(':')
    if (v !== 'v1') return null
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivB, 'base64'))
    decipher.setAuthTag(Buffer.from(tagB, 'base64'))
    const pt = Buffer.concat([decipher.update(Buffer.from(ctB, 'base64')), decipher.final()])
    return pt.toString('utf8')
  } catch {
    return null
  }
}

// True when at-rest encryption is configured. If false, we refuse to store
// tokens rather than persist them in plaintext.
export function encryptionReady(): boolean {
  return !!getKey()
}

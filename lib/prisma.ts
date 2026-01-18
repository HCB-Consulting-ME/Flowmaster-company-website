import path from 'path'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getDbUrl() {
  const dbUrl = process.env.DATABASE_URL || 'file:./dev.db'
  // Convert relative path to absolute if needed
  if (dbUrl.startsWith('file:./')) {
    const relativePath = dbUrl.replace('file:./', '')
    const absolutePath = path.resolve(process.cwd(), relativePath)
    return `file:${absolutePath}`
  }
  return dbUrl
}

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: getDbUrl() })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

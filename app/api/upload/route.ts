import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads')

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // 创建唯一的文件名
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(UPLOAD_DIR, fileName)
    
    // 确保上传目录存在
    await writeFile(filePath, buffer)
    
    // 返回可访问的URL
    return NextResponse.json({
      url: `/uploads/${fileName}`
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
} 
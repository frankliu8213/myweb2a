import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { FEATURED_PRODUCTS } from '../../data/products'

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'products.json')

// 确保数据文件存在
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE_PATH)
  } catch {
    try {
      // 创建目录（如果不存在）
      await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true })
      // 使用 FEATURED_PRODUCTS 作为初始数据
      await fs.writeFile(
        DATA_FILE_PATH, 
        JSON.stringify(FEATURED_PRODUCTS.map(product => ({
          ...product,
          featured: product.featured || false
        })), null, 2)
      )
    } catch (error) {
      console.error('Error creating data file:', error)
      throw new Error('Failed to create data file')
    }
  }
}

// 读取产品数据
async function readProducts() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading products:', error)
    // 如果读取失败，返回默认数据
    return FEATURED_PRODUCTS.map(product => ({
      ...product,
      featured: product.featured || false
    }))
  }
}

// 获取所有产品
export async function GET() {
  try {
    await ensureDataFile()
    const products = await readProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// 添加或更新产品
export async function POST(request: Request) {
  try {
    await ensureDataFile()
    const product = await request.json()
    const products = await readProducts()

    if (product.id) {
      // 更新现有产品
      const updatedProducts = products.map((p: any) => 
        p.id === product.id ? { ...p, ...product } : p
      )
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedProducts, null, 2))
      return NextResponse.json(product)
    } else {
      // 添加新产品
      const newProduct = {
        ...product,
        id: products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1,
        featured: product.featured || false
      }
      products.push(newProduct)
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(products, null, 2))
      return NextResponse.json(newProduct)
    }
  } catch (error) {
    console.error('Error in POST /api/products:', error)
    return NextResponse.json(
      { error: 'Failed to save product' },
      { status: 500 }
    )
  }
}

// 删除产品
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const products = await readProducts()
    const updatedProducts = products.filter((p: any) => p.id !== id)
    
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedProducts, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/products:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
} 
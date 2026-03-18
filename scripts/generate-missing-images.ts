import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import { execSync } from 'child_process'
import * as path from 'path'

const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany()
  const publicDir = path.join(process.cwd(), 'public')
  
  for (const product of products) {
    if (product.image) {
      const imagePath = path.join(publicDir, product.image)
      if (!fs.existsSync(imagePath)) {
        console.log(`Missing image: ${product.image} for ${product.name}`)
        const prompt = `Delicious ${product.name}, ${product.description || ''}, professional food photography, italian restaurant style`
        const filename = path.basename(product.image, '.png')
        
        try {
          console.log(`Generating image for ${product.name}...`)
          execSync(`python .agent/skills/image-generator/scripts/generate_image.py --prompt "${prompt}" --filename "${filename}" --aspect-ratio "1:1"`, { stdio: 'inherit' })
        } catch (error) {
          console.error(`Failed to generate image for ${product.name}:`, error)
        }
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      items, 
      customerName, 
      customerEmail, 
      customerPhone, 
      address, 
      city, 
      zipCode, 
      deliveryFee, 
      totalAmount,
      woltPromiseId 
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate product IDs to prevent foreign key violations
    const productIds = items.map((item: any) => item.id);
    const existingProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      },
      select: { id: true }
    });

    const existingProductIds = existingProducts.map(p => p.id);
    const missingProductIds = productIds.filter((id: string) => !existingProductIds.includes(id));

    if (missingProductIds.length > 0) {
      return NextResponse.json({ 
        error: `Invalid product IDs: ${missingProductIds.join(', ')}` 
      }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        address,
        city,
        zipCode,
        deliveryFee,
        totalAmount,
        woltPromiseId,
        status: 'PENDING',
        paymentMethod: 'COD',
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity || 1,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

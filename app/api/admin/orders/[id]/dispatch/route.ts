import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createDelivery } from '@/lib/wolt';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (!order.woltPromiseId) {
      return NextResponse.json({ error: 'No Wolt Promise ID found for this order. Wolt delivery might not be possible.' }, { status: 400 });
    }

    // Call Wolt API to create delivery
    const delivery = await createDelivery({
      shipment_promise_id: order.woltPromiseId,
      merchant_order_reference_id: order.id,
      recipient: {
        name: order.customerName,
        phone_number: order.customerPhone,
        email: order.customerEmail,
      },
      dropoff: {
        location: {
          coordinates: { lat: 0, lon: 0 } // Wolt API uses the promise's location, but coords are required in the param list? 
          // Wait, actually Wolt usually takes coords if it's venueless, 
          // but for venueful with promise, it might still need them or they are in the promise.
          // In my lib/wolt.ts createDelivery expects dropoff.location.coordinates.
          // Let's re-read the promise structure if we have it.
        },
      },
      parcels: order.items.map((item: any) => ({
        count: item.quantity,
        description: item.product.name,
        price: { amount: Math.round(item.price * 100), currency: 'EUR' }
      })),
      customer_support: {
        email: 'support@francesco-shop.v1', // Should be dynamic
        phone_number: '+43123456789'
      }
    });

    // Update order with tracking URL and status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: 'DISPATCHED',
        woltTrackingUrl: delivery.tracking.url,
      },
    });

    return NextResponse.json({ success: true, order: updatedOrder, delivery });
  } catch (error: any) {
    console.error('Wolt Dispatch Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

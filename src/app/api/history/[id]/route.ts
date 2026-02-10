import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticateToken } from '@/lib/auth-server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    const result = await query(
      'DELETE FROM inference_requests WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, user.id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }
    
    return new NextResponse(null, { status: 204 });
    
  } catch (error) {
    console.error('Delete history error:', error);
    return NextResponse.json(
      { error: 'Failed to delete history item' },
      { status: 500 }
    );
  }
}

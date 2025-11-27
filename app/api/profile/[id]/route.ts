import { ProfileData } from '@/lib/schema';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Retrieve from Vercel KV
    const profileData = await kv.get<ProfileData>(`profile:${id}`);
    
    if (!profileData) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve profile' },
      { status: 500 }
    );
  }
}

import { generateProfileId } from '@/lib/id-generator';
import { ProfileData } from '@/lib/schema';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

const PROFILE_TTL = 60 * 60 * 24 * 30; // 30 days in seconds

export async function POST(request: NextRequest) {
  try {
    const profileData: ProfileData = await request.json();
    
    // Generate a unique ID
    const id = generateProfileId();
    
    // Store in Vercel KV with TTL
    await kv.set(`profile:${id}`, profileData, { ex: PROFILE_TTL });
    
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}

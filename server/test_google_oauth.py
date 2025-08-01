#!/usr/bin/env python3
"""
Test script to verify Google OAuth configuration
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_google_oauth_config():
    """Test if Google OAuth environment variables are set"""
    print("🔍 Testing Google OAuth Configuration...")
    
    required_vars = [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'CLIENT_URL',
        'JWT_SECRET'
    ]
    
    missing_vars = []
    
    for var in required_vars:
        value = os.getenv(var)
        if not value:
            missing_vars.append(var)
        else:
            print(f"✅ {var}: {'*' * len(value)} (length: {len(value)})")
    
    if missing_vars:
        print(f"\n❌ Missing required environment variables: {', '.join(missing_vars)}")
        print("\nPlease set these variables in your .env file:")
        for var in missing_vars:
            print(f"  {var}=your-value-here")
        return False
    
    print("\n✅ All required environment variables are set!")
    print("\n📋 Next steps:")
    print("1. Make sure you've created Google OAuth credentials in Google Cloud Console")
    print("2. Add your redirect URI to Google Cloud Console:")
    print(f"   - {os.getenv('CLIENT_URL')}/google-auth")
    print("3. Start your backend server")
    print("4. Test the Google OAuth flow")
    
    return True

if __name__ == "__main__":
    test_google_oauth_config() 
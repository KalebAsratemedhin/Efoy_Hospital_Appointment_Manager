import os
from fastapi import UploadFile, HTTPException, status
from typing import List, Optional
import filetype
import logging

logger = logging.getLogger(__name__)

# Allowed file types and their MIME types
ALLOWED_IMAGE_TYPES = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/webp": [".webp"]
}

# Maximum file sizes (in bytes)
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
MAX_IMAGE_SIZE = 2 * 1024 * 1024  # 2MB

def validate_file_size(file: UploadFile, max_size: int = MAX_FILE_SIZE) -> None:
    """Validate file size"""
    if file.size and file.size > max_size:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds maximum allowed size of {max_size / (1024*1024)}MB"
        )

def validate_image_file(file: UploadFile) -> None:
    """Validate image file type and size"""
    # Check file size
    validate_file_size(file, MAX_IMAGE_SIZE)
    
    # Check file extension
    file_extension = os.path.splitext(file.filename)[1].lower() if file.filename else ""
    allowed_extensions = [ext for extensions in ALLOWED_IMAGE_TYPES.values() for ext in extensions]
    
    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed types: {', '.join(allowed_extensions)}"
        )
    
    # Check MIME type using filetype (pure Python)
    file.file.seek(0)
    kind = filetype.guess(file.file.read(261))
    file.file.seek(0)
    if kind is None or kind.mime not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid MIME type. Allowed types: {', '.join(ALLOWED_IMAGE_TYPES.keys())}"
        )

def validate_filename(filename: str) -> str:
    """Validate and sanitize filename"""
    if not filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename is required"
        )
    
    # Remove path traversal attempts
    filename = os.path.basename(filename)
    
    # Remove special characters that could cause issues
    invalid_chars = ['<', '>', ':', '"', '|', '?', '*', '\\', '/']
    for char in invalid_chars:
        filename = filename.replace(char, '_')
    
    return filename

async def validate_upload_file(file: UploadFile, allowed_types: Optional[List[str]] = None) -> str:
    """Comprehensive file validation"""
    if not file:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided"
        )
    
    # Validate filename
    safe_filename = validate_filename(file.filename)
    
    # Validate file size
    validate_file_size(file)
    
    # Validate file type using filetype if allowed_types is provided
    if allowed_types:
        file.file.seek(0)
        kind = filetype.guess(file.file.read(261))
        file.file.seek(0)
        if kind is None or kind.mime not in allowed_types:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file type. Allowed types: {', '.join(allowed_types)}"
            )
    
    return safe_filename 
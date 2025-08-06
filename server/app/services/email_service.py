import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import get_settings
from typing import Optional
import secrets
from datetime import datetime, timedelta

settings = get_settings()

class EmailService:
    @staticmethod
    def generate_verification_token() -> str:
        """Generate a secure verification token"""
        return secrets.token_urlsafe(32)
    
    @staticmethod
    def get_verification_expiry() -> datetime:
        """Get verification token expiry time (24 hours from now)"""
        return datetime.utcnow() + timedelta(hours=24)
    
    @staticmethod
    async def send_verification_email(email: str, token: str, full_name: str) -> bool:
        """Send verification email to user"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = settings.EMAIL_FROM
            msg['To'] = email
            msg['Subject'] = "Verify Your Email - Efoy Hospital"
            
            # Create verification link
            verification_link = f"{settings.CLIENT_URL}/verify-email?token={token}"
            
            # Email body
            body = f"""
            <html>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Efoy Hospital</h1>
                    </div>
                    <div style="padding: 30px; background: #f8fafc;">
                        <h2 style="color: #0f172a; margin-bottom: 20px;">Welcome to Efoy, {full_name}!</h2>
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                            Thank you for signing up with Efoy Hospital. To complete your registration and start using our services, please verify your email address.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{verification_link}" 
                               style="background: #0891b2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                                Verify Email Address
                            </a>
                        </div>
                        <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
                            If the button doesn't work, you can copy and paste this link into your browser:<br>
                            <a href="{verification_link}" style="color: #0891b2;">{verification_link}</a>
                        </p>
                        <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
                            This link will expire in 24 hours. If you didn't create an account with Efoy, you can safely ignore this email.
                        </p>
                    </div>
                    <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
                        <p>© 2024 Efoy Hospital. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(body, 'html'))
            
            # Send email
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            text = msg.as_string()
            server.sendmail(settings.EMAIL_FROM, email, text)
            server.quit()
            
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
    @staticmethod
    async def send_welcome_email(email: str, full_name: str) -> bool:
        """Send welcome email after successful verification"""
        try:
            msg = MIMEMultipart()
            msg['From'] = settings.EMAIL_FROM
            msg['To'] = email
            msg['Subject'] = "Welcome to Efoy Hospital!"
            
            body = f"""
            <html>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Efoy Hospital</h1>
                    </div>
                    <div style="padding: 30px; background: #f8fafc;">
                        <h2 style="color: #0f172a; margin-bottom: 20px;">Welcome to Efoy, {full_name}!</h2>
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                            Your email has been successfully verified! You can now access all features of Efoy Hospital.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{settings.CLIENT_URL}/dashboard" 
                               style="background: #0891b2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                                Go to Dashboard
                            </a>
                        </div>
                        <p style="color: #64748b; line-height: 1.6;">
                            You can now:
                            <ul style="color: #475569;">
                                <li>Book appointments with our expert doctors</li>
                                <li>Manage your health records</li>
                                <li>Receive personalized healthcare recommendations</li>
                                <li>Connect with healthcare professionals</li>
                            </ul>
                        </p>
                    </div>
                    <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
                        <p>© 2024 Efoy Hospital. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(body, 'html'))
            
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            text = msg.as_string()
            server.sendmail(settings.EMAIL_FROM, email, text)
            server.quit()
            
            return True
        except Exception as e:
            print(f"Error sending welcome email: {e}")
            return False 
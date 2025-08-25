# Rock8.io Contact Form Setup Guide

## Overview
The contact form system consists of:
- **contact.html** - Main contact page with form
- **contact_handler.php** - PHP script that processes form submissions
- **msmtprc** - Email configuration template

## Setup Instructions

### 1. PHP Requirements
Ensure PHP is installed with these extensions:
- php-cli
- Standard PHP functions (no special extensions needed)

### 2. msmtp Configuration
Copy the `msmtprc` file to `/etc/msmtprc` and update with your SMTP settings:

```bash
sudo cp msmtprc /etc/msmtprc
sudo chmod 600 /etc/msmtprc
sudo chown root:root /etc/msmtprc
```

Edit `/etc/msmtprc` and replace the placeholders:
- `YOUR_SMTP_HOST_HERE` - Your SMTP server hostname
- `YOUR_FROM_EMAIL_HERE` - Email address to send from
- `YOUR_SMTP_USERNAME_HERE` - SMTP authentication username
- `YOUR_SMTP_PASSWORD_HERE` - SMTP authentication password

### 3. Install msmtp
Ubuntu/Debian:
```bash
sudo apt-get install msmtp msmtp-mta
```

CentOS/RHEL:
```bash
sudo yum install msmtp
```

### 4. Test Email Sending
Test the configuration:
```bash
echo "Test message" | msmtp recipient@domain.com
```

### 5. Web Server Setup
Ensure your web server can execute PHP scripts and that `contact_handler.php` is accessible.

## Form Configuration
The form sends emails to: **sales@rock8.io**

## Security Notes
- The msmtprc file contains sensitive credentials - ensure proper permissions (600)
- Form includes CSRF protection and input validation
- All form data is sanitized before processing

## Troubleshooting
- Check PHP error logs if form submissions fail
- Verify msmtp configuration with test commands
- Ensure firewall allows SMTP traffic on configured port
- Check that log directory (/var/log/) is writable for msmtp

## Files Modified
- contact.html - Updated form action to use contact_handler.php
- Added contact_handler.php - New PHP form processor
- Added msmtprc - Email configuration template
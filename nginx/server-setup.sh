#!/bin/bash
# Server Setup Script for Flow Master Website
# Domain: flow-master.ai
# Server IP: 91.99.237.14
#
# Run this script on the production server as root or with sudo

set -e

echo "=========================================="
echo "Flow Master Server Setup"
echo "=========================================="

# Variables
DOMAIN="flow-master.ai"
APP_DIR="/var/www/flow-master"
DEPLOY_USER="deploy"
NODE_VERSION="20"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root or with sudo"
    exit 1
fi

# Update system
echo "[1/8] Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "[2/8] Installing required packages..."
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw

# Install Node.js
echo "[3/8] Installing Node.js ${NODE_VERSION}..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install PM2 globally
echo "[4/8] Installing PM2..."
npm install -g pm2

# Create deploy user
echo "[5/8] Setting up deploy user..."
if ! id "$DEPLOY_USER" &>/dev/null; then
    useradd -m -s /bin/bash $DEPLOY_USER
    echo "Created user: $DEPLOY_USER"
else
    echo "User $DEPLOY_USER already exists"
fi

# Create application directory
echo "[6/8] Creating application directory..."
mkdir -p $APP_DIR
chown -R $DEPLOY_USER:$DEPLOY_USER $APP_DIR

# Setup SSH for deploy user (copy authorized_keys)
echo "[6b/8] Setting up SSH for deploy user..."
mkdir -p /home/$DEPLOY_USER/.ssh
if [ -f /root/.ssh/authorized_keys ]; then
    cp /root/.ssh/authorized_keys /home/$DEPLOY_USER/.ssh/
fi
chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
chmod 700 /home/$DEPLOY_USER/.ssh
chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys 2>/dev/null || true

# Setup Nginx
echo "[7/8] Configuring Nginx..."
cp ./flow-master.ai.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/flow-master.ai.conf /etc/nginx/sites-enabled/

# Remove default nginx site
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Configure firewall
echo "[8/8] Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Start services
systemctl enable nginx
systemctl restart nginx

echo ""
echo "=========================================="
echo "Initial Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Add your GitLab Runner SSH public key to /home/$DEPLOY_USER/.ssh/authorized_keys"
echo ""
echo "2. Setup SSL certificate:"
echo "   certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "3. Add these CI/CD variables in GitLab:"
echo "   - SSH_PRIVATE_KEY: Your GitLab Runner's private SSH key"
echo ""
echo "4. Test PM2 setup (as deploy user):"
echo "   su - $DEPLOY_USER"
echo "   pm2 startup"
echo ""
echo "5. The website will be available at: https://$DOMAIN"
echo ""
